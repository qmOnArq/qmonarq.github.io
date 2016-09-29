if (!window.Assets) {
    Assets = {};
}

Assets['buildings'] = {
    img: new Image(),
    tileWidth: 128,
    tileHeight: 128,
    tilesPerRow: 5,
    data: {
        bazar: {
            startRow: 0,
            mainTiles: 1,
            animTiles: 12,
            type: 'building',
            animOffsetX: -3,
            animOffsetY: -11,
            width: 118,
            height: 76,
            tileWidth: 2,
            tileHeight: 2
        },
        bazar2: {
            startRow: 4,
            mainTiles: 1,
            animTiles: 12,
            type: 'building',
            animOffsetX: 0,
            animOffsetY: 0,
            width: 118,
            height: 82,
            tileWidth: 2,
            tileHeight: 2
        }
    }
}

Assets['buildings'].img.src = 'data/imgs/buildings.png';
