import { isEmpty } from "lodash";
import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./csvFileSpillter.css";

const CsvFileSplitter = () => {
  const [isDownloading, setDisableDownload] = useState(false);
  const [isSplitting, setSplitting] = useState(false);
  const [isSplit, setSplitStatus] = useState(false);
  const [fileCount, setFileCount] = useState(1);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [buttonText, setButtonText] = useState("Split the file");
  const [processText, setProcessText] = useState("Splitting...");

  let ROOT_URL;

  if (window.location.origin === "https://quiet-starlight-5f6165.netlify.app") {
    ROOT_URL = "https://frozen-shelf-34251.herokuapp.com";
  } else {
    ROOT_URL = "http://localhost:8080";
  }

  console.log(window.location.origin);
  console.log(ROOT_URL);
  const inputRef = useRef(null);

  const refresh = () => {
    setSplitStatus(false);
    setSplitting(false);
    setButtonText("Split the file");
    setProcessText("Splitting...");
  };

  const handleUpload = () => {
    inputRef.current.click();
    refresh();
  };

  const handleDisplayFileDetails = () => {
    if (inputRef.current.files && inputRef.current.files.length > 0) {
      setUploadedFileName(inputRef.current.files[0].name);
      setUploadedFile(inputRef.current.files[0]);
    }
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  };

  const createAndDownloadBlobFile = (body, filename, extension = "zip") => {
    const blob = new Blob([body], { type: "application/octet-stream" });
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const callSplitAPI = async () => {
    var apiRequestData = new FormData();
    apiRequestData.append("file", uploadedFile);
    apiRequestData.append("fileCount", fileCount);
    console.log(`${ROOT_URL}split-files`);
    await axios
      .post(`${ROOT_URL}/split-files`, apiRequestData)
      .then((response) => {
        console.log(response);
        const base64Zip = response.data.data || "";
        if (response && response.status === 200) {
          setBase64String(base64Zip);
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return true;
  };

  const handleSplit = async () => {
    setSplitting(true);
    const response = await callSplitAPI();
    if (response) {
      setSplitStatus(true);
      setSplitting(false);
      setButtonText("Download");
      setProcessText("Downloading...");
    } else {
      refresh();
    }
  };

  const handleDownload = () => {
    setDisableDownload(true);
    const arrayBuffer = base64ToArrayBuffer(base64String);
    createAndDownloadBlobFile(arrayBuffer, "SplittedFiles");
    setTimeout(() => {
      setDisableDownload(false);
    }, 2000);
  };
  const validate = () => {
    if (isSplit) {
      return isDownloading;
    } else {
      return isEmpty(uploadedFileName) || isSplitting;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-around mt-4">
        <div className="card shadow-lg p-3 mb-5 bg-white rounded card-btn">
          <div className="card-body">
            <h4 className="text-center card-title">CSV File Splitter</h4>
            <div className="card-body"></div>
            <div className="m-3">
              <label className="mx-3">Upload the excel file to be split:</label>
              <input
                ref={inputRef}
                onChange={handleDisplayFileDetails}
                className="d-none"
                type="file"
              />
              <button
                onClick={handleUpload}
                className="btn btn-outline-primary"
              >
                {uploadedFileName ? "Upload Again" : "Upload"}
              </button>
            </div>
            <div className="m-3">
              <label className="mx-3">
                <b>
                  {uploadedFileName
                    ? `Uploaded File: ${uploadedFileName}`
                    : null}
                </b>
              </label>
            </div>

            <div className="m-3">
              <label className="mx-3">Number of files to be split: </label>
              <input
                className="form-control form-inline mb-2"
                type="number"
                value={fileCount}
                onChange={(e) => setFileCount(e.target.value)}
                min={1}
              />
            </div>
            <div className="m-3 float-right">
              <Button
                onClick={() => {
                  isSplit ? handleDownload() : handleSplit();
                }}
                disabled={validate()}
                variant="outline-primary"
              >
                {isSplitting || isDownloading ? processText : buttonText}
              </Button>
            </div>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default CsvFileSplitter;
