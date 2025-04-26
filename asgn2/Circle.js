// Assignment 2
// Faith Dominique

class Circle {
    constructor() {
        this.type = 'circle';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.segments = 20;

    }

    render() {
        var positn = this.position;
        var rgba = this.color;
        var size = this.size;
        //pass the color of a point of u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        //draw
        var d = this.size / 200.0; 
        var tmp = Math.PI/180;
        let angleDelta = 360 / this.segments;
        let centerPt = [positn[0], positn[1]];
        for (var angle = 0; angle < 360; angle = angle + angleDelta) {
            let angle1 = angle;
            let angle2 = angle + angleDelta;
            let vec1 = [Math.cos(angle1 * tmp) * d, Math.sin(angle1 * tmp) * d];
            let vec2 = [Math.cos(angle2 * tmp) * d, Math.sin(angle2 * tmp) * d];
            let pt1 = [centerPt[0] + vec1[0], centerPt[1] + vec1[1]];
            let pt2 = [centerPt[0] + vec2[0], centerPt[1] + vec2[1]];
            drawTriangle([positn[0], positn[1], pt1[0], pt1[1], pt2[0], pt2[1]],2);
        }
    }
}