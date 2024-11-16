import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "About | NY Times Best Sellers",
  description: "NY Times Best Sellers",
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
          <Link href="/" className="block text-center mb-12">
            <h1 className="text-4xl font-serif text-gray-800 hover:text-gray-600 transition-colors">NY Times Best Sellers</h1>
          </Link>

          <div className={`space-y-6 ${playfair.className}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Project</h2>

            <p className="text-gray-600 leading-relaxed">
              이 프로젝트는 New York Times의 Best Sellers 목록을 보여주는 웹 애플리케이션입니다. 사용자들은 다양한 카테고리의 베스트셀러
              책들을 확인할 수 있으며, 각 책에 대한 상세 정보와 구매 링크를 제공받을 수 있습니다.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">주요 기능</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>다양한 카테고리의 베스트셀러 목록 제공</li>
                <li>책 상세 정보 및 순위 변동확인</li>
                <li>Amazon 구매 링크 연결</li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">사용된 기술</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Next.js 14</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Nomadcoder API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
