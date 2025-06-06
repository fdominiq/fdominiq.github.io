class Circle {
    constructor() {
        this.type = 'circle';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.segments = 20;

    }

    render() {
        var xy = this.position;
        gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        var d = this.size / 200.0; //delta
        var tmp = Math.PI/180;
        let angleStep = 360 / this.segments;
        let centerPt = [xy[0], xy[1]];
        for (var angle = 0; angle < 360; angle = angle + angleStep) {
            let angle1 = angle;
            let angle2 = angle + angleStep;
            let vec1 = [Math.cos(angle1 * tmp) * d, Math.sin(angle1 * tmp) * d];
            let vec2 = [Math.cos(angle2 * tmp) * d, Math.sin(angle2 * tmp) * d];
            let pt1 = [centerPt[0] + vec1[0], centerPt[1] + vec1[1]];
            let pt2 = [centerPt[0] + vec2[0], centerPt[1] + vec2[1]];
            drawTriangle([xy[0], xy[1], pt1[0], pt1[1], pt2[0], pt2[1]]);
        }
    }
}