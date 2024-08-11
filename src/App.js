import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
//import RecipeDetails from "./components/RecipeDetails";
import RecipeManager from "./components/RecipeManager";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/manage" element={<RecipeManager />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
