import SellerProductsData from "@/components/Seller/Products/SellerProductsData";
import { getSellerProducts } from "@/lib/data";
import { deleteProduct, updateProduct } from "@/lib/action";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const SellerProducts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userId = user?.id;
  console.log("User ID:", userId);
  const products = await getSellerProducts(userId);

  return (
    <div className="md:py-10 py-4">
      <SellerProductsData
        products={products}
        updateProductAction={updateProduct}
        deleteProductAction={deleteProduct}
      />
    </div>
  );
};

export default SellerProducts;
