import React, { useState } from "react";

function Pagination({ handleNext, handlePrevious, pageNo }) {
    const disabled = pageNo == 1 ? "text-gray-500" : "text-black";
    return (
        <div className='bg-gray-400 h-[50px] w-full mt-8 flex justify-center gap-15 items-center'>
            <div onClick={handlePrevious}>
                <i class={`fa-solid fa-arrow-left text-2xl ${disabled}`}></i>
            </div>
            <div className="font-bold text-3xl">{pageNo}</div>
            <div onClick={handleNext}>
                <i class="fa-solid fa-arrow-right text-2xl"></i>
            </div>
        </div>
    )
};

export default Pagination;