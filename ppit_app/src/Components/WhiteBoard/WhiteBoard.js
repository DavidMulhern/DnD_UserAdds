import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Color options for drawing line
const colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue"
]

// Logic for whiteboard drawing functionality
export default function WhiteBoard({ modal, toggle }) {
    //Hooks used for persisting data between renders
    const canvasRef = useRef(null);
    const ctx = useRef(null);
    //State for selected drawing color 
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    //State for mouse position
    const [mouseDown, setMouseDown] = useState(false);
    const [lastPosition, setPosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        //Gets the canvas tags for 2d drawing functionality
        if (canvasRef.current) {
            ctx.current = canvasRef.current.getContext('2d');
            
        }
    }, );

    //Handles drawing a line on the whiteboard
    const draw = useCallback((x, y) => {
        if (mouseDown) {
            //Begin drawing
            ctx.current.beginPath();
            //Select drawing color
            ctx.current.strokeStyle = selectedColor;
            //Line styling
            ctx.current.lineWidth = 4;
            ctx.current.lineJoin = 'round';
            //Line drawing
            ctx.current.moveTo(lastPosition.x, lastPosition.y);
            ctx.current.lineTo(x, y);
            //End drawing
            ctx.current.closePath();
            //Must stroke to have the drawn image appear
            ctx.current.stroke();
            setPosition({
                x,
                y
            })
        }
    }, [lastPosition, mouseDown, selectedColor, setPosition])

    //Clears the whiteboard
    const clear = () => {
        ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
    }
    //Mouse down is when the mouse is clicked and held
    const onMouseDown = (e) => {
        //Get the object of the popup, to reference its dimensions later
        let rect = e.target.getBoundingClientRect();

        setPosition({
            //Compensating for the size of the popup to position the mouse accurately
            //And setting the current X and Y position of the mouse
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
        setMouseDown(true)
    }
    //Mouse Up represents when the mouse is on the whiteboard but not clicked to draw
    const onMouseUp = (e) => {
        setMouseDown(false)
    }
    //When the mouse moves while over the whiteboard
    const onMouseMove = (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.

        draw(x, y)
    }
    //Handles downloading the drawn image
    const download = async () => {
        const image = canvasRef.current.toDataURL('image/png');
        const blob = await (await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = "image.png";
        link.click();
    }

    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>WhiteBoard</ModalHeader>
            <ModalBody>
                <div className="App" >
                    {/* Rendering the canvas element and styling it */}
                    <canvas
                        style={{
                            border: "1px solid #000"
                        }}
                        width={window.innerWidth/2}
                        height={window.innerHeight/2}
                        ref={canvasRef}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onMouseMove={onMouseMove}
                    />
                    <br />
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        {
                            colors.map(
                                color => <option key={color} value={color}>{color}</option>
                            )
                        }
                    </select>
                    <Button onClick={clear} style={{ marginLeft: "10px"}}>Clear</Button>
                    <Button onClick={download} style={{ marginLeft: "10px"}}>Download</Button>
                    <Button color="secondary" onClick={toggle} style={{ float: "right"}}>Cancel</Button>

                </div>
               
            </ModalBody>

            {/* Functionality buttons used to finalise creating a card, or else cancel */}

        </Modal>
    );
}