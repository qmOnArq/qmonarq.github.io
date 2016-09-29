class Sprite extends Object {

    constructor(screen, asset, id, x, y, animate, yoyo) {
        super(screen);
        this.asset = asset;
        this.data = this.asset.data[id];
        this.id = id;
        this.yoyo = (typeof yoyo !== 'undefined') ? yoyo : false;
        this.step = 0;
        this.direction = 1;
        this.timePassed = 0;
        this.animate = (typeof animate !== 'undefined') ? animate : true;
        this.x = (typeof x !== 'undefined') ? x : 100;
        this.y = (typeof y !== 'undefined') ? y : 100;
    }

    update(delta) {
        if (this.animate) {
            this.timePassed += delta;
            while (this.timePassed >= 0.032) {
                this.timePassed -= 0.032;
                this.step += this.direction;
                if (this.step < 0) {
                    this.direction = -this.direction;
                    this.step = 1;
                }
                if (this.step >= this.data.animTiles) {
                    if (this.yoyo) {
                        this.direction = -this.direction;
                        this.step = this.data.animTiles - 2;
                    } else {
                        this.step = 0;
                    }
                }
            }
        }
    }

    render() {
        var ctx = this.screen.engine.ctx;
        //TODO fix numbers, remove white around
        ctx.drawImage(this.asset.img, 0, 0, 128, 128, this.x, this.y, 128, 128);

        if (this.animate) {
            var tile = this.step + this.data.mainTiles;
            var tileX = Math.floor(tile % this.asset.tilesPerRow);
            var tileY = Math.floor(tile / this.asset.tilesPerRow) + this.data.startRow;
            ctx.drawImage(this.asset.img,
                tileX * 128, tileY * 128, 128, 128,
                this.x + this.data.animOffsetX, this.y + this.data.animOffsetY, 128, 128);
        }
    }

}
