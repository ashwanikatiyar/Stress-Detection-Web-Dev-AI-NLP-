// src/components/common/SuspenseLoader.jsx
import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const SuspenseLoader = ({ component: Component }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer); 
  }, []);

  return loading ? <Loader /> : <Component />;
};

export default SuspenseLoader;
