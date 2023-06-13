
import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageScale, setPageScale] = useState(0.90);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handlePrev = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber => pageNumber - 1);
        }
    }

    const handleNext = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber => pageNumber + 1);
        }
    }

    const handleZoomOut = () => {
        //membatasi zoom
        if (pageScale > 0.75) {
            setPageScale(pageScale => pageScale - 0.1);
        }
    }

    const handleZoomIn = () => {
        //membatasi zoom
        if (pageScale < 2.0) {
            setPageScale(pageScale => pageScale + 0.1);
        }
    }
    
    return (
        <div className="w-screen flex flex-col items-center">
            <h1 className='my-5 font-extrabold text-4xl'>PDF Reader</h1>
            <div className='mt-3 md:mt-5 flex flex-col justify-evenly gap-3 h-full'>
                <div className='w-screen h-full flex justify-center'>
                    <Document className='w-full md:w-max' file={'/assets/pdf/phone.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} scale={pageScale} width={320} className='flex justify-center bg-slate-500 md:drop-shadow-xl md:border-4 md:border-white' />
                        <span onClick={handlePrev} className={`${pageNumber <= 1 ? 'cursor-default': 'cursor-pointer'} fixed bg-slate-0 top-0 left-0 w-1/3 md:w-1/2 h-full select-none`}></span>
                        <span onClick={handleNext} className={`${pageNumber < numPages ? 'cursor-pointer' : 'cursor-default'} fixed bg-slate-0 top-0 right-0 w-1/3 md:w-1/2 h-full select-none`}></span>
                    </Document>
                </div>
                <div className='bottom-0 self-center flex flex-row justify-between md:justify-around items-center mb-5 mt-3 z-50 w-full md:w-fit gap-0 md:gap-5 bg-slate-200 py-3 px-4 rounded-full drop-shadow-xl'>
                    <span onClick={handlePrev} className={`${pageNumber <= 1 ? 'cursor-default': 'cursor-pointer'} bg-slate-600 select-none p-2 rounded-full`}><BsChevronLeft className='text-white text-2xl'/></span>
                    <span onClick={handleZoomOut} className={`${pageNumber <= 1 ? 'cursor-default': 'cursor-pointer'} bg-slate-600 select-none p-2 rounded-full`}><AiOutlineZoomOut className='text-white text-2xl' /></span>
                    <span className='mx-3 text-center text-sm md:text-base'>Page {pageNumber} of {numPages}</span>
                    <span onClick={handleZoomIn} className={`${pageNumber < numPages ? 'cursor-pointer' : 'cursor-default'} bg-slate-600 select-none p-2 rounded-full`}><AiOutlineZoomIn className='text-white text-2xl'/></span>
                    <span onClick={handleNext} className={`${pageNumber < numPages ? 'cursor-pointer' : 'cursor-default'} bg-slate-600 select-none p-2 rounded-full`}><BsChevronRight className='text-white text-2xl'/></span>
                </div>
            </div>
        </div>
    )
}

export default PDFReader