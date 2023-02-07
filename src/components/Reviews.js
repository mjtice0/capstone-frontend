import React, { useState } from "react";

const CreateNewReview = () => {
  const [review, setReview] = useState("");
  
  // const onChange = (event) => {
  //   setReview(event.target.value)
  // }
  const onSubmit = (event) => {
    console.log("form submitted!");

  };

  return (
    <div className="create-review-container">
      <h2 className="review-hearder">Add Review</h2>
      <form onSubmit={onSubmit}>
        <label>User:</label>
        <input type="text" placeholder="Enter Name" name="Username" />
        <label>Location:</label>
        <input type="text" placeholder="Enter Location" name="location" />
        <label>Description:</label>
        <input type="text" placeholder="Enter Review" name="description" />
        <label>Stars***</label>
        <input type="checkbox" />
        <button type="submit" style={{ background: "Green" }}>
          Submit
        </button>
      </form>
    </div>
  );
};


export default CreateNewReview;