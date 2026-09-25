"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import clsx from "clsx";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
    toast.success("Product added to cart!", {
        autoClose: 3000,
        closeOnClick: true,
        theme: "colored",
    });
  };

  return (
    <div className="flex flex-col mt-4 gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-600">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={clsx(
                "cursor-pointer border p-[2px] rounded-md",
                size === selectedSize ? "border-gray-600" : "border-gray-300"
              )}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={clsx(
                  "w-6 h-6 flex items-center justify-center rounded-md",
                  size === selectedSize
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                )}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-600">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={clsx(
                "cursor-pointer border p-[2px] rounded-md",
                color === selectedColor ? "border-gray-600" : "border-gray-300"
              )}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className="w-6 h-6 rounded-md"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-600">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
