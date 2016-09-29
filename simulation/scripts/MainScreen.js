class MainScreen extends Screen {

    constructor(engine) {
        super(engine);
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar'));
        this.objects.push(new Sprite(this, Assets['buildings'], 'bazar', 100, 200, false))
    }
}
