import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";

const Ratings =lazy(()=>import ("./Components/Ratings"));


function App() {
  return (
    <div className="app">
    <Suspense fallback={<h1>LOADING.....</h1>}>
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/ratings" element={<Ratings />} />
    </Routes>\
    </Suspense>
    </div>
  );
}

export default App;
