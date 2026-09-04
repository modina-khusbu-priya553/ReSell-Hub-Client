// post api for add products

export const addProduct = async (productData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, {
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

// get products api for seller
export const getSellerProducts = async (sellerProductsData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`);
    const data = await res.json();
    console.log('Seller products:', data);
    return data;

}