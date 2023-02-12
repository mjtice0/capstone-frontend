import { useState, useEffect } from 'react'
import Data from './DataManager'
import axios from 'axios';

function Component(props) {
  const [place, setPlace] = useState(null)
  const [reviews, setReviews] = useState(null)

  // init
  useEffect(() => {
    Data.getPlace('p101')
      .then(data => setPlace(JSON.stringify(data, null, 2)))

    Data.getReviews('p101')
      .then(data => setReviews(JSON.stringify(data, null, 2)))

  }, [])

  return (
    <>
      <div><strong>Data</strong> <pre>{place}</pre></div>
      <div><strong>Reviews</strong> <pre>{reviews}</pre></div>
    </>
  )
}

// const addNewReview = (reviewData) => {
  // if (
  //   reviewData.name.replaceAll(" ", "").length < 1 ||
  //   reviewData.titile.replaceAll(" ", "").length < 1 ||
  //   reviewData.description.replaceAll(" ", "").length < 1
  // ) {
  //   alert(
  //     "You must enter a valid review. A valid review must have a title, name, and description that are greater than one character (and not only whitespaces)."
  //   );
  // } else {
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
  //       name: reviewData.name,
  //       title: reviewData.title,
  //       description: reviewData.description,
  //       rating: reviewData.rating,
  //     })
  //     .then((response) => {
  //       setReviews([...reviewData, response.data]);

  //       console.log(response.data);
  //     })
  //     .catch((error) => {});
  // }

export default Component