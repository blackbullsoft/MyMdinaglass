import { getProductByID, getProductCateogrybyId } from "@/api/productApi";
import ProductListinPage from "../[...params]/ProductListinPage";

// metadata function can still fetch product to set title/description
export async function generateMetadata({ params }) {
  const allParams = params?.params || [];

  // find "price" keyword index
  const priceIndex = allParams.findIndex((p) => p === "price");

  // everything before "price" are category IDs
  const categoryIds =
    priceIndex !== -1 ? allParams.slice(0, priceIndex).map(Number) : [];

  // ✅ last category id
  const lastId = categoryIds[categoryIds.length - 1];

  console.log("ididid", lastId);

  let productDetails = null;
  if (lastId) {
    const data = await getProductCateogrybyId(lastId);
    console.log("Data123232", data?.data?.main_category?.name);
    productDetails = data?.data?.main_category;
  }

  return {
    title: productDetails?.name || "Category Listing",
    description:
      productDetails?.description?.replace(/<[^>]*>/g, "").trim() ||
      "Check out this product on our store",
  };
}

// **server component page** to fetch productDetails
export default async function Page({ params }) {
  const allParams = params?.params || [];
  const id = allParams[allParams.length - 1];

  let productDetails = null;
  if (id) {
    const data = await getProductByID(id);
    productDetails = data?.data?.product;
  }

  return <ProductListinPage />;
}
