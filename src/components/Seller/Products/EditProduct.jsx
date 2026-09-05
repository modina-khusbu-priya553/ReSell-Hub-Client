"use client";
import Image from "next/image";
import { Pencil } from "@gravity-ui/icons";
import {
  Modal,
  Button,
  Form,
  TextField,
  NumberField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/imageBB";
import { useState } from "react";

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Mobile Phones",
];

const CONDITIONS = ["Used", "Like New", "Refurbished"];
const STATUSES = ["available", "unavailable", "sold out"];

const EditProduct = ({ product, updateProductAction }) => {
  const router = useRouter();
  const {
    _id,
    title,
    category,
    condition,
    price,
    quantity,
    status,
    images: initialImages,
    description,
  } = product;
  const productId = _id;

  const [isOpen, setIsOpen] = useState(false);

  const [images, setImages] = useState(initialImages || []);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const result = await uploadImage(file);
          return result.url;
        }),
      );
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProduct = async (formData) => {
    formData.set("images", JSON.stringify(images));
    try {
      const update = await updateProductAction(productId, formData);
      toast.success("Product updated successfully");
      router.refresh();
       setIsOpen(false);
      return update;
      
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="secondary"
        onPress={() => setIsOpen(true)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
        aria-label="Edit product"
      >
        <Pencil className="size-4.5" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-teal-50 text-teal-700">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Product</Modal.Heading>
              <p className="mt-0.5 text-sm text-slate-500">
                Update your product details below.
              </p>
            </Modal.Header>

            <Modal.Body className="max-h-[65vh] overflow-y-auto">
              <Form
                action={handleUpdateProduct}
                className="flex flex-col gap-5"
              >
                {/* Images */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Product Images
                  </Label>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Up to 4 images
                  </p>

                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {images.map((url, index) => (
                      <div
                        key={url + index}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                      >
                        <Image
                          src={url}
                          alt=""
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                          aria-label="Remove image"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {images.length < 4 && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-teal-500 hover:text-teal-600">
                        {uploading ? (
                          <svg
                            className="h-5 w-5 animate-spin text-teal-600"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                        ) : (
                          <>
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={1.8}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            <span className="text-[10px]">Add</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {images.length === 0 && (
                    <p className="mt-2 text-xs text-red-500">
                      At least 1 image is required
                    </p>
                  )}
                </div>

                {/* Title */}
                <TextField name="title" defaultValue={title} isRequired>
                  <Label className="text-sm font-medium text-slate-700">
                    Product Title
                  </Label>
                  <Input className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
                  <FieldError className="text-xs text-red-500" />
                </TextField>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <Select name="category" defaultValue={category} isRequired>
                    <Label className="text-sm font-medium text-slate-700">
                      Category
                    </Label>
                    <Select.Trigger
                      className="mt-1.5 w-full rounded-lg border
                         border-slate-300 px-4 py-2.5 text-sm
                         text-slate-900 outline-none transition focus:border-teal-600 
                        focus:ring-2 focus:ring-teal-600/20"
                    >
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {CATEGORIES.map((c) => (
                          <ListBox.Item key={c} id={c} textValue={c}>
                            {c}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Price */}
                  <TextField
                    name="price"
                    type="number"
                    defaultValue={price}
                    isRequired
                  >
                    <Label className="text-sm font-medium text-slate-700">
                      Price
                    </Label>
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-slate-400">
                        ৳
                      </span>
                      <Input className="w-full rounded-lg border border-slate-300 py-2.5 pl-8 pr-4 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
                    </div>
                    <FieldError className="text-xs text-red-500" />
                  </TextField>
                </div>

                {/* Condition */}
                <RadioGroup
                  name="condition"
                  defaultValue={condition}
                  orientation="horizontal"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Condition
                  </Label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {CONDITIONS.map((c) => (
                      <Radio key={c} value={c} className="group cursor-pointer">
                        <Radio.Control className="hidden">
                          <Radio.Indicator />
                        </Radio.Control>
                        <Radio.Content className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-600 transition group-data-[selected]:border-teal-600 group-data-[selected]:bg-teal-50 group-data-[selected]:text-teal-700 group-data-[selected]:ring-1 group-data-[selected]:ring-teal-600">
                          {c}
                        </Radio.Content>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="grid grid-cols-2 gap-4">
                  {/* Quantity */}
                  <NumberField
                    name="quantity"
                    defaultValue={quantity}
                    minValue={0}
                  >
                    <Label className="text-sm font-medium text-slate-700">
                      Stock Quantity
                    </Label>
                    <div className="mt-1.5 flex w-full items-center rounded-lg border border-slate-300">
                      <Button
                        variant="secondary"
                        slot="decrement"
                        className="rounded-lg border-0 bg-transparent px-3 py-2.5 text-slate-500 hover:text-teal-700"
                      >
                        −
                      </Button>
                      <Input className="w-full border-x border-slate-300 py-2.5 text-center text-sm outline-none" />
                      <Button
                        variant="secondary"
                        slot="increment"
                        className="rounded-lg border-0 bg-transparent px-3 py-2.5 text-slate-500 hover:text-teal-700"
                      >
                        +
                      </Button>
                    </div>
                  </NumberField>

                  {/* Status */}
                  <Select name="status" defaultValue={status}>
                    <Label className="text-sm font-medium text-slate-700">
                      Status
                    </Label>
                    <Select.Trigger className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm capitalize text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {STATUSES.map((s) => (
                          <ListBox.Item
                            key={s}
                            id={s}
                            textValue={s}
                            className="capitalize"
                          >
                            {s}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Description */}
                <TextField
                  name="description"
                  defaultValue={description}
                  isRequired
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Description
                  </Label>
                  <TextArea
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  <FieldError className="text-xs text-red-500" />
                </TextField>
                <Modal.Footer>
                  <Button variant="secondary" className="w-full" slot="close">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-teal-700 text-white hover:bg-teal-800"
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditProduct;
