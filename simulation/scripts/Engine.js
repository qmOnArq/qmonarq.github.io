class Engine {

    constructor(debug) {
        this.stats = new Stats();

        if (debug) {
            this.debug = true;
            document.body.appendChild(this.stats.dom);
        }

        this.lastUpdate = Date.now();
        this.screens = [];
        this.camera = new Camera();
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
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
        for (var i = this.screens.length - 1; i >= 0; i--) {
            this.screens[i].update(delta);
            if (!this.screens[i].transparent && this.screens[i].state == ScreenState.On) {
                break;
            }
        }
    }

    render() {
        for (var i = this.screens.length - 1; i >= 0; i--) {
            this.screens[i].render();
            if (!this.screens[i].transparent && this.screens[i].state == ScreenState.On) {
                break;
            }
        }
    }

    pushScreen(screen) {
        this.screens.push(screen);
    }

    popScreen() {
        this.screens.state = ScreenState.TransitionOff;
    }
}

window.onload = () => {
    var E = new Engine(true);
    E.pushScreen(new MainScreen(E));
}
