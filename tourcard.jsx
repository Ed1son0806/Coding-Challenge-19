import React, { useState } from "react";

// Tourcard displays individual tour info 
const TourCard = ({ id, name, price, info, image, onRemove }) => {
  // Local state to toggle "Read More" / "Show Less"
  const [readMore, setReadMore] = useState(false);

  // Fallback in case information is missing
  const safeSummary = info || "No information available.";

  return (
    <article className="tour-card">
      <img src={image} alt={name} />
      <div className="tour-header">
        <h3>{name}</h3>
        <h5>${price}</h5>
      </div>
      <p>
      {readMore ? safeSummary : `${safeSummary.substring(0, 100)}... `}
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? "Show Less" : "Read More"}
        </button>
      </p>
      {/* Button to remove the book */}
      <button className="btn-remove" onClick={() => onRemove(id)}>
        Not Interested
      </button>
    </article>
  );
};


export default TourCard;