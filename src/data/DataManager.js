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

function addReview(placeId, reviewData, userId) {
  const authToken = localStorage.getItem("authToken");
  console.log("AuthToken:", authToken);
  const headers = {
    "auth-token": `Bearer ${authToken}`,
  };
  console.log("Request Headers:", headers);
  return axios
    .post(
      `http://localhost:8800/api/reviews/${placeId}`,
      {
        placeId: placeId,
        userId: userId,
        name: reviewData.name,
        title: reviewData.title,
        description: reviewData.description,
        rating: reviewData.rating,
        features: reviewData.features,
      },
      {
        headers: headers,
      }
    )
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

// function deleteReview(placeId) {
//   return axios
//     .delete(`http://localhost:8800/api/reviews/${placeId}`)
//     .then((response) => {
//       const reviews = response.data;
//       console.log("getReviews()", { reviews });
//       return reviews;
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// }
export default {
  getReviews,
  addReview,
};
