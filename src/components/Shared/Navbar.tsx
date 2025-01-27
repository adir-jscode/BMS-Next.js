"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Navbar() {
    const navItems = [
        {name: 'Home', link: '/'},
        {name: 'About', link: '/about'},
        {name: 'Services', link: '/services'},
        {name: 'Contact', link: '/contact'},
    ]
  return (
<div className="navbar bg-slate-400 text-slate-900">
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
    <a className="btn btn-outline btn-primary px-8">
        {/* icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Login
        </a>
  </div>
    </div>
  
</div>
  )
}
