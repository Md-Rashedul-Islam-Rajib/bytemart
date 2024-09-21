"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import logo from "../../assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <Image src={logo} alt="ByteMart Logo" width={100} height={80} />
        </Link>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden md:flex space-x-6">
        <a href="/products" className="text-lg">
          Products
        </a>
        <a href="/about" className="text-lg">
          About
        </a>
        <a href="/contact" className="text-lg">
          Contact
        </a>
      </div>

      {/* Profile Icon */}
      <div className="hidden md:grid">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden flex gap-6">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => setIsOpen(!isOpen)} className="p-2"
        size="icon"
            >
          ☰
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white p-4 flex flex-col space-y-2 md:hidden">
          <a href="/products" className="text-lg">
            Products
          </a>
          <a href="/about" className="text-lg">
            About
          </a>
          <a href="/contact" className="text-lg">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
