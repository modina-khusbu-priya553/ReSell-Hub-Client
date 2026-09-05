"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/imageBB";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { Camera } from "@gravity-ui/icons";
import Image from "next/image";

const UpdateProfile = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [image, setImage] = useState(user?.image || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadImage(file);
      setImage(result.url);
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name"); 

    setSaving(true);
    const { data, error } = await authClient.updateUser({
      name,
      image, 
    });

    if (data) {
      toast.success("Profile updated successfully!");
      router.refresh();
    }
    if (error) {
      toast.error(error.message);
    }
    setSaving(false);
  };

  return (
    <div>
      

      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <Form className="flex flex-col gap-6" onSubmit={handleProfile}>
          {/* Profile image */}
          <div className="flex items-center gap-5">
            <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-50">
              {image ? (
                <Image src={image} alt={user?.name} fill sizes="80px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-teal-500/10 text-2xl font-semibold text-teal-700">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <label
                htmlFor="profile-image-upload"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
              >
                {uploading ? (
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <Camera className="size-5 text-white" />
                )}
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">Profile photo</p>
              <p className="mt-0.5 text-xs text-slate-400">
                Click the photo to upload a new one. JPG or PNG, up to 2MB.
              </p>
            </div>
          </div>

          {/* Name */}
          <TextField name="name" defaultValue={user?.name} isRequired>
            <Label className="text-sm font-medium text-slate-700">Full Name</Label>
            <Input className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <Button
              type="submit"
              isDisabled={saving || uploading}
              className="rounded-lg bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;