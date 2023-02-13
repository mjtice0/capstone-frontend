import initialData from "./initialdata";
import axios from "axios";

const tempStorage = window.localStorage;
const tempStorageKey = "temp-data";

function tempReadData() {
  // read data or use initial defaults if not yet saved
  const data = JSON.parse(tempStorage.getItem(tempStorageKey));
  return data ?? initialData;
}

function tempSaveData(data) {
  tempStorage.setItem(tempStorageKey, JSON.stringify(data));
}

function getPlace(placeId) {
  const data = tempReadData();
  return Promise.resolve(data.places[placeId].info);
}

function getReviews(placeId) {
  return axios
    .get(`http://localhost:8800/api/reviews/${placeId}`)
    .then((response) => {
      const reviews = response.data;
      console.log("getReviews()", { reviews });
      return reviews;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  // const data = tempReadData()
  // return Promise.resolve(data.places[placeId].reviews)
}

function addReview(placeId, reviewData) {
  return axios
    .post(`http://localhost:8800/api/reviews/${placeId}`, {
      id: placeId,
      name: reviewData.name,
      title: reviewData.title,
      description: reviewData.description,
      rating: reviewData.rating,
    })
    .then((response) => {
      // setReviews([...reviewData, response.data]);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// TODO
//   return Promise.resolve();
// }

export default {
  getPlace,
  getReviews,
  addReview,
};
