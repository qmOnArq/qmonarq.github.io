class MainScreen extends Screen {

    constructor(engine) {
        super(engine);
        var obj;
        for (var i = 0; i < 8; i++) {
            obj = new Sprite(this, Assets['buildings'], 'bazar', 100 + 100 * Math.pow(i, 1.3), 200);
            this.objects.push(obj);
            obj.scale = 0.4 + 0.2 * i;
            obj = new Sprite(this, Assets['buildings'], 'bazar', 100 + 100 * Math.pow(i, 1.3), 400, false);
            this.objects.push(obj);
            obj.scale = 0.4 + 0.2 * i;
        }
    }
    
}
