var ScreenState = {
    TransitionOn: 1, TransitionOff: 2, On: 3, Off: 4
};

class Screen {

    constructor(engine) {
        this.state = ScreenState.TransitionOn;
        this.transitionOnTime = 0;
        this.transitionOffTime = 0;
        this.engine = engine;
        this.transparent = false;
        this.progress = 0;
        this.alpha = 1;
        this.objects = [];
    }

    update(delta) {
        switch (this.state) {
            case ScreenState.TransitionOn:
                if (this.transitionOnTime === 0) {
                    this.state = ScreenState.On;
                } else {
                    this.progress += (delta / this.transitionOnTime);
                    if (this.progress >= 1) {
                        this.progress = 1;
                        this.state = ScreenState.On;
                    }
                }
                break;

            case ScreenState.TransitionOff:
                if (this.transitionOffTime === 0) {
                    this.state = ScreenState.Off;
                } else {
                    this.progress += (delta / this.transitionOffTime);
                    if (this.progress >= 1) {
                        this.progress = 1;
                        this.state = ScreenState.Off;
                    }
                }
                break;

            case ScreenState.On:
                this.progress = 0;
                break;

            case ScreenState.Off:
                this.progress = 0;
                var index = this.engine.screens.indexOf(this);
                if (index > -1) {
                    this.engine.screens.splice(index, 1);
                }
                break;
        }

        this.objects.forEach(obj => obj.update(delta));
    }

    render() {
        var originalAlpha = this.engine.ctx.globalAlpha;
        this.engine.ctx.globalAlpha = this.alpha;
        this.objects.forEach(obj => obj.render());
        this.engine.ctx.globalAlpha = originalAlpha;
    }

}
