// Tools
import React from "react";
import Jobs from "./components/Jobs/Jobs";
import Navbar from "./components/Navbar/Navbar";

// https://www.youtube.com/watch?v=ZlDASfsL7FI
// https://www.youtube.com/watch?v=ALqckoyivq4
// https://www.youtube.com/watch?v=HANSMtDy508
// https://www.npmjs.com/package/react-paginate

function App() {
  return (
    <div className="app">
      <Navbar />
      <Jobs />
    </div>
  );
}

export default App;
