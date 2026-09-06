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

    return data;
}

// get products api 
export const getAllProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`);
    const data = await res.json();
    return data;

}

// get details of a single product for seller
export const getProductDetails = async (productId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${productId}`,{
        cache: 'no-store',
    });
    const data = await res.json();
    return data;
};

// get products api for seller
export const getSellerProducts= async (userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/seller/${userId}`,{
        cache: 'no-store',
    });
    const data = await res.json();
    return data;
};