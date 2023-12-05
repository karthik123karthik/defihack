'use client';

import dynamic from "next/dynamic";

function Home() {
  return (
    <>    <div className="flex flex-row justify-center items-center text-white  h-[80vh] m-[50px]">
    <div className="flex flex-col justify-center items-left text-white  h-[80vh] m-[50px]">
       <h1 className="font-homefont text-2xl font-bold md:text-5xl">Secure Tomorrow, Register Today</h1>
       <br></br>
       <h1 className="font-homefont1 text-xl font-bold md:text-3xl">Transforming Land Ownership with Blockchain</h1>
    </div>
       <div><img  src="wallpng.png"></img></div>
       
    </div>

<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Landly™</a>. All Rights Reserved.
</span>

<ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
    <li>
        <a href="/about" class="hover:underline me-4 md:me-6">About</a>
    </li>
    <li>
        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
    </li>
    <li>
        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
    </li>
    <li>
        <a href="https://twitter.com/BenniDarshan" class="hover:underline">Contact</a>
    </li>
</ul>
</div>
</footer>

</>

    
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
