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
        this.width = this.data.width;
        this.height = this.data.height;
        this.paused = false;
        this.scale = 1;
        this.alpha = 1;
    }

    update(delta) {
        if (this.paused) return;
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
        
        var originalAlpha = ctx.globalAlpha;
        ctx.globalAlpha *= this.alpha;

        var startX = (this.asset.tileWidth / 2) - (this.width / 2);
        var startY = (this.asset.tileHeight / 2) - (this.height / 2);
        var x = this.x - this.width / 2 * this.scale;
        var y = this.y - this.height * this.scale;
        ctx.drawImage(this.asset.img,
            startX, startY, this.width, this.height,
            x, y, this.width * this.scale, this.height * this.scale);

        if (this.animate) {
            var tile = this.step + this.data.mainTiles;
            var tileX = Math.floor(tile % this.asset.tilesPerRow);
            var tileY = Math.floor(tile / this.asset.tilesPerRow) + this.data.startRow;
            x = x + this.data.animOffsetX * this.scale;
            y = y + this.data.animOffsetY * this.scale;
            ctx.drawImage(this.asset.img,
                tileX * this.asset.tileWidth + startX, tileY * this.asset.tileHeight + startY, this.width, this.height,
                x, y, this.width * this.scale, this.height * this.scale);
        }

        ctx.globalAlpha = originalAlpha;
    }

}
