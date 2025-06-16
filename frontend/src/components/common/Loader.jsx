//src/components/common/Loader.jsx

import React from "react";
import "../../styles/loader.css"; // Ensure this matches your loader CSS path

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
