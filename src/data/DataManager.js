import axios from "axios";

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
}

function addReview(placeId, reviewData) {
  console.log("DataManager.addReview()", { placeId, reviewData });
  return axios
    .post(`http://localhost:8800/api/reviews/${placeId}`, {
      name: reviewData.name,
      title: reviewData.title,
      description: reviewData.description,
      rating: reviewData.rating,
      features: reviewData.features,
    })
    .then((response) => {
      console.log(response.data);
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
    });
}
export default {
  deleteReview,
  getReviews,
  addReview,
};
