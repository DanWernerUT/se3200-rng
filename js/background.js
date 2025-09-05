function drawBackgroundTiles() {
    document.querySelectorAll('.bg-tile').forEach(tile => tile.remove());

    const tileSize = 100;
    const cols = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = document.createElement('div');
            tile.className = 'bg-tile';
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            tile.style.left = `${x * tileSize}px`;
            tile.style.top = `${y * tileSize}px`;
            const textures = [
                // 'cobblestone.png',
                // 'cobblestone.png',
                // 'cobblestone2.png'
                'arcade.svg'
            ];
            const randomTexture = textures[Math.floor(Math.random() * textures.length)];
            tile.style.backgroundImage = `url('../res/${randomTexture}')`;
            tile.style.backgroundSize = 'cover';
            tile.style.imageRendering = 'pixelated';
            tile.style.zIndex = '-1';
            const flipX = Math.random() < 0.5 ? -1 : 1;
            const flipY = Math.random() < 0.5 ? -1 : 1;
            const angle = 90 * Math.floor(Math.random() * 4);
            tile.style.transform = `scaleX(${flipX}) scaleY(${flipY}) rotate(${angle}deg)`;
            document.body.appendChild(tile);
        }
    }
}

function drawBrickTiles() {
    document.querySelectorAll('.brick-tile').forEach(tile => tile.remove());

    const tileSize = 48;
    const cols = Math.ceil(window.innerWidth / tileSize) + 1;
    const rows = Math.ceil(window.innerHeight / (tileSize / 2)) + 1; // FIXED

    const textures = [
        '../res/brick1.svg',
        '../res/brick2.svg',
        '../res/brick3.svg',
        '../res/brick4.svg',
        '../res/brick5.svg',
        '../res/brick1.svg',
        '../res/brick2.svg',
        '../res/brick3.svg',
        '../res/brick4.svg',
        '../res/brick5.svg',
        '../res/brick1.svg',
        '../res/brick2.svg',
        '../res/brick3.svg',
        '../res/brick4.svg',
        '../res/brick5.svg',
        '../res/brick1.svg',
        '../res/brick2.svg',
        '../res/brick3.svg',
        '../res/brick4.svg',
        '../res/brick5.svg',
        '../res/brick6.png',
        '../res/brick6.png',
        '../res/brick7.png'
    ];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = document.createElement('div');
            tile.className = 'brick-tile';
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;

            let left = x * tileSize;
            let top = y * (tileSize / 2);

            if (y % 2 === 1) {
                left -= tileSize / 2;
            }

            tile.style.left = `${left}px`;
            tile.style.top = `${top}px`;

            const randomTexture = textures[Math.floor(Math.random() * textures.length)];
            tile.style.backgroundImage = `url(${randomTexture})`;
            tile.style.backgroundSize = 'cover';
            tile.style.imageRendering = 'pixelated';
            tile.style.zIndex = '-1';
            document.body.appendChild(tile);
        }
    }
}

// document.body.addEventListener('click', drawBrickTiles);
// window.addEventListener('DOMContentLoaded', drawBrickTiles);
// window.addEventListener('resize', drawBrickTiles);
// setInterval(drawBrickTiles, 1000);

window.addEventListener('DOMContentLoaded', drawBackgroundTiles);
window.addEventListener('resize', drawBackgroundTiles);
document.body.addEventListener('click', drawBackgroundTiles);
// setInterval(drawBackgroundTiles, 500);
function drawBackground() {
    drawBackgroundTiles();
    // drawBrickTiles();
}

drawBackground();