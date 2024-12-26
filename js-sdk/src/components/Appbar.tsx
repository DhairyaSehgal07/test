import React from "react";
import Link from "next/link";

const Appbar = () => {
  return (
    <nav className="w-full border-b-2 bg-black text-white">
      <div className="max-w-screen-2xl mx-auto items-center px-4 lg:flex lg:px-8">
        <div className="flex items-center justify-between py-3 lg:block lg:py-5">
          <h1 className="text-2xl font-bold leading-8">
            <Link href="/">JS-SDK Integration</Link>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;