import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState();

  const docs = [
    { uri: pdfUrl}, 
  ];
  console.log(pdfUrl);
  useEffect(() => {
    // Make a request to fetch the PDF file when the component mounts
    axios.get('https://skillety-n6r1.onrender.com/api/getpdf', { responseType: 'blob' })
      .then(response => {
        // Create a URL for the PDF blob and set it to 'pdfUrl' state
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const pdfBlobUrl = URL.createObjectURL(blob);
        
        setPdfUrl(pdfBlobUrl);
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {pdfUrl ? (
        // Use an iframe or any PDF viewer component to display the PDF
        // <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}

export default PDFViewer;