
import React, { useRef, useState } from 'react';
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Page = React.forwardRef(({ pageNumber, width, height }, ref) => {
    return (
        <div ref={ref} className='self-center mb-10'>
            <ReactPdfPage pageNumber={pageNumber} width={width} height={height} renderAnnotationLayer={false} renderTextLayer={false}/>
        </div>
    );
});

const Flip = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    // untuk lebar dan height sesuaikan secara manual dengan filenya
    const width = 250;
    const height = 445;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const book = useRef();

    return (
        <div className='w-screen flex flex-col items-center'>
            <h1 className='my-5 font-extrabold text-4xl'>PDF Flipbook</h1>
            <div className='mt-3 md:mt-5 flex flex-col justify-between gap-5'>
                <Document file={'/assets/pdf/edited_majalah.pdf'} onLoadSuccess={onDocumentLoadSuccess} className="self-center border-t-8 border-amber-500">
                    <HTMLFlipBook 
                        showCover={true}
                        maxShadowOpacity={2.0}
                        mobileScrollSupport={true}
                        width={width}
                        height={height}
                        onFlip={(e) => setPageNumber(e.data)}
                        flippingTime={1000}
                        ref={book}
                        className='mx-0 my-auto'
                    >
                        {Array.from({ length: numPages }, (_, index) => (
                            <Page pageNumber={index + 1} key={index} width={width} height={height} />
                        ))}
                    </HTMLFlipBook>
                </Document>
                <div className='flex flex-row justify-evenly md:justify-center items-center gap-0 md:gap-5 mx-3 z-50'>
                    <button onClick={() => book.current.pageFlip().flipPrev()} className='bg-slate-600 select-none p-2 rounded-full'><BsChevronLeft className='text-white text-2xl'/></button>
                    <span className='mx-3 text-center text-sm md:text-base'>Page {pageNumber + 1} of {numPages}</span>
                    <button onClick={() => book.current.pageFlip().flipNext()} className='bg-slate-600 select-none p-2 rounded-full'><BsChevronRight className='text-white text-2xl'/></button>
                </div>
            </div>
            
        </div>
    )
}

export default Flip