'use server'


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// // post api for add products

// export const addProduct = async (productData) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(productData)
//     });
   
//      if (!res.ok) {
//     console.error("Response status:", res.status);
//      const text = await res.text();
//     console.error("Response body:", text);
//     throw new Error(error.message || 'Failed to add product');
//   }
//    const data = await res.json();

//     console.log('Product added:', data);
//     return data;
// }