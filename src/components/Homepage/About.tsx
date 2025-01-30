import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <div className="hero min-h-screen text-slate-800">
    <div className="hero-content flex-col lg:flex-row">
        {/* Left Section with Images */}
        <div className='lg:w-1/2 relative'>
            <Image 
                width={1000} 
                height={1000} 
                alt='Team collaboration' 
                src={'/assets/images/employee_collaboration.jpg'} 
                className="w-3/4 rounded-lg shadow-2xl" 
            />
            <Image 
                width={1000} 
                height={1000} 
                alt='Bank system illustration' 
                src={'/assets/images/bank_system.jpg'} 
                className="w-1/2 absolute right-5 top-1/2 rounded-lg border-8 border-white shadow-2xl" 
            />
        </div>
        {/* Right Section with Content */}
        <div className='lg:w-1/2 space-y-5 p-4'>
            <h3 className='text-3xl text-blue-600 font-bold'>About Us</h3>
            <h1 className="text-5xl font-bold">Efficient & Reliable Employee Management</h1>
            <p className="py-6">
                Welcome to our Bank Management System – a cutting-edge platform designed to streamline employee operations, enhance productivity, and ensure secure and reliable management of banking processes. 
            </p>
            <p className="py-6">
                With years of expertise in banking software, we provide tailored solutions that empower employees to efficiently manage tasks, customer interactions, and banking services while maintaining the highest standards of data security.
            </p>
            {/* href */}
            <Link href={'/about'}>
                <button className="btn btn-primary">Learn More</button>
            </Link>
           
        </div>
    </div>
</div>

  )
}
