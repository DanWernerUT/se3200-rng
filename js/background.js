let backgroundBuffer = null;

async function buildBackgroundTiles() {
    const dpr = window.devicePixelRatio || 1;
    const buffer = document.createElement("canvas");
    buffer.width = window.innerWidth * dpr;
    buffer.height = window.innerHeight * dpr;
    const bcontext = buffer.getContext("2d");
    bcontext.imageSmoothingEnabled = false;
    bcontext.setTransform(dpr, 0, 0, dpr, 0, 0);

    const tileSize = 100;
    const cols = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);

    const textures = [
        'res/cobblestone.png',
        'res/cobblestone.png',
        'res/cobblestone.png',
        'res/cobblestone2.png',
        // 'res/arcade.png'    
    ];

    const images = textures.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    return Promise.all(images.map(function (img) {
        return new Promise(function (resolve) {img.onload = resolve;});
    })).then(function () {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const texture = images[Math.floor(Math.random() * images.length)];
                const flipX = Math.random() < 0.5 ? -1 : 1;
                const flipY = Math.random() < 0.5 ? -1 : 1;
                const angle = 90 * Math.floor(Math.random() * 4);

                bcontext.save();
                bcontext.translate(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
                bcontext.scale(flipX, flipY);
                bcontext.rotate((angle * Math.PI) / 180);
                bcontext.drawImage(texture, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
                bcontext.restore();
            }
        }

        backgroundBuffer = buffer;
        fillCanvas();
    })
}

function fillCanvas() {
    const canvas = document.querySelector("#bgCanvas");
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    if (backgroundBuffer) {
        context.drawImage(backgroundBuffer, 0, 0);
    }
}

async function buildBrickTiles() {
    const dpr = window.devicePixelRatio || 1;
    const buffer = document.createElement("canvas");
    buffer.width = window.innerWidth * dpr;
    buffer.height = window.innerHeight * dpr;
    const bcontext = buffer.getContext("2d");
    bcontext.imageSmoothingEnabled = false;
    bcontext.setTransform(dpr, 0, 0, dpr, 0, 0);

    const tileSize = 48;
    const cols = Math.ceil(window.innerWidth / tileSize) + 1;
    const rows = Math.ceil(window.innerHeight / (tileSize / 2)) + 1;

    const textures = [
        '../res/brick1.png',
        '../res/brick2.png',
        '../res/brick3.png',
        '../res/brick4.png',
        '../res/brick5.png',
        '../res/brick1.png',
        '../res/brick2.png',
        '../res/brick3.png',
        '../res/brick4.png',
        '../res/brick5.png',
        '../res/brick1.png',
        '../res/brick2.png',
        '../res/brick3.png',
        '../res/brick4.png',
        '../res/brick5.png',
        '../res/brick1.png',
        '../res/brick2.png',
        '../res/brick3.png',
        '../res/brick4.png',
        '../res/brick5.png',
        '../res/brick6.png',
        '../res/brick6.png',
        '../res/brick7.png',
    ];

    const images = textures.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    return Promise.all(images.map(function (img) {
        return new Promise(function (resolve) {img.onload = resolve;});
    })).then(function () {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const texture = images[Math.floor(Math.random() * images.length)];
                bcontext.save();
                if(y % 2 === 0) {
                    bcontext.translate(x * tileSize + tileSize / 2, y * tileSize/2);
                } else {
                    bcontext.translate(x * tileSize - tileSize, y * tileSize/2);
                }
                bcontext.drawImage(texture, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
                bcontext.restore();
            }
        }

        backgroundBuffer = buffer;
        fillCanvas();
    })
}

function bricks() {
    window.addEventListener('DOMContentLoaded', buildBrickTiles);
    window.addEventListener('resize', buildBrickTiles);
    document.body.addEventListener('click', buildBrickTiles);
    buildBrickTiles();
}

function cobblestone() {
    window.addEventListener('DOMContentLoaded', buildBackgroundTiles);
    window.addEventListener('resize', buildBackgroundTiles);
    document.body.addEventListener('click', buildBackgroundTiles);
    buildBackgroundTiles();
}

bricks();

function drawBackground() {
    // buildBackgroundTiles();
    buildBrickTiles();
}
