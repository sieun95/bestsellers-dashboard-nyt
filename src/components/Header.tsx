import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import ScrollProgress from "./ScrollProgress";

const playfair = Playfair_Display({ subsets: ["latin"] });

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
          <Link
            href="/"
            className={`text-3xl sm:text-4xl font-semibold text-gray-800 hover:text-gray-600 
                       transition-colors duration-200 ${playfair.className}`}
          >
            NY Times Best Sellers
          </Link>

          <nav className="flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 
                         rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 
                         rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="https://github.com/sieun95/bestsellers-dashboard-nyt"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm text-white bg-gray-800 
                         rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

export default Header;
