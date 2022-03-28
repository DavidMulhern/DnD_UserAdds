import React, { useState } from "react";
// import { makeStyles } from "@material-ui/styles";
import Navibar from "./Components/Nav/Navibar";
import AppX from "./Components/AppX";
import Navigations from "./Components/Nav/Navigations";

//const useStyles = makeStyles(()=> ({}));


export default function App() {
  //const classes = useStyles();
  // Image state.
  const [backgroundImage, setBackgroundImage] = useState('pink');
  return (
    <div
      style={{
        background: backgroundImage,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Navibar />
      <Navigations setBackgroundImage={setBackgroundImage}/> 
      <AppX />
    </div>
  )
}