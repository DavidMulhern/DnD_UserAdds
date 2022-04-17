import React, { useState } from "react";
import Navibar from "./Components/Nav/Navibar";
import AppX from "./Components/AppX";
import Navigations from "./Components/Nav/Navigations";
import Register from "./Components/Register";

export default function App() {
  // Image state.
  const [backgroundImage, setBackgroundImage] = useState(`url(${process.env.PUBLIC_URL + "/assets/office.jpg"})`);
  return (
  
    <div
      style={{
        background: backgroundImage,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

      <Navigations setBackgroundImage={setBackgroundImage}/>
      <Navibar />
      {/* <AppX /> */}
    </div>
  )
}
