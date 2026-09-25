"use client";


import clsx from "clsx";
import { Briefcase, Footprints, Glasses, Hand, Shirt, ShoppingBasket, Venus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];

const Categories = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    const selectedCategory = searchParams.get("category");

    const handleCategoryChange = (value: string ) => {
        const params =  new URLSearchParams(searchParams);
        if (value === "all") {
            params.delete("category");
        }else {
            params.set("category", value);
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
        {categories.map((category) => (
            <div key={category.name}
            className={clsx(
                "flex items-center justify-center gap-2 px-2 py-1 rounded-lg cursor-pointer",
                {
                    "bg-white": selectedCategory === category.slug,
                    "text-gray-500": selectedCategory !== category.slug,
                }
            )}
            onClick={() => handleCategoryChange(category.slug)}
            >
                {category.icon}
                {category.name}
            </div>
        ))}
    </div>
  )
}

export default Categories