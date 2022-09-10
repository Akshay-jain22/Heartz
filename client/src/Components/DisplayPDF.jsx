import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import './DisplayPDF.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

export default function DisplayPDF({ file, downloadFile }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const changePageNumber = (del) => {
        if (pageNumber + del > 0 && pageNumber + del <= numPages)
            setPageNumber(pageNumber + del);
    }

    return (
        <>
            <h2>Transcripted PDF</h2>
            <div className="Example__container__document">
                <Document file={file} onLoadSuccess={(e) => setNumPages(e.numPages)} options={options}>
                    <Page key={`page_${pageNumber}`} pageNumber={pageNumber} />
                </Document>
            </div>

            <p>
                <button type="button" className='btn btn-secondary' onClick={() => changePageNumber(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </button>

                Page : {pageNumber} / {numPages}

                <button type="button" className='btn btn-secondary' onClick={() => changePageNumber(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </button>
            </p>

            <button type="button" id='download' className="btn btn-outline-success" onClick={downloadFile}> Download Transcription
            </button>
        </>
    );
}