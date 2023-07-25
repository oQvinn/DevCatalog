import { useState } from "react";
import {Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyDocument = (resumePath) => {
    const [numberPages, useNumberPages] = useState(null);

    const OnDocumentLoadSuccess = ({numPages} , useNumberPages) => {
        useNumberPages(numPages);
    };

    return(
        <div>
            <Document file={`http://localhost:3001/assets/${resumePath.path}`} onLoadSuccess={event => OnDocumentLoadSuccess(event, useNumberPages)}>
                <Page pageNumber={1} renderTextLayer={false}></Page>
            </Document>
        </div>
    )
}

export default MyDocument;