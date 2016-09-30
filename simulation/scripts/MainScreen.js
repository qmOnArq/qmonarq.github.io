class MainScreen extends Screen {

    constructor(engine) {
        super(engine);
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar', 100, 200));
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar', 100, 400, false))
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar', 400, 200))
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar', 400, 400, false))
        this.objects[2].scale = 2
        this.objects[3].scale = 2
    }
}
