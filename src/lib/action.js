'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



// Patch api for update products
export const updateProduct = async (productId, formData) => {
    const updatedProduct = Object.fromEntries(formData.entries());
    updatedProduct.price = Number(updatedProduct.price);
    updatedProduct.quantity = Number(updatedProduct.quantity);
    updatedProduct.images = JSON.parse(updatedProduct.images);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    });
   
    const data = await res.json();

    if (data.modifiedCount > 0) {
        revalidatePath(`/dashboard/seller/products`);
        
    }
    console.log('Updated product:', data);
    return data;
};

// Delete api for delete products
export const deleteProduct = async (productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${productId}`, {
        method: 'DELETE',
        
    });
    const data = await res.json();
    if (data.deletedCount > 0) {
        revalidatePath(`/dashboard/seller/products`);
        redirect(`/dashboard/seller/products`);
    }
    return data;
};