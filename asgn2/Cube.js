// Assignment 2
// Faith Dominique

class Cube {
   constructor() {
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.vertex = [[0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0],
                     [0.0,0.0,0.0, 1.0,1.0,0.0, 0.0,1.0,0.0],
                     [0.0,1.0,0.0, 0.0,1.0,1.0, 1.0,1.0,1.0],
                     [0.0,1.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0],
                     [0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,1.0],
                     [0.0,0.0,0.0, 1.0,0.0,1.0, 1.0,0.0,0.0],
                     [0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0],
                     [0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0],
                     [0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,1.0,0.0],
                     [0.0,0.0,0.0, 0.0,1.0,1.0, 0.0,0.0,1.0],
                     [1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,1.0,0.0],
                     [1.0,0.0,0.0, 1.0,1.0,1.0, 1.0,0.0,1.0]];
   }

   render() {
      var rgba = this.color;

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      for (let i = 0; i < 4; i++) {
          drawTriangle(this.vertex[i],3);
      }

      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      for (let i = 4; i < 8; i++) {
         drawTriangle(this.vertex[i],3);
      }

      // change color
      gl.uniform4f(u_FragColor, rgba[0]-0.1, rgba[1]-0.1, rgba[2]-0.1, rgba[3]);
      for (let i = 8; i < 12; i++) {
          drawTriangle(this.vertex[i],3);
      }
   }
}