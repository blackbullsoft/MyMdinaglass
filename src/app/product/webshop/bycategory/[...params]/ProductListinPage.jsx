"use client";
import ProductHeading from "@/components/ProductHeading";
import ListingSkeleton from "@/components/Skeleton/ListingSkeleton";
import SideMenuSkeleton from "@/components/Skeleton/SideMenuSkeleton";

import dynamic from "next/dynamic";
import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const SideMenu = dynamic(() => import("@/components/SideMenu"), {
  ssr: true,
  loading: () => (
    <div>
      <SideMenuSkeleton />
      {/* <ParagraphSkeleton /> */}
    </div>
  ),
});

const ProductListing = dynamic(() => import("@/components/ProductListing"), {
  ssr: true,
  loading: () => <ListingSkeleton />,
});
ProductListing.preload?.();
SideMenu.preload?.();

const ShopPage = () => {
  const { pending } = useLinkStatus();
  const pathname = usePathname();

  useEffect(() => {
    const currentUrl = window.location.href;

    // On first render or route change:
    const prevUrl = localStorage.getItem("currentUrl");
    if (prevUrl) {
      localStorage.setItem("currentUrl", prevUrl); // Save old as previous
    }
    localStorage.setItem("currentUrl", currentUrl); // Save current
  }, [pathname]); // run on every path change

  console.log("pending", pending);
  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}
      <ProductHeading />
      <div
        style={{
          background: "#f1f1f1",
        }}
      >
        <div className="category-sidebar ">
          <div className="container category-bg">
            <div className="row  min-vh-100">
              {/* Category Sidebar */}

              <div className="col-lg-3 col-md-12 p-0">
                {/* <CategorySidebar /> */}
                <SideMenu />
              </div>
              {/* Product Listing */}
              <div className="col-lg-9 col-md-12">
                <ProductListing />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default ShopPage;
