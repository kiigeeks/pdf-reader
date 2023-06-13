import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center flex-col gap-5 bg-slate-100">
            <h1 className='font-poppins font-extrabold text-2xl md:text-3xl text-center mb-5'>PDF Reader in React JS</h1>
            <div className='flex flex-row justify-center gap-5 mx-3'>
                <Link to={'/pdf'} className='py-3 px-4 bg-white drop-shadow-xl rounded-lg font-poppins text-base md:text-lg text-center cursor-pointer'>
                    PDF Reader Basic
                </Link>
                <Link to={'/flipbook'} className='py-3 px-4 bg-white drop-shadow-xl rounded-lg font-poppins text-base md:text-lg text-center cursor-pointer'>
                    PDF Reader Flipbook
                </Link>
            </div>
        </div>
    )
}

export default Home