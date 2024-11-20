"use client"
import { useEffect, useState } from 'react';
export default function LinkComponent({item} : any) {  
    const [ogImage, setOgImage] = useState("");
    const removeQuotes = (str) => {
        return str.replace(/"/g, "");
    };
    let htmlSnippet;
    
    function sliceString(str) {
        if (str.length > 160) {
            htmlSnippet = str.slice(0, 160) + " ...";
            return removeQuotes(htmlSnippet);
        }
        return removeQuotes(str);
    }

    // const fetchOgImage = async (url) => {
    //     try {
    //         const respond = await fetch(url);
    //         const data = await respond.text();
    //         const $ = cheerio.load(data);
    //         const ogImage = $('meta[property="og:image"]').attr('content');
    //         console.log("ogImage",ogImage);
    //          return ogImage || null;
    //     } catch (error) {
    //         console.error('Error fetching OG image:', error); return null;
    //     }
    // } 
    // useEffect(() => {
    //     const getOgImage = async () => {
    //         const image = await fetchOgImage(item.link);
    //         if(image !== null){setOgImage(image ?? "");}
    //     }
    //     getOgImage();
    // },[]);
    return (
        <div className="mb-7 w-[600px]">
            <div className="">
                <div className=" relative">
                    <span className=" absolute flex bg-[#fff] border rounded-[50%] w-7 h-7 mt-1">
                        <div className="">
                        </div>
                    </span> 
                    <div className=" text-[12px] ml-10">
                        <span dangerouslySetInnerHTML={{__html: removeQuotes(item.title)}}></span>
                    </div> 
                    <div className="text-[12px] pt-1 ml-10">
                        <span>{item.displayLink}</span>
                    </div>
                    <a href={`${item.link}`} className=" hover:underline decoration-[#99c3ff] decoration-2 text-xl font-normal"><h3 className="text-[#99c3ff] mt-2" dangerouslySetInnerHTML={{__html: removeQuotes(item.title)}}></h3></a>
                </div>
                <div className="">
                    <div>
                        <span dangerouslySetInnerHTML={{ __html: sliceString(item.htmlSnippet) }} className=" text-sm text-[#bfbfbf]"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}