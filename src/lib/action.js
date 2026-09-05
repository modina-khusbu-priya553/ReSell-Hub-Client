'use server'

import { revalidatePath } from "next/cache";


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
    if (!res.ok) {
        throw new Error('Failed to update product');
    }
    const data = await res.json();

    if (data.modifiedCount > 0) {
        revalidatePath(`/dashboard/seller/products`);
    }
    return data;
}