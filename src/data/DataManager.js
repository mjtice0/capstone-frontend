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

// TEMP
// console.clear();
// addReview("ChIJCXdw0w9nbIcRbdG3kJPQD7w", {
//   name: "name",
//   title: "title",
//   description: "desc",
//   rating: 5,
//   features: "noise",
  
// });

function addReview(placeId, reviewData) {
  console.log("DataManager.addReview()", { placeId, reviewData });
  return axios
    .post(`http://localhost:8800/api/reviews/${placeId}`, {
      name: reviewData.name,
      title: reviewData.title,
      description: reviewData.description,
      rating: reviewData.rating,

    })
    .then((response) => {
      console.log(response.data)
      const reviews = response.data;
      console.log("postReviews()", { reviews });
      return reviews;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function deleteReview(placeId) {
  return axios
  .delete(`http://localhost:8800/api/reviews/${placeId}`)
  .then((response) => {
    const reviews = response.data;
    console.log("getReviews()", { reviews });
    return reviews;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
}
export default {
  deleteReview,
  getReviews,
  addReview,
};


//get all reviews
// useEffect(() => {
//   const getReviews = async () => {
//     try {
//       const review = await axios.get("http://localhost:8800/api/reviews");
//       // setReview(response.data)
//       console.log(review.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getReviews();
// }, []);
