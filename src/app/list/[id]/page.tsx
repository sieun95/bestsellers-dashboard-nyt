import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List | NY Times Best Sellers",
  description: "NY Times Best Sellers",
};

interface Book {
  title: string;
  author: string;
  book_image: string;
  description: string;
  publisher: string;
  rank: number;
  amazon_product_url: string;
  rank_last_week: number;
  weeks_on_list: number;
}

interface BookListResults {
  list_name: string;
  list_name_encoded: string;
  bestsellers_date: string;
  published_date: string;
  published_date_description: string;
  next_published_date: string;
  previous_published_date: string;
  display_name: string;
  normal_list_ends_at: number;
  updated: string;
  books: Book[];
}

interface BookListResponse {
  status: string;
  copyright: string;
  num_results: number;
  last_modified: string;
  results: BookListResults;
}

async function getBookList(id: string) {
  try {
    const response = await fetch(`https://books-api.nomadcoders.workers.dev/list?name=${id}`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching book list:", error);
    return { results: { display_name: "", books: [] } };
  }
}

export default async function BookListPage({ params: { id } }: { params: { id: string } }) {
  const data: BookListResponse = await getBookList(id);
  const bookList = data.results;

  if (!bookList || !bookList.books) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{bookList.display_name}</h1>
          <p className="text-gray-600">
            Published: {new Date(bookList.published_date).toLocaleDateString()}
            {bookList.updated === "WEEKLY" && " • Updated Weekly"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookList.books.map((book) => (
            <div
              key={book.rank}
              className="bg-white rounded-lg border border-gray-200 
                         hover:shadow-lg transition-all duration-300 ease-in-out
                         flex flex-col h-[600px]"
            >
              <div className="relative h-[300px]">
                <div className="w-full h-full relative rounded-t-lg overflow-hidden">
                  <Image
                    src={book.book_image}
                    alt={book.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2 h-[56px]">{book.title}</h2>
                  <p className="text-gray-600 h-[24px] overflow-hidden">by {book.author}</p>
                </div>

                <p className="text-gray-700 line-clamp-3 mb-4 flex-1">{book.description}</p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-500">출판사: {book.publisher}</span>
                    <span className="text-gray-500">{book.weeks_on_list}주째 리스트에 있음</span>
                  </div>
                  <a
                    href={book.amazon_product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-gray-800 text-white 
                             py-2.5 rounded-md hover:bg-gray-700 
                             transition-all duration-300 ease-in-out
                             shadow-sm hover:shadow-md
                             font-medium"
                  >
                    Amazon에서 구매
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
