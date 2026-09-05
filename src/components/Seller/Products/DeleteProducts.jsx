"use client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

import React from 'react';
import { toast } from "react-toastify";

const DeleteProducts = ({ product, deleteProductAction }) => {
  const { title, _id } = product;
 

  const handleDeleteProduct = async (productId) => {
    const deleteData = await deleteProductAction(productId);
    toast.success(`Product "${title}" deleted successfully!`);
    return deleteData;
  };

  return (
    <AlertDialog>
      <Button
        variant="secondary"
        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        aria-label="Delete product"
      >
        <TrashBin className="size-4.5" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this product?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{title}</strong> from your
                listings. Buyers will no longer be able to view or purchase this
                product. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="w-full">
                Cancel
              </Button>
              <Button onClick={() => handleDeleteProduct(_id)} variant="danger" className="w-full">
                Delete Product
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteProducts;