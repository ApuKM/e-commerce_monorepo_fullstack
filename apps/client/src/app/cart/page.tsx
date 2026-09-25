import CartPage from "@/components/CartPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <CartPage />
      </Suspense>
    </div>
  );
};

export default Page;
