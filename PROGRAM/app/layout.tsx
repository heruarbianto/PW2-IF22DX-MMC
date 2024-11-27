import './globals.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="font-sans">
        
        {/* Area Header */}
        <header>
          <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
              <div className="flex items-center justify-between">
                {/* Logo  */}
                <div className="flex items-center space-x-8">
                  <div className="shrink-0">
                    <a href="#" title="">
                      <img
                        className="block w-auto h-8"
                        src="/Tuku.yo Logo.png"
                        alt=""
                      />

                    </a>
                  </div>
                </div>

                <form className="w-3/5 mx-auto">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Foods, Drinks..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Cart dan User */}
                <div className="flex items-center lg:space-x-2">
                  {/* Cart Button */}
                  <button
                    id="myCartDropdownButton1"
                    type="button"
                    className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-blue-800 dark:text-blue-200"
                  >
                    <span className="sr-only">Cart</span>

                    <FontAwesomeIcon icon={faCartShopping} />

                    <span className="hidden sm:flex m-2">My Cart</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>

                  {/* User */}
                  <button
                    id="userDropdownButton1"
                    type="button"
                    className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-blue-800 dark:text-blue-200"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="hidden sm:flex m-2">Account</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                </div>
              </div>
            </div>
          </nav>

        </header>

        {/* Area content */}
        {children}

        {/* Area footer */}
        {/* <footer>Bagian Footer</footer> */}
      </body>
    </html>
  );
}
