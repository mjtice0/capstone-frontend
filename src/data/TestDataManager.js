import { useState, useEffect } from "react";
import Data from "./DataManager";
import axios from "axios";

function Component(props) {
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    Data.getPlace("p101").then((data) =>
      setPlace(JSON.stringify(data, null, 2))
    );

    Data.getReviews("p101").then((data) =>
      setReviews(JSON.stringify(data, null, 2))
    );
  }, []);

  return (
    <>
      <div>
        <strong>Data</strong> <pre>{place}</pre>
      </div>
      <div>
        <strong>Reviews</strong> <pre>{reviews}</pre>
      </div>
    </>
  );
}

export default Component;
