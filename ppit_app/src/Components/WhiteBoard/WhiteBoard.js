import React, { useCallback, useEffect, useRef, useState } from 'react';
const colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue"
]

export default function WhiteBoard() {



  
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
    }, []);

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
        setPosition({
            x: e.pageX,
            y: (e.pageY-160)
        })
        setMouseDown(true)
    }
    const onMouseUp = (e) => {
        setMouseDown(false)
    }
    const onMouseMove = (e) => {
        var yy=e.pageY-163
        draw(e.pageX, yy)
    }
    const download = async () => {
        const image = canvasRef.current.toDataURL('image/png');
        const blob = await (await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);
   
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = "image.png";
        console.log(blobURL)
        link.click();
    }

    return (
        <div className="App" >


            <canvas
            
                style={{
                    border: "1px solid #000"
                }}
                width={window.innerWidth}
                height={window.innerHeight}
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
            <button onClick={download}>Create Card</button>
        </div>
    );
}