// Assignment 2
// Faith Dominique

class Triangular_pyramid {
    constructor() {
        this.type = 'Triangular_pyramid';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render(){
        var rgba = this.color
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        drawTriangle([0.6,0.0,0.0,  0.6,1.0,0.0,  0.6,0.0,1.0],3)
        drawTriangle([0.4, 0.0, 0.0, 0.4, 1.0, 0.0, 0.4, 0.0, 1.0],3);
        drawTriangle([0.6,1.0,0.0,  0.4,1.0,0.0,  0.6,0.0,1.0],3)
        drawTriangle([0.4, 1.0, 0.0,  0.4, 0.0, 1.0,  0.6, 0.0, 1.0],3);
    }
}