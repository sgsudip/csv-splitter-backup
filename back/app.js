const express = require("express");
const cors = require("cors");
const child_process = require("child_process");
const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");
const AdmZip = require("adm-zip");
const { on } = require("events");

const app = express();
const PORT = process.env.PORT || 8080;

const handler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB is the maximum upload size
  },
});
console.log("HANDLER");
console.log(handler);

// middleware for json parsing
app.use(express.json());
// middleware for cors requests
app.use(cors());

const pythonExecCommand =
  process.platform.includes("win") == true ? "python" : "python3";

//   root route, used to check server status
app.get("/", async (req, res) => {
  try {
    res.send("Server is up and running");
  } catch (err) {
    console.log(err.message);
    res.send({
      status: 500,
      data: null,
      message: err.message,
    });
  }
});

app.post("/split-files", handler.single("file"), async (req, res) => {
  try {
    let outputFiles;
    const fileDetails = req.file;
    console.log(fileDetails);
    const nFiles = req.body.fileCount;
    console.log("nfiles\n" + nFiles);
    const path = `/tmp/${uuid.v4()}_${fileDetails.originalname}`;
    console.log(path);
    fs.writeFileSync(__dirname + path, fileDetails.buffer);
    const pythonProcess = child_process.spawn("python", [
      `${__dirname + "/splitter.py"}`,
      path,
      fileDetails.originalname,
      nFiles,
    ]);
    // console.log(pythonProcess.stdout);

    pythonProcess.stdout.on("data", (data) => {
      console.log("data");
      console.log(data);
      outputFiles = data.toString();

      console.log("output files");
      console.log(outputFiles);
      outputFiles = eval(outputFiles);

      let zippedFiles = new AdmZip();
      for (const filePath of outputFiles) {
        zippedFiles.addLocalFile(__dirname + filePath);
        // fs.unlinkSync(__dirname + filePath);
      }

      const bufferToSend = zippedFiles.toBuffer();

      const base64FromBuffer = bufferToSend.toString("base64");
      res.send({
        status: 200,
        data: base64FromBuffer,
        message: "Done",
      });
    });

    // pythonProcess.on("exit", (code, signal) => {
    //   console.log("code");
    //   console.log(code);
    //   console.log("signal");
    //   console.log(signal);
    // });

    pythonProcess.on("error", (err) => {
      console.log(err);
    });

    // console.log(pythonProcess);
    // outputFiles = pythonProcess.stdout.toString("utf-8");
    // console.log("output files");
    // console.log(outputFiles);

    // console.log("line 84");
    // console.log(outputFiles);
    // // the variable that is used to zip the file

    // console.log(zippedFiles);

    // fs.unlinkSync(__dirname + path);

    // try block end
  } catch (err) {
    console.log("hello");
    console.log(err.message);
    res.send({
      status: 500,
      data: null,
      message: err.message,
    });
  }
});

// express listening on the environment port or 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
