import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import type { Metadata } from "next";
interface CategoryResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: Category[];
}

interface Category {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
}

export const metadata: Metadata = {
  title: "Home | NY Times Best Sellers",
  description: "NY Times Best Sellers",
};

async function getCategories(): Promise<CategoryResponse> {
  const res = await fetch("https://books-api.nomadcoders.workers.dev/lists", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

const playfair = Playfair_Display({ subsets: ["latin"] });

async function CategoryList() {
  const { results: categories } = await getCategories();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {categories.map((category) => (
        <Link href={`/list/${category.list_name_encoded}`} key={category.list_name} className="block">
          <div
            className="group px-8 py-6
                      bg-white
                      border border-gray-300
                      rounded-lg
                      shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                      hover:shadow-[3px_3px_6px_rgba(0,0,0,0.15)]
                      hover:border-gray-400
                      transition-all duration-200 ease-in-out
                      flex items-center justify-center
                      min-h-[100px]
                      cursor-pointer"
          >
            <h2
              className={`text-base md:text-lg text-gray-700 
                         group-hover:text-gray-900 
                         transition-colors
                         text-center leading-relaxed
                         ${playfair.className}`}
            >
              {category.display_name}
              <span className="ml-2 text-gray-400">→</span>
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white p-12 rounded-xl shadow-sm max-w-[1400px] mx-auto">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 h-[100px]">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            }
          >
            <CategoryList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
