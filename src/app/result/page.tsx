"use client";
import { Stack, Pagination } from '@mui/material';
import LinkComponent from "@/components/LinkComponent";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";
export default function Result() {
    const searchParams = useSearchParams();
    const term = searchParams.get("term");
    const [value,setValue] = useState(term);
    const [suggestions,setSuggestions] = useState([]);
    const [searchResult,setSearchResult] = useState([]);
    const [page,setPage] = useState(1);
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && value !== "") {
            event.preventDefault();
            window.location.href = `/result?term=${value}`;
        }
    };
    
    
    useEffect(() => {
        // const checkValue = () => {
        //     if(value !== ""){setIsSearch(true)}
        // }
        const fetchData = async () => {
            if(value !== ""){          
                const respond = await fetch(`/api/search?term=${value}&page=${page}`);
                const result = await respond.json();
                setSearchResult(result);
            }
        }
        // checkValue();
        fetchData();      
    }, [page]);
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
    const handleOnClick = () => {
        window.location.href = `/result?term=${value}`
    }
    const handleOnClickDeleteValue = () => {
        setValue('');
        setSuggestions([]);
    }
    const handlePageChange = (event, value) => {
        setPage(value);
        console.log("Value:", value);
    }
    return(
        <>
        <main className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#1a1c1d]">
            <header className="w-full h-[75px] bg-[#1a1c1d] pt-2">
                <div className="h-full w-full flex lg:items-end flex-col lg:flex-row">
                    <div className=" pl-14 pr-8 mb-2">
                        <a href="/" title="Google Logo Home">
                            <svg height="30" viewBox="0 0 92 30" width="92" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.9 15.51c0 4.26-3.32 7.39-7.4 7.39s-7.4-3.14-7.4-7.39c0-4.28 3.32-7.39 7.4-7.39s7.4 3.1 7.4 7.39zm-3.24 0c0-2.66-1.93-4.48-4.16-4.48-2.23 0-4.16 1.82-4.16 4.48 0 2.63 1.93 4.48 4.16 4.48 2.23 0 4.16-1.85 4.16-4.48zm-23.7 7.47C5.63 22.98.31 17.83.31 11.5S5.63.02 11.96.02c3.5 0 5.99 1.37 7.87 3.16L17.62 5.4c-1.34-1.26-3.16-2.24-5.66-2.24-4.62 0-8.23 3.72-8.23 8.34 0 4.62 3.61 8.34 8.23 8.34 3 0 4.7-1.2 5.79-2.3.9-.9 1.49-2.2 1.74-4.17H12v-3.14h10.52c.11.56.17 1.23.17 1.96 0 2.35-.64 5.49-2.72 7.56-2.02 2.11-4.59 3.23-8.01 3.23zm42.94-7.47c0 4.26-3.32 7.39-7.4 7.39s-7.4-3.14-7.4-7.39c0-4.28 3.32-7.39 7.4-7.39s7.4 3.1 7.4 7.39zm-3.24 0c0-2.66-1.93-4.48-4.16-4.48-2.23 0-4.16 1.82-4.16 4.48 0 2.63 1.93 4.48 4.16 4.48 2.23 0 4.16-1.85 4.16-4.48zM70 8.56v13.27c0 5.46-3.05 7.7-6.86 7.7-3.58 0-5.74-2.41-6.55-4.37l2.83-1.18c.5 1.2 1.74 2.63 3.72 2.63 2.44 0 3.78-1.51 3.78-4.34v-1.06h-.11c-.73.9-2.04 1.68-3.81 1.68-3.7 0-7-3.22-7-7.36 0-4.17 3.3-7.42 7-7.42 1.76 0 3.08.78 3.81 1.65h.11v-1.2H70zm-2.86 6.97c0-2.6-1.74-4.51-3.95-4.51-2.24 0-3.95 1.9-3.95 4.51 0 2.58 1.71 4.45 3.95 4.45 2.22.01 3.95-1.87 3.95-4.45zM75 1.17V22.9h-3V1.17h3zm12.5 16.77l2.48 1.68c-.8 1.2-2.73 3.28-6.06 3.28-4.13 0-7.22-3.25-7.22-7.39 0-4.4 3.11-7.39 6.86-7.39 3.78 0 5.62 3.05 6.23 4.7l.31.85-9.71 4.08c.74 1.48 1.9 2.24 3.53 2.24s2.76-.82 3.58-2.05zm-7.63-2.66l6.5-2.74c-.36-.92-1.43-1.57-2.7-1.57-1.62 0-3.88 1.46-3.8 4.31z" fill="#FFF">
                                </path>
                            </svg>
                        </a>
                    </div>
                    <div className="ml-1">
                        <div className={`flex w-[690px] min-h-11 mt-5 hover:shadow bg-[#4d5156] focus-within:shadow px-5 py-2 rounded-[24px] border-transparent items-center
                        lg:max-w-2xl relative ${suggestions.length > 0  ? `rounded-b-none bg-[#303134]`: `rounded-[24px]`} `}>                     
                            <input type="text" onKeyDown={handleKeyDown} className={`bg-[#4d5156] w-full focus:outline-none flex-grow mx-2 bg-transparent 
                            ${suggestions.length > 0 ? ` bg-[#303134]`: ``}`}
                            value={value} onChange={onChange}/>
                            <img src="/icon-close.png" alt="close" className={`mr-6 cursor-pointer ${value !== "" ? ``: `hidden`}`} onClick={handleOnClickDeleteValue} />
                            <span className={`block border-r h-[20px] mr-6 border-[#F8F9FA] ${value !== "" ? ``: `hidden`} `}></span>
                            <svg className="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill="#8ab4f8" onClick={handleOnClick}>
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                            </svg>
                            {suggestions.length > 0 ? (
                            <ul className={`bg-[#303134] z-10 w-full sm:max-w-1 lg:max-w-2xl focus:outline-non rounded-[24px] border border-transparent absolute lg:top-[44px] top-[40px] left-0 pt-2 pb-5
                                ${suggestions.length > 0 ? `rounded-t-none` : ``}`}>
                                {suggestions.map((suggestion,index)=>(

                                <li key={index} className="hover:bg-gray-700 flex leading-4 h-[30px] items-center pl-4" onClick={async() =>{
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
                            ) : ""}
                        </div>
                    </div>
                </div>                               
            </header>
            <div className="min-h-screen w-full">
                <div className="flex border-b border-b-slate-800 pb-3 pt-8 pl-[200px] text-[#9aa0a6] max-w-[1160px]">
                    <ul className="flex gap-6 text-sm">
                        <li className="text-white"><a href="#" className="pl-3 pr-3 pb-2 border-b-[3px] border-b-[#e8e8e8]">All</a></li>
                        <li className=""><a href="#" className="pl-3 pr-3 pb-2 ">Images</a></li>
                        <li className=""><a href="#" className="pl-3 pr-3 pb-2 ">Videos</a></li>
                        <li className=""><a href="#" className="pl-3 pr-3 pb-2 ">News</a></li>   
                        <li className=""><a href="#" className="pl-3 pr-3 pb-2 ">More</a></li>                        
                    </ul>
                </div>
                <div className="w-full h-full flex mt-9 ml-[194px] flex-col">
                    {searchResult.map((item, index) => (<LinkComponent item={item} key={index}/>))}
                    <div className=" ml-40 mt-8 mb-8">
                        <div className="pl-14 ml-16 pr-8 mb-2">
                            <span title="Google Logo Home">
                                <svg height="30" viewBox="0 0 92 30" width="92" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M38.9 15.51c0 4.26-3.32 7.39-7.4 7.39s-7.4-3.14-7.4-7.39c0-4.28 3.32-7.39 7.4-7.39s7.4 3.1 7.4 7.39zm-3.24 0c0-2.66-1.93-4.48-4.16-4.48-2.23 0-4.16 1.82-4.16 4.48 0 2.63 1.93 4.48 4.16 4.48 2.23 0 4.16-1.85 4.16-4.48zm-23.7 7.47C5.63 22.98.31 17.83.31 11.5S5.63.02 11.96.02c3.5 0 5.99 1.37 7.87 3.16L17.62 5.4c-1.34-1.26-3.16-2.24-5.66-2.24-4.62 0-8.23 3.72-8.23 8.34 0 4.62 3.61 8.34 8.23 8.34 3 0 4.7-1.2 5.79-2.3.9-.9 1.49-2.2 1.74-4.17H12v-3.14h10.52c.11.56.17 1.23.17 1.96 0 2.35-.64 5.49-2.72 7.56-2.02 2.11-4.59 3.23-8.01 3.23zm42.94-7.47c0 4.26-3.32 7.39-7.4 7.39s-7.4-3.14-7.4-7.39c0-4.28 3.32-7.39 7.4-7.39s7.4 3.1 7.4 7.39zm-3.24 0c0-2.66-1.93-4.48-4.16-4.48-2.23 0-4.16 1.82-4.16 4.48 0 2.63 1.93 4.48 4.16 4.48 2.23 0 4.16-1.85 4.16-4.48zM70 8.56v13.27c0 5.46-3.05 7.7-6.86 7.7-3.58 0-5.74-2.41-6.55-4.37l2.83-1.18c.5 1.2 1.74 2.63 3.72 2.63 2.44 0 3.78-1.51 3.78-4.34v-1.06h-.11c-.73.9-2.04 1.68-3.81 1.68-3.7 0-7-3.22-7-7.36 0-4.17 3.3-7.42 7-7.42 1.76 0 3.08.78 3.81 1.65h.11v-1.2H70zm-2.86 6.97c0-2.6-1.74-4.51-3.95-4.51-2.24 0-3.95 1.9-3.95 4.51 0 2.58 1.71 4.45 3.95 4.45 2.22.01 3.95-1.87 3.95-4.45zM75 1.17V22.9h-3V1.17h3zm12.5 16.77l2.48 1.68c-.8 1.2-2.73 3.28-6.06 3.28-4.13 0-7.22-3.25-7.22-7.39 0-4.4 3.11-7.39 6.86-7.39 3.78 0 5.62 3.05 6.23 4.7l.31.85-9.71 4.08c.74 1.48 1.9 2.24 3.53 2.24s2.76-.82 3.58-2.05zm-7.63-2.66l6.5-2.74c-.36-.92-1.43-1.57-2.7-1.57-1.62 0-3.88 1.46-3.8 4.31z" fill="#FFF">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        <Stack spacing={2}>
                            <Pagination
                                count={10}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        color: 'white', // Change the text color
                                    }}}/>
                        </Stack>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>        
        </>
    );
}