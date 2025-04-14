import React, { useState } from "react";
import Gallery from "./components/gallery";
import "./styles/styles.css";


// Root component of the app
function App() {
  // Global state to hold the list of products
  const [tours, setTours] = useState([]);

  // Function to remove a book by its ID
  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  return (
    <main>
      <h1>Welcome to the Tour Comparison App </h1>
      {/* Pass state and handlers down to the tour component */}
      <Gallery tours={tours} setTours={setTours} onRemove={removeTour} />
    </main>
  );
}

export default App;