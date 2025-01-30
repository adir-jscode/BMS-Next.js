"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoIosLogIn } from 'react-icons/io';

export default function Navbar() {
  const pathName = usePathname();
  console.log(pathName); 
    const navItems = [
        {name: 'Home', link: '/'},
        {name: 'About', link: '/about'},
        {name: 'Services', link: '/services'},
        {name: 'Contact', link: '/contact'},
        {name: 'Dashbaord', link: '/employee-dashboard'}
    ]

 if(!pathName.includes('dashboard'))
  {
    return (
      <div className="bg-base-100  text-slate-900 border-b-[1px] py-2">
      <div className="navbar container mx-auto">
          <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <Link href={'/'}>
              <Image src="/assets/logo.png" alt="logo" width={60} height={100} />
              </Link>
          <a className="btn btn-ghost text-xl">Uri <span className='text-orange-700'>Bank</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className='flex items-center space-x-4'>
              {/* nav objects */}
              {navItems.map((item, index) => (
                  <Link className='font-semibold hover:text-primary' key={index} href={item.link}>
                  {item.name}               
                  </Link>
              ))}
          </div>
        </div>
        <div className="navbar-end">
          {/* login icon */}
          <Link href='/login' className="btn btn-primary px-8 py-2 text-semibold">
              {/* icon */}
              <IoIosLogIn />
              Login
              </Link>
        </div>
          </div>
        
      </div>
        )

  }
  
}
