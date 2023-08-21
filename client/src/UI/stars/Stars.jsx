import React, { useState } from "react";
import "./stars.scss";
import { Star } from "@mui/icons-material";

const Stars = ({rate, changeRate}) => {
  const [hover, setHover] = useState(0);
  const [mouseEntered, setMouseEntered] = useState(false);

  const handleMouseEnter = (starIndex) => {
    setMouseEntered(true);
    setHover(starIndex);
  };

  const handleMouseLeave = () => {
    setMouseEntered(false);
    setHover(0);
  };

  const hoverHandler = (starIndex) => {
    if (mouseEntered) {
      return starIndex <= hover ? "active" : "";
    } else {
      return starIndex <= rate ? "active" : "";
    }
  };
  return (
    <div className="stars" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <Star
          key={starIndex}
          className={`star ${hoverHandler(starIndex)}`}
          onClick={() => changeRate(starIndex)}
          onMouseEnter={() => handleMouseEnter(starIndex)}
        />
      ))}
    </div>
  );
};

export default Stars;
