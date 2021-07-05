import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listfacesinbucket";
const url3 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/comparephoto";
const url4 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listdynamo";

export default function ComparePhoto() {
  const [photos, setPhotos] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [photo, setPhoto] = useState(undefined);
  const [collections, setCollections] = useState(undefined);
  const [collection, setCollection] = useState(undefined);
  const [accept, setAccept] = useState(undefined);
  const [progress, setProgress] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [dbUsers, setDBUsers] = useState(undefined);
  useEffect(() => {
    getPhotos(setPhotos, setStatus);
    updateCollectionsState(setCollections);
    getUsers(setDBUsers);
  }, []);
  if (!photos) {
    return (
      <div>
        <h3>Loading photos from S3...</h3>
      </div>
    );
  }
  if (status) {
    return (
      <div>
        <h1>{status}</h1>
      </div>
    );
  } else {
    if (!photo) {
      return (
        <div>
          <h3>Pick a photo to test</h3>
          <ul>{getList(photos, setPhoto)}</ul>
        </div>
      );
    }
    if (!collections) {
      return (
        <div>
          <h1>Loading collections...</h1>
        </div>
      );
    } else if (!collection) {
      return (
        <div>
          <h2>Choose collection to compare against:</h2>
          {/* <p className="paragraph">choose all to compare against all collections.</p> */}
          {constructList(collections, setCollection)}
        </div>
      );
    }
    if (!accept) {
      return (
        <div>
          <h1>
            You are about to compare {photo.replace("compare/", "")} against {collection} collection.
          </h1>
          <button onClick={() => compare(photo.replace("compare/", ""), collection, setAccept, setProgress, setResult)}>Accept</button>
          <button
            onClick={() => {
              setAccept(undefined);
              setCollection(undefined);
              setPhoto(undefined);
            }}
          >
            Back
          </button>
        </div>
      );
    }
    if (progress) {
      return (
        <div>
          <h2>Comparing in progress...</h2>
        </div>
      );
    }
    if (!dbUsers) {
      return (
        <div>
          <h2>Loading user IDs from DynamoDB...</h2>
        </div>
      );
    }
    if (result === "Error") {
      return (
        <div>
          <h2>Person does not exist in {collection} collection!</h2>
        </div>
      );
    } else {
      let userId = result.faceId;
      let foundUser = dbUsers.filter((dbu) => dbu.id === userId)[0];
      let userName = foundUser.name;
      return (
        <div>
          <h2>Result:</h2>
          <p className="Paragraph">{userName}</p>
        </div>
      );
    }
  }
}

const compare = (photo, collection, setAccept, setProgress, setResult) => {
  setAccept(true);
  setProgress(true);
  comparePhoto(photo.replace("compare/", ""), collection, setResult, setProgress);
};

const getList = (photos, setPhoto) => {
  return photos.map((photo) => {
    return (
      <li key={Math.floor(Math.random() * 100000000000)}>
        {photo.replace("compare/", "")} <button onClick={() => setPhoto(photo)}>choose</button>
      </li>
    );
  });
};

const getPhotos = (setPhotos, setStatus) => {
  axios
    .get(url2)
    .then((response) => {
      let list = response.data.images.map((path) => {
        return path.Key.replace("public/", "");
      });
      list = list.filter((listName) => listName.includes("compare/"));
      setPhotos(list);
    })
    .catch((error) => {
      setStatus("Error, please reload page!");
    });
};

const updateCollectionsState = (setCollections) => {
  axios
    .get(url)
    .then((response) => {
      setCollections(response.data.collections);
    })
    .catch((error) => {
      console.log(error);
    });
};

const constructList = (collections, setCollection) => {
  let list = collections.map((item) => {
    return (
      <li className="collectionlistitem" key={Math.floor(Math.random() * 1000000000000)}>
        <button onClick={() => setCollection(item)}>{item}</button>
      </li>
    );
  });
  return (
    <div>
      <ul className="collectionlist">{list}</ul>
    </div>
  );
};

const comparePhoto = (photo, collection, setResult, setProgress) => {
  let request = {
    photo: photo,
    collection: collection,
  };
  axios.post(url3, request).then(
    (response) => {
      if (response.data.status === "success") {
        // setStatus("Created new collection named " + collection);
        let similarity = response.data.result.FaceMatches[0].Similarity;
        let faceId = response.data.result.FaceMatches[0].Face.FaceId;
        console.log(similarity);
        console.log(faceId);
        let res = {
          similarity: similarity,
          faceId: faceId,
        };
        setResult(res);
        setProgress(undefined);
      }
    },
    (error) => {
      console.log(error);
      setResult("Error");
      setProgress(undefined);
    }
  );
};

const getUsers = (setUsers) => {
  axios
    .get(url4)
    .then((response) => {
      setUsers(response.data.data.Items);
      console.log(response.data.data.Items);
    })
    .catch((error) => {
      console.log(error);
    });
};
