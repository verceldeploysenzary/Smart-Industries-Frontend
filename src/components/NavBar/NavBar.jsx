"use client";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-200 text-white mb-4">
      <Link href={`/devices`} as={`/devices`}>
        <button className="bg-gray-300 text-black border  px-4 py-1 shadow-md rounded">
          BACK
        </button>
      </Link>
      <h1 className="text-2xl font-bold text-black">Nandina Devices</h1>
      <div></div>
    </div>
  );
};

export default NavBar;
