import React from 'react';

export default function Review() {
  function addReview(event) {
    event.preventDefault();
    console.log('redirecting to reviews')
  }
  
  return (
    <button onClick={addReview}>
      Review
    </button>
  
  )
}