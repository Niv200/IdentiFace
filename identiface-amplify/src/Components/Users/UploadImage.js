import React, { useState } from "react";
import AWS from "aws-sdk";
import Amplify, { Storage } from "aws-amplify";
import config from "../../Components/../aws-exports";
Amplify.configure(config);

const uploadFile = (file, name, setProgress) => {
  Storage.put(name, file, {
    contentType: "image/png",
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

export default function UploadImage() {
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  let progressText;
  if (progress > 1) {
    progressText = progress + "%";
    if (progress === 100) {
      progressText = "Done uploading!";
    }
  }
  return (
    <div>
      <div>{message}</div>
      <div>
        <label>Select image (.png)</label>
        <input type="file" name="file" onChange={(e) => uploadImage(e.target.files[0], setFile, setMessage)} />
      </div>
      <div>
        <label>First name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <button onClick={() => upload(firstName, lastName, setMessage, file, setProgress)}>Upload person</button>
      <div>{progressText}</div>
    </div>
  );
}

//Verify values and file before uploading file
const upload = (firstName, lastName, setMessage, file, setProgress) => {
  if (firstName.length > 2 && lastName.length > 2) {
    if (!file) {
      setMessage("Image is not valid!");
    } else {
      setMessage(undefined);
      let fileName = firstName + "-" + lastName + ".png";
      console.log(file);
      uploadFile(file, fileName, setProgress);
    }
  } else {
    if (firstName.length > 3) {
      setMessage("Last name is too short!");
    } else {
      setMessage("First name is too short!");
    }
  }
};

//Upload image finally
const uploadImage = (file, setFile, setMessage) => {
  if (file) {
    if (file.name && (file.name.endsWith(".jpg") || file.name.endsWith(".png"))) {
      setFile(file);
      setMessage(undefined);
    } else {
      setFile(undefined);
      setMessage("Image must end with .jpg/.png");
    }
  } else {
    setFile(undefined);
    setMessage("Image must end with .jpg/.png");
  }
};
