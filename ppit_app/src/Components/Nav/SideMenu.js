import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Drawer, Grow } from "@material-ui/core";
import colours from "../../utils/color";
import { getImages } from "../../utils/ImageApi";

const useStyles = makeStyles(() =>({
    drawer: {
        width: '400px',
    },
    menu: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    optionContainer: {
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    box: {
        width: '45%',
        height: '90px',
        backgroundColor: '',
        borderRadius: '9px',
        marginBottom: '15px'
    },
}));

// state being passed into below function from Navigation.js
export default function SideMenu({openSideMenu, setOpenSideMenu, setNewBgImage,}) {
    const classes = useStyles();
    // State for colours.
    const[openOptionColour, setOpenOptionColour] = useState(false);
    // State for iMAGE.
    const[openOptionImage, setOpenOptionImage] = useState(false);
    // Setting state for images. Empty initially.
    const[images, setImage] = useState([])

    // Function to get images
    const getListOfImage =async () => {
        // Calling the function in ImageAPI. Returns photos
        const listOfImages = await getImages();
        console.log(listOfImages);
        setImage(listOfImages);
    }

    useEffect(()=>{
        getListOfImage();
    },[])

    return (
        <div>
            <Drawer open={openSideMenu} anchor="right" onClose={()=> setOpenSideMenu(false)}>
                <div className={classes.drawer}>
                    <div className={classes.menu}>
                        <div className={classes.box}
                        style={{
                            backgroundImage: 'url(https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                        // On click event for Image.
                        onClick={()=> setOpenOptionImage(true)}
                        ></div>

                        <div className={classes.box}
                        style={{
                            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Weekday_Color.svg/1200px-Weekday_Color.svg.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                        // On click event for colours.
                        onClick={()=> {
                            setOpenOptionColour(true);
                            setOpenOptionImage(false);
                        }}
                        ></div>
                    </div>
                    {/* When user clicks, grow and show colours. If else depending on what is clicked*/}
                    {/* IF */}
                    {openOptionImage ? (
                    <Grow in={openOptionImage}>
                        <div className={classes.optionContainer}>
                            {/* Loop through colours */}
                            {images.map((image, index)=>{
                                return (
                                    <div 
                                    key={index}
                                    className={classes.box}
                                    style={{
                                        backgroundImage: `url(${image.thumb})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                    onClick={() => setNewBgImage(image.full)}
                                    ></div>
                                );
                            })}
                        </div>
                        {/* ELSE */}
                    </Grow>
                    ) : ( 
                    <Grow in={openOptionColour}>
                        <div className={classes.optionContainer}>
                            {/* Loop through colours */}
                            {colours.map((colour, index)=>{
                                return (
                                    <div 
                                    key={index}
                                    className={classes.box}
                                    style={{
                                        background: colour,
                                    }}
                                    // on click, set background
                                    onClick={() => setNewBgImage(colour)}
                                    ></div>
                                );
                            })}
                        </div>
                    </Grow>)} 
                    
                </div>
            </Drawer>
        </div>
    );
}