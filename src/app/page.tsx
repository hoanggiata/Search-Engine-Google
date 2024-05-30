"use client"
import Image from "next/image";
import axios from "axios";
import React from "react";
import { use, useState } from "react";
export default function Home() {
  const [value,setValue] = useState('');
  const [suggestions,setSuggestions] = useState([]);

  const onChange = async (event) =>{
    const term = event.target.value;
    setValue(term);

    if(term)
      {
        const responde = await fetch(`/api/suggest?term=${term}`);
        const result = await responde.json();
        setSuggestions(result);
      }
    else{
      setSuggestions([]);
    }
  };
  
  return <>
  <div className="flex flex-col items-center justify-between min-h-screen dark:bg-[#1a1c1d] dark:bg-blend-darken dark:text-white text-black">
    <header className="flex w-full justify-between text-base p-5 text-gray-700 dark:text-gray-300 md:font-medium">
      <div className="flex space-x-4 items-center">
        <p>About</p>
        <p>Store</p>
      </div>
      <div className="flex space-x-4 items-center">
        <p>Gmail</p>
        <p>Images</p>
      </div>
    </header>

    <form className="flex flex-col h-96 items-center justify-center flex-grow sm:w-[90%]">
      <div>
        <Image src="https://next-gooogle.vercel.app/_next/image?url=http%3A%2F%2Fassets.stickpng.com%2Fimages%2F580b57fcd9996e24bc43c51f.png&w=640&q=75"
        alt="Search Engine Logo"
        width={225}
        height={100}></Image>
      </div>
      <div className={`flex w-full mt-5 hover:shadow focus-within:shadow px-5 py-2 rounded-full border border-gray-500 md:hover:border-white sm:py-3 items-center
       sm:max-w-1 lg:max-w-2xl relative ${suggestions.length > 0 ? `rounded-b-none`: ``}`}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" fill="#6B7280">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
        <input type="text" value={value} onChange={onChange} className="dark:bg-[#1a1c1d] w-full focus:outline-none flex-grow mx-2 bg-transparent"/>
        {suggestions.length > 0 && (
          <ul className={`dark:bg-[#1a1c1d] w-full sm:max-w-1 lg:max-w-2xl focus:outline-non rounded-[40px] border border-gray-500 absolute top-[49px] left-0 pt-2 pb-5
            ${suggestions.length > 0 ? `rounded-t-none` : ``}`}>
            {suggestions.map((suggestion,index)=>(

              <li key={index} className="hover:bg-gray-700 flex leading-4 h-10 items-center pl-4" onClick={async() =>{
                setValue(suggestion);
                const responde = await fetch(`/api/suggest?term=${suggestion}`);
                const result = await responde.json();
                setSuggestions(result);
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" className="mr-3" fill="#6B7280">
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
                {suggestion}
                </li>

            ))}
          </ul>
        )}
        <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/6B7280/microphone--v1.png" alt="microphone--v1"/>

      </div>
    </form>

    <footer className="w-full bg-gray-800 mt-[15rem] text-base">
      <div className=" w-full pt-[10px] pb-[10px] pl-[20px] pr-[20px]">
        VietNam
      </div>
      <div className="flex w-full bg-transparent justify-between pt-[10px] pb-[10px] pl-[20px] pr-[20px]">
        <div className="flex space-x-4 items-center">
          <p>About</p>
          <p>Advertising</p>
          <p>Business</p>
          <p>How Search works</p>
        </div>
        <div className="flex space-x-4 items-center">
          <p>Privacy</p>
          <p>Terms</p>
          <p>Settings</p>
        </div>
      </div>
    </footer>
  </div>
  </>
}
