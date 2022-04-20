import React, { useState } from "react";
import Navibar from "./Components/Navigation/Navibar";
import Navigations from "./Components/Navigation/Navigations";

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
      {/* First components to be called */}
      <Navigations setBackgroundImage={setBackgroundImage}/>
      <Navibar />
    </div>
  )
}
