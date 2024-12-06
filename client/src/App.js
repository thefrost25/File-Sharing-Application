import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [showQR, setShowQR] = useState(false); 
  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>File Sharing App</h1>
        <p>Upload a file and share its download link easily!</p>

        <button onClick={onUploadClick}>Upload File</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <>
            <div className="result-table-container">
              <table className="result-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Share Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{file.name}</td>
                    <td>
                      <a href={result} target="_blank" rel="noopener noreferrer">
                        {result}
                      </a>
                    </td>
                    <td>
                      <button className="copy-btn" onClick={copyToClipboard}>
                        📋
                      </button>
                      <button
                        className="qr-btn"
                        onClick={() => setShowQR(!showQR)}
                      >
                        🔗 QR Code
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {showQR && (
              <div className="qr-code-container">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${result}`}
                  alt="QR Code"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
