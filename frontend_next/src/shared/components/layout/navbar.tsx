"use client"

import { Menu, Bell, Search, User, Pointer } from "lucide-react"
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";

interface NavBarProps {
    onToggleSidebar: () => void;
}
  
export function NavBar({onToggleSidebar}: NavBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="grid grid-cols-10 h-16 items-center px-6">
      <div className="flex flex-row col-span-1">
        <Menu className="flex cursor-pointer" onClick={onToggleSidebar}/>
        <h1>Doctor</h1>
      </div>
      <div className="col-span-6"></div>
      <div className="flex flex-row justify-start col-span-1">
        <Search className="flex cursor-pointer" onClick={() => setIsSearchOpen((prev) => !prev)} />
        {isSearchOpen && (
          <Input
          id="search"
          type="search"
          placeholder="search"
        ></Input>
        )}
        
      </div>
      <div className="flex flex-row justify-end col-span-1"><Bell className="flex cursor-pointer" /></div>
      <div className="flex flex-row justify-end col-span-1"><User className="flex cursor-pointer" /></div>      
    </header>
  )
}