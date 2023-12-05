import React from 'react';
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from "next/dynamic";

function Navbar() {


  return (
    <nav className='navbar'>
         <div className="w-[100px] h-[80px] "><img  src="logo1.png"></img></div>      
         <ul className='navItems font-homefont'>
             <li className='hover:text-[1.4em] text-[1.2em] p-[15px]'  style={{'text-shadow': '5px 5px 40px hsl(0, 0%, 6%)','color':"#fbf8f0"}} ><Link href="/">HOME</Link></li>
             <li className='hover:text-[1.4em] text-[1.2em] p-[15px]' style={{'text-shadow': '5px 5px 40px hsl(0, 0%, 6%)', 'color':"#fbf8f0" }} ><Link href="/register">REGISTER</Link></li>
             <li className='hover:text-[1.4em] text-[1.2em] p-[15px]' style={{'text-shadow': '5px 5px 40px hsl(0, 0%, 6%)', 'color':"#fbf8f0"}} ><Link href="/search">GET DETAILS/TRANSFER</Link></li>
             <li className='hover:text-[1.4em] text-[1.2em] p-[15px]' style={{'text-shadow': '5px 5px 40px hsl(0, 0%, 6%)', 'color':"#fbf8f0"}}><Link href="/history">HISTORY</Link></li>
             <li className='hover:text-[1.4em] text-[1.2em] p-[15px]' style={{'text-shadow': '5px 5px 40px hsl(0, 0%, 6%)', 'color':"#fbf8f0"}} ><Link href="/about">ABOUT</Link></li>
             <li ><ConnectButton accountStatus="address" chainStatus="none" showBalance={false}/></li>
         </ul>
    </nav>
  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });