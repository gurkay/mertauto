import Link from "next/link";
import Image from "next/image";
import { DashboardButton, SignOutButton } from "./ClientLayout";
import MobileMenuButton from "./mobile-menu-button";
import CategoryTabs from "../CategoryTabs";

interface IProps {
  session?: any;
}

function Header({ session }: IProps) {

  return (
    <header className="bg-gray-500 bg-opacity-90 border-b-4 border-gray-700 fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center py-2 px-2">
        {/* Category Tabs */}
        <CategoryTabs session={session} />

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <DashboardButton />
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-200 hover:text-gray-800"
              >
                Giriş
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-200 hover:text-gray-800"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
