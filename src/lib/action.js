'use server'


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// post api for add products

export const addProduct = async (productData) => {
    const res = await fetch(`${serverUrl}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
    const data = await res.json();
    console.log('Product added:', data);
    return data;
}