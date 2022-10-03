import React, { useState } from 'react';
import SweaterList from "../components/ProductList";

import Button from "react-bootstrap/Button";

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        console.log('hi');
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    const refreshPage = () => {
        window.location.reload();
    } 

    return (
        <div className='profile'>
            <h1 className="title">Upload a Sweater!</h1>
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <Button onClick={refreshPage}>
                    Submit
                </Button>
            </form>
            <div className='inputData'>
                <ul>
                        <span>Title: </span>
                    <li>
                        <input
                        id="fileInput"
                        type="text"
                        name="title"
                        className="form-input"
                        />
                    </li>
                        <span>Description: </span>
                    <li>
                        <textarea
                        id="fileInput"
                        type="text"
                        name="title"
                        className="form-input"
                        />
                    </li>
                        <span>Price: </span>
                    <li>
                        <input
                        id="fileInput"
                        type="text"
                        name="title"
                        className="form-input"
                        />
                    </li>
                </ul>
                {previewSource && (
                <img className='renderImg'
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
            </div>
            <h1>My Sweaters: </h1>
            <SweaterList />
        </div>
    );
}