import { getProductByID } from "@/api/productApi";
import ProductDetailPage from "../[...params]/ProductDetailPage";

// metadata function can still fetch product to set title/description
export async function generateMetadata({ params }) {
  const allParams = params?.params || [];
  const id = allParams[allParams.length - 1];

  let productDetails = null;
  if (id) {
    const data = await getProductByID(id);
    productDetails = data?.data?.product;
  }

  return {
    title: productDetails?.name || "Product Details",
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

  return <ProductDetailPage productDetailsProps={productDetails} />;
}
