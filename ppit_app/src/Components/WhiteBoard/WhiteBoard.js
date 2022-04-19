import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue"
]

export default function WhiteBoard({ modal, toggle }) {


    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [lastPosition, setPosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        if (canvasRef.current) {
            ctx.current = canvasRef.current.getContext('2d');
            
        }
    }, );

    const draw = useCallback((x, y) => {
        if (mouseDown) {
            ctx.current.beginPath();
            ctx.current.strokeStyle = selectedColor;
            ctx.current.lineWidth = 4;
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(lastPosition.x, lastPosition.y);
            ctx.current.lineTo(x, y);
            ctx.current.closePath();
            ctx.current.stroke();

            
            setPosition({
                x,
                y
            })
        }
    }, [lastPosition, mouseDown, selectedColor, setPosition])

    const clear = () => {
        ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
    }
    const onMouseDown = (e) => {
        let rect = e.target.getBoundingClientRect();
        let xR = e.clientX - rect.left; //x position within the element.
        let yR = e.clientY - rect.top;  //y position within the element.

        setPosition({
            x: xR,
            y: yR
        })
        setMouseDown(true)
    }
    const onMouseUp = (e) => {
        setMouseDown(false)
    }
    const onMouseMove = (e) => {

        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.

        draw(x, y)
    }
    const download = async () => {
        const image = canvasRef.current.toDataURL('image/png');
        const blob = await (await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);

        const link = document.createElement('a');
        console.log("href: ",document.createElement('a').href)
        link.href = blobURL;
        console.log("BLOBURL: ",blobURL)

        link.download = "image.png";
        //console.log(localImg.toString())
        link.click();
    }

    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>WhiteBoard</ModalHeader>
            <ModalBody>
                <div className="App" >


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
                    <button onClick={clear} >Clear</button>
                    <button onClick={download}>Download</button>
                </div>

                
            </ModalBody>

            {/* Functionality buttons used to finalise creating a card, or else cancel */}
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}