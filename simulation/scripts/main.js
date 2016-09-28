class Engine {
    constructor(debug) {
        this.stats = new Stats();

        if(debug){
            this.debug = true;
            document.body.appendChild(this.stats.dom);
        }

        this.lastUpdate = Date.now();
        this.objects = [];
        requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
        this.stats.begin();
        var now = Date.now();
        this.update((now - this.lastUpdate) / 1000);
        this.lastUpdate = now;
        this.render();
        this.stats.end();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(delta) {
        this.objects.forEach((obj) => {obj.update(delta)});
    }

    render() {
        this.objects.forEach((obj) => {obj.render()});
    }
}

window.onload = () => {
    var E = new Engine(true);
}
