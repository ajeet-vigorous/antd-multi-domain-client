import { useRef, useEffect, useState, memo } from "react";
import $ from "jquery";

const BirdCanvas = memo(({ stateRef, games, initialGameStatus, livemultiplier }) => {
    const [gameStatus, setGameStatus] = useState(initialGameStatus);
    const [showCanvas, setShowCanvas] = useState(false);
    const currentMultiplierRef = useRef(Number(livemultiplier) || 0);

    useEffect(() => {
        if (games != null) {
            setGameStatus(games?.gameStatus);
            currentMultiplierRef.current = Number(games?.curentMultiplier) || 0;
        }
    }, [games]);


    useEffect(() => {
        if (!multiplierRef.current) return;
        const multiplier = Number(currentMultiplierRef.current) || 0;
        multiplierRef.current.textContent = `${multiplier.toFixed(2)}`;
    }, [games]);

    useEffect(() => {
        setShowCanvas(gameStatus === "running" || gameStatus === "close");
    }, [gameStatus]);
    const canvasRef = useRef(null);
    const birdContainerRef = useRef(null);
    const multiplierRef = useRef(null);



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

        // Background image variables
        let bgImage = new Image();
        let bgPosition = 0;
        let bgSpeed = 1;
        let bgAnimationId;

        // Load background image
        bgImage.src = "/assets/images/birdBackground.webp"; // Replace with your image URL

        const birdContainer = document.createElement('div');
        birdContainer.className = 'aWtEk';
        birdContainer.innerHTML = `
    <div class="mpA03"></div>
    
`;
// <div id="multiplier-display" style="
        
    // ">${(currentMultiplierRef.current || 0).toFixed(2)}</div>
    
        multiplierRef.current = birdContainer.querySelector("#multiplier-display");

        birdContainer.style.position = 'absolute';
        // birdContainer.style.display = 'none';
        if (canvas.parentNode) {
            canvas.parentNode.appendChild(birdContainer);
        } else {
            document.body.appendChild(birdContainer);
        }

        birdContainerRef.current = birdContainer;
        bgImage.onload = () => {
            // Start background animation as soon as image is ready
            animateBackground();
        };

        function animateBackground() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw background image (tiled horizontally)
            // ctx.drawImage(bgImage, bgPosition, 0, canvas.width, canvas.height);
            // ctx.drawImage(bgImage, bgPosition + canvas.width, 0, canvas.width, canvas.height);
            const isMobile = window.innerWidth < 768;
            const bgDrawWidth = isMobile ? canvas.width * 6 : canvas.width * 4;
            ctx.drawImage(bgImage, bgPosition, 0, bgDrawWidth, canvas.height);
            ctx.drawImage(bgImage, bgPosition + bgDrawWidth, 0, bgDrawWidth, canvas.height);


            bgPosition -= bgSpeed;

            if (bgPosition <= -bgDrawWidth) {
                bgPosition = 0;
            }


            bgAnimationId = requestAnimationFrame(animateBackground);
        }


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
                if (canvasWidth < 768) {
                    imgheight = 36;
                    imgwidth = 150;
                }
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
            // Start background animation
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
                        const isMobile = window.innerWidth < 768;
                        const birdOffsetX = isMobile ? -120 : -170;
                        const birdOffsetY = isMobile ? -110 : -160;
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
                    StopPlaneIntervalID1++;
                    intervalTimex = intervalTimex + 4;
                    intervalTimey = intervalTimey + 1;

                    if (StopPlaneIntervalID1 >= stopPlaneCount) {
                        window.clearInterval(StopPlaneIntervalID);
                        StopPlaneIntervalID1 = 0;
                        if (birdContainerRef.current) {
                            birdContainerRef.current.style.display = 'none';
                        }
                        // Stop background animation when plane stops
                        cancelAnimationFrame(bgAnimationId);
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
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#00B33E";
                    ctx.stroke();
                    ctx.closePath();
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
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#00B33E";
                    ctx.stroke();
                    ctx.closePath();
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
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#00B33E";
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(DecreaseX + 3, IncreaseY);
            ctx.lineTo(DecreaseX, y0);
            ctx.fillStyle = "rgba(1,104,14,0.8)";
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
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#00B33E";
            ctx.stroke();
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(IncreaseX + 3, DecreaseY);
            ctx.lineTo(IncreaseX, y0);
            ctx.fillStyle = "rgba(1,104,14,0.8)";
            ctx.closePath();
        }

        function lerp(v0, v1, t) {
            return (1.0 - t) * v0 + t * v1;
        }



        function flyAwayAnimation() {
            const birdEl = birdContainerRef.current;
            if (!birdEl) return;

            const startX = parseFloat(birdEl.style.left) || 0;
            const startY = parseFloat(birdEl.style.top) || 0;
            const endX = canvas.clientWidth + 200;
            const endY = startY;
            const duration = 1000;
            const startTime = performance.now();
            const birdImg = birdEl.querySelector(".mpA03");
            if (birdImg) birdImg.style.animationDuration = "2s";

            function animate() {
                const now = performance.now();
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1);
                const currentX = startX + (endX - startX) * t;
                const currentY = startY;

                birdEl.style.left = `${currentX}px`;
                birdEl.style.top = `${currentY}px`;
                const scaleAmt = 1 - t * 0.7;
                birdEl.style.transform = `scale(${scaleAmt})`;

                if (t < 1) {
                    requestAnimationFrame(animate);
                } else {
                    birdEl.style.display = "none";
                    birdEl.style.transform = "scale(1)";
                    if (birdImg) birdImg.style.animationDuration = "0.675s";
                }
            }

            requestAnimationFrame(animate);
        }

        if (gameStatus === "close") {

            flyAwayAnimation();
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
            cancelAnimationFrame(bgAnimationId);
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
                    display: showCanvas ? 'block' : 'none',
                    position: 'relative',
                }}
            ></canvas>
            <style>
                {`
    .mpA03 {
        width: 205em;
        height: 16em;
        background: url("/assets/images/parrot1.webp") no-repeat 0 0/100% 100%;
        animation: EnkjM 0.675s steps(9) infinite;
    }
    .aWtEk {
        width: 22.78em;
        height: 20em;
        overflow: hidden;
    }

 @keyframes EnkjM {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-205em);
    }
}
    @media (max-width: 767px) {
        .mpA03 {
            width: 120em;
            height: 12em;
            animation: EnkjM 0.525s steps(9) infinite;
        }
        .aWtEk {
            width: 12.67em;
            height: 12em;
        }
             @keyframes EnkjM {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-120em);
    }
}
    }
    `}
            </style>
        </>
    );
});

export default BirdCanvas;