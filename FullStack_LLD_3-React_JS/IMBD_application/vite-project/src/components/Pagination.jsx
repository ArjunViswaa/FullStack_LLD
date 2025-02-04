import React from "react";

const Pagination = ({pageNo, setPage}) => {
    const handleNext = () => {
        setPage(pageNo + 1);
    }

    const handlePrev = () => {
        setPage(pageNo - 1);
    }

    return (
        <div className='bg-gray-400 p-4 h-[50px] flex justify-center gap-2 m-7'>
            {pageNo > 1 &&
                <div onClick={handlePrev} className='px-8 hover:cursor-pointer hover:scale-130'>
                    <i className='fa-solid fa-arrow-left'></i>
                </div>
            }
            <div className='hover:scale-150 hover:cursor-pointer'>{pageNo}</div>
            <div onClick={handleNext} className='px-8 hover:cursor-pointer hover:scale-130'>
                <i className='fa-solid fa-arrow-right'></i>
            </div>
        </div>
    )
}

export default Pagination;