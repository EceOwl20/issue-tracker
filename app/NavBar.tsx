'use client'
import React from 'react'
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { link } from 'fs';

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
    const links =[
        {label:'Dashboard',href:'/'},
        {label:'Issue',href:'/issues'},
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center' >
        <Link href="/"><FaBug/></Link>
        <ul className='flex space-x-6'>
            {links.map(link=> 
            <Link 
            key={link.href} 
            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500' : link.href !== currentPath,
              'hover:text-zinc-800 transition-colors' : true
            })}
            //className={`${link.href==currentPath ? 'text-zinc-900': 'text-zinc-500'} hover:text-zinc-800 transition-colors`} 
            href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar
