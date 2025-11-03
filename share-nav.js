// File: app/components/Navbar.tsx or app/Navbar.tsx

"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin"; // Adjust based on your session structure
  const user = session?.user;

  useEffect(() => {
    const logoutElem = document.getElementById("logout");
    if (logoutElem) {
      logoutElem.addEventListener("click", async () => {
        await signOut();
        window.location.href = "/";
      });
    }
  }, []);

  return (
    <nav
      className="flex justify-between px-20 py-10 items-center fixed top-0 w-full z-10 h-20"
      style={{ backgroundColor: "#000000" }}
    >
      <h1 className="text-xl text-white font-bold">
        <Link href="/">AutoRentals</Link>
      </h1>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <li className="font-semibold text-white">
            <p>{user?.email}</p>
          </li>
          {isAdmin && (
            <li className="font-semibold text-white">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
          )}
          {!isLoggedIn ? (
            <li className="font-semibold text-white">
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <li id="logout" className="font-semibold cursor-pointer text-white">
              <span>Log out</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
