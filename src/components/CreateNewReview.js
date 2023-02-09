import React, { useState } from "react";
import "./map.css";
const CreateNewReview = () => {
  const [review, setReview] = useState("");

  // const onChange = (event) => {
  //   setReview(event.target.value)
  // }
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const onSubmit = (event) => {
    console.log("form submitted!");
  };

  return (
    <div className="create-review-container">
      <h2 className="review-header">Reviews</h2>
      <form onSubmit={onSubmit}>
        <label>User:</label>
        <input type="text" placeholder="Enter Name" name="Username" />
        <label>Location:</label>
        <input type="text" placeholder="Enter Location" name="location" />
        <label>Description:</label>
        <input type="text" placeholder="Enter Review" name="description" />
        <label>Quiet Music:</label>
        <input
          type="checkbox"
          id="quiet"
          checked={isChecked}
          onChange={handleOnChange}
        />
        Quiet Music
        <button type="submit" style={{ background: "Green" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewReview;
