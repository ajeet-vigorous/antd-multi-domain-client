import { useRef, useEffect, useState, memo } from "react";
import $ from "jquery";

const BirdCanvas = memo(({ stateRef, games, initialGameStatus }) => {
    const [gameStatus, setGameStatus] = useState(initialGameStatus);
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        if (games != null) {
            setGameStatus(games?.gameStatus);
        }
    }, [games]);

    useEffect(() => {
        setShowCanvas(gameStatus === "running");
    }, [gameStatus]);

    const canvasRef = useRef(null);
    const birdContainerRef = useRef(null);

    useEffect(() => {
        if (!showCanvas) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const cW = stateRef.current.offsetWidth;
        const cH = stateRef.current.offsetHeight;
        canvas.width = cW;
        canvas.height = cH;

        let screenHeight;
        let screenWidth;
        let x;
        let canvasHeight = 0;
        let canvasWidth = 0;
        let calcwidth = 0;
        let calcheight = 0;
        let horizontalLine = 0;
        let verticalLine = 0;
        let verticaldots = 0;
        let verticalDotSize = 0;
        let boardWidth = 0;
        let boardheight = 0;
        let widthDouble = 0;
        let xPoint = 0;
        let yPoint = 0;
        let diffx = 0;
        let imgheight = 0;
        let imgwidth = 0;
        let imgyposition = 0;
        let imgxposition = 0;
        let settimeinterval = 0;
        let checkuplinedownlinecount = 0;
        let diffy = 0;
        let diffx1 = 0;
        let yend = 0;
        let xend = 0;
        let backgroundImage = "";
        let start = null;
        let progress = 0;
        let frameIndex = 0;
        let countInterval = 0;
        let estimateHeight = 0;
        let estimateWidth = 0;
        let HorizontalDotsCountRun = 0;
        let VerticalDotsCountRun = 0;
        let lastUpdate = Date.now();
        let y0 = 0;
        let x0 = 0;
        let y1 = 0;
        let x1 = 0;
        let y2 = 0;
        let x2 = 0;
        let intervalID;
        let intervalID1;
        let stopPlaneEvent = 0;
        let nx0 = 0;
        let ny0 = 0;
        let nx1 = 0;
        let ny1 = 0;
        let nx2 = 0;
        let ny2 = 0;
        let StopPlaneIntervalID;
        let StopPlaneIntervalID1 = 0;
        let startupdown = 0;
        let brazilPath = [];
        let currentBrazilPosition = { x: 0, y: 0 };

        // Create bird animation container
        const birdContainer = document.createElement('div');
        birdContainer.className = 'aWtEk';
        birdContainer.innerHTML = '<div class="mpA03"></div>';
        birdContainer.style.position = 'absolute';
        birdContainer.style.display = 'none';
        // birdContainer.style.zIndex = '10';

        // Append to canvas parent instead of document.body
        if (canvas.parentNode) {
            canvas.parentNode.appendChild(birdContainer);
        } else {
            document.body.appendChild(birdContainer);
        }

        birdContainerRef.current = birdContainer;

        function setVariable(isPlane = "") {
            const updatedCw = canvas.width;
            const updatedCh = canvas.height;
            screenHeight = window.innerHeight - 4;
            screenWidth = window.innerWidth;
            x = 0;
            canvasHeight = updatedCh;
            canvasWidth = updatedCw;
            calcwidth = canvasWidth / 100;
            calcheight = canvasHeight / 100;

            if (canvasWidth < 992) {
                diffx = calcwidth * 45;
                horizontalLine = calcwidth * 10;
                verticalLine = calcheight * 10;
                imgheight = 48;
                imgwidth = 200;
                imgyposition = 45;
                imgxposition = 10;
                settimeinterval = 40;
                checkuplinedownlinecount = 50;
            } else {
                diffx = calcwidth * 30;
                horizontalLine = calcwidth * 5;
                verticalLine = calcheight * 5;
                imgheight = 71;
                imgwidth = 300;
                imgyposition = 66;
                imgxposition = 15;
                settimeinterval = 20;
                checkuplinedownlinecount = 150;
            }

            verticaldots = verticalLine / 100;
            verticalDotSize = verticaldots * 50;
            boardWidth = canvasWidth;
            boardheight = canvasHeight;
            widthDouble = boardWidth * 2.5;
            xPoint = 0 - boardWidth * 1.25;
            yPoint = boardheight - boardWidth * 1.25;

            $(".rotateimage").css({
                width: widthDouble,
                height: widthDouble,
                top: yPoint,
                left: xPoint,
            });

            diffy = calcheight * 70;
            diffx1 = canvasWidth - calcwidth * 60;
            yend = canvasHeight - diffy;
            xend = canvasWidth - diffx;
            y0 = ctx.canvas.height - verticalLine;
            x0 = verticalLine;
            y1 = ctx.canvas.height - verticalLine;
            x1 = diffx1;
            y2 = yend;
            x2 = xend;
            startupdown = 0;
            stopPlaneEvent = 0;
            brazilPath = [
                { x: x0, y: y0 },
                { x: x1, y: y1 },
                { x: x2, y: y2 }
            ];

            currentBrazilPosition = { x: x0, y: y0 };

            animatePathDrawing(
                ctx,
                x0, y0,
                x1, y1,
                x2, y2,
                5000,
                true
            );
        }

        function animatePathDrawing(ctx, x0, y0, x1, y1, x2, y2, duration, showBird) {
            var step = function animatePathDrawingStep(timestamp) {
                if (start === null) start = timestamp;

                var delta = timestamp - start,
                    progress = Math.min(delta / duration, 1);

                if (showBird) {
                    drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress);
                    const t = progress;
                    const t2 = t * t;
                    const t1 = 1 - t;
                    const t12 = t1 * t1;
                    const t1t2 = 2 * t * t1;

                    currentBrazilPosition.x = t12 * x0 + t1t2 * x1 + t2 * x2;
                    currentBrazilPosition.y = t12 * y0 + t1t2 * y1 + t2 * y2;

                    if (birdContainerRef.current) {
                        const birdOffsetX = -170;
                        const birdOffsetY = -160;

                        birdContainerRef.current.style.left = `${currentBrazilPosition.x + birdOffsetX}px`;
                        birdContainerRef.current.style.top = `${currentBrazilPosition.y + birdOffsetY}px`;
                        birdContainerRef.current.style.display = 'block';
                    }
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);

        }

        function stopPlane() {

            if (StopPlaneIntervalID1 === 0) {
                ctx.beginPath();
                clearInterval(intervalID);
                clearInterval(intervalID1);
                stopPlaneEvent = 1;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var intervalTimex = 100;
                var intervalTimey = 50;
                var stopPlaneCount = Math.round((ctx.canvas.width - nx2) / 4);

                StopPlaneIntervalID = setInterval(() => {
                    ctx.beginPath();
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    ctx.moveTo(nx0, ny0);
                    ctx.quadraticCurveTo(
                        nx1,
                        ny1,
                        nx2 + intervalTimex,
                        ny2 - intervalTimey
                    );

                    // Update bird position with boundary checks
                    if (birdContainerRef.current) {
                        const newLeft = Math.min(nx2 + intervalTimex - imgxposition, canvas.width - imgwidth);
                        const newTop = Math.min(Math.max(ny2 - intervalTimey - imgyposition, 0), canvas.height - imgheight);

                        birdContainerRef.current.style.left = `${newLeft}px`;
                        birdContainerRef.current.style.top = `${newTop}px`;
                        birdContainerRef.current.style.display = 'block';
                    }

                    ctx.closePath();
                    StopPlaneIntervalID1++;
                    intervalTimex = intervalTimex + 4;
                    intervalTimey = intervalTimey + 1;

                    if (StopPlaneIntervalID1 >= stopPlaneCount) {
                        window.clearInterval(StopPlaneIntervalID);
                        StopPlaneIntervalID1 = 0;
                        if (birdContainerRef.current) {
                            birdContainerRef.current.style.display = 'none';
                        }
                    }
                }, 1);
                ctx.closePath();
            }
        }

        function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1) {
            if (0.0 == t0 && t1 == 1.0) {
                if (stopPlaneEvent == 0) {
                    startupdown = 1;
                    ctx.beginPath();
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    ctx.moveTo(x0, y0);
                    ctx.quadraticCurveTo(x1, y1, x2, y2);


                    // Update bird position
                    if (birdContainerRef.current) {
                        birdContainerRef.current.style.left = `${x2 - imgxposition}px`;
                        birdContainerRef.current.style.top = `${y2 - imgyposition}px`;
                        birdContainerRef.current.style.display = 'block';
                    }

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#00B33E";
                    ctx.stroke();
                    ctx.closePath();
                    fillShape(x2, y2, x0, y0, x1, y1, t1);
                    startfirstinterval();
                }
            } else if (t0 != t1) {
                if (stopPlaneEvent == 0) {
                    ctx.beginPath();
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    var t00 = t0 * t0,
                        t01 = 1.0 - t0,
                        t02 = t01 * t01,
                        t03 = 2.0 * t0 * t01;

                    nx0 = t02 * x0 + t03 * x1 + t00 * x2;
                    ny0 = t02 * y0 + t03 * y1 + t00 * y2;

                    t00 = t1 * t1;
                    t01 = 1.0 - t1;
                    t02 = t01 * t01;
                    t03 = 2.0 * t1 * t01;

                    nx2 = t02 * x0 + t03 * x1 + t00 * x2;
                    ny2 = t02 * y0 + t03 * y1 + t00 * y2;

                    nx1 = lerp(lerp(x0, x1, t0), lerp(x1, x2, t0), t1);
                    ny1 = lerp(lerp(y0, y1, t0), lerp(y1, y2, t0), t1);
                    ctx.moveTo(nx0, ny0);
                    ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
                    // 
                    // Update bird position
                    if (birdContainerRef.current) {
                        birdContainerRef.current.style.left = `${nx2 - imgxposition}px`;
                        birdContainerRef.current.style.top = `${ny2 - imgyposition}px`;
                        birdContainerRef.current.style.display = 'block';
                    }

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#00B33E";
                    ctx.stroke();
                    ctx.closePath();
                    fillShape(nx2, ny2, nx0, ny0, nx1, ny1, 0);
                }
            }
        }

        function startfirstinterval() {
            intervalID = setInterval(() => {
                downplane(x0, y0, x1, y1, x2, y2);
                if (++countInterval >= checkuplinedownlinecount) {
                    window.clearInterval(intervalID);
                    countInterval = 0;
                    startsecondinterval();
                }
            }, settimeinterval);
        }

        function startsecondinterval() {
            intervalID1 = setInterval(() => {
                upplane(x0, y0, x1, y1, x2, y2);
                if (++countInterval >= checkuplinedownlinecount) {
                    window.clearInterval(intervalID1);
                    countInterval = 0;
                    startfirstinterval();
                }
            }, settimeinterval);
        }

        function upplane(x0, y0, x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            var IncreaseY = estimateHeight - countInterval;
            var DecreaseX = estimateWidth - countInterval;
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, DecreaseX, IncreaseY);

            // Update bird position
            if (birdContainerRef.current) {
                const birdOffsetX = -160;
                const birdOffsetY = -90;

                birdContainerRef.current.style.left = `${DecreaseX - imgxposition + birdOffsetX}px`;
                birdContainerRef.current.style.top = `${IncreaseY - imgyposition + birdOffsetY}px`;
                birdContainerRef.current.style.display = 'block';
            }

            ctx.lineWidth = 3;
            ctx.strokeStyle = "#00B33E";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, DecreaseX, IncreaseY);
            ctx.lineTo(DecreaseX + 3, IncreaseY);
            ctx.lineTo(DecreaseX, y0);
            ctx.fillStyle = "rgba(1,104,14,0.8)";
            ctx.fill();
            ctx.closePath();
        }

        function downplane(x0, y0, x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            var DecreaseY = y2 + countInterval;
            var IncreaseX = x2 + countInterval;
            estimateHeight = DecreaseY;
            estimateWidth = IncreaseX;
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, IncreaseX, DecreaseY);

            // Update bird position

            if (birdContainerRef.current) {
                const birdOffsetX = -160;
                const birdOffsetY = -90;

                birdContainerRef.current.style.left = `${IncreaseX - imgxposition + birdOffsetX}px`;
                birdContainerRef.current.style.top = `${DecreaseY - imgyposition + birdOffsetY}px`;
                birdContainerRef.current.style.display = 'block';
            }


            ctx.lineWidth = 3;
            ctx.strokeStyle = "#00B33E";
            ctx.stroke();
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, IncreaseX, DecreaseY);
            ctx.lineTo(IncreaseX + 3, DecreaseY);
            ctx.lineTo(IncreaseX, y0);
            ctx.fillStyle = "rgba(1,104,14,0.8)";
            ctx.fill();
            ctx.closePath();
        }

        function lerp(v0, v1, t) {
            return (1.0 - t) * v0 + t * v1;
        }

        function fillShape(nx2, ny2, nx0, ny0, nx1, ny1, t1) {
            if (t1 == 1.0) {
                ctx.beginPath();
                ctx.moveTo(nx0, ny0);
                ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
                ctx.lineTo(nx2 + 3, ny2);
                ctx.lineTo(nx2 + 3, y0);
                ctx.fillStyle = "rgba(1,104,14,0.8)";
                ctx.fill();
                ctx.closePath();
            } else {
                ctx.beginPath();
                ctx.moveTo(nx0, ny0);
                ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
                ctx.lineTo(nx2, ny2);
                ctx.lineTo(nx2, y0);
                ctx.fillStyle = "rgba(1,104,14,0.8)";
                ctx.fill();
                ctx.closePath();
            }
        }
        if (gameStatus === "waiting") {
            stopPlane();
        }

        if (gameStatus === "running") {
            setVariable();
        }

        return () => {
            clearInterval(intervalID);
            clearInterval(intervalID1);
            clearInterval(StopPlaneIntervalID);
            if (birdContainerRef.current && birdContainerRef.current.parentNode) {
                birdContainerRef.current.parentNode.removeChild(birdContainerRef.current);
            }
        }
    }, [gameStatus, showCanvas, stateRef]);

    return (
        <>
            <canvas
                ref={canvasRef}
                id="myCanvas"
                height={400}
                width={1900}
                style={{
                    cursor: 'pointer',
                    display: gameStatus == "running" ? 'block' : 'none',
                    position: 'relative',

                }}
            ></canvas>
            <style>
                {`
                   .mpA03 {
    width: 205em;
    height: 16em; 
    background: url("/assets/images/parrot.webp") no-repeat 0 0/100% 100%;
    animation: EnkjM 0.675s steps(9) infinite;
}
@keyframes EnkjM {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-205em);
    }
}
.aWtEk {
 width: 22.78em;
 height: 16em; 
    overflow: hidden;   
}
                `}
            </style>
        </>
    );
});

export default BirdCanvas;