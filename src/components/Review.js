

const Review = (props) => {


  <div className="review">
    <p className="text">Title: {props.title}</p>
    <p>Review: {props.description}</p>
    <p>Rating: {props.rating}</p>
  </div>
}

export default Review;