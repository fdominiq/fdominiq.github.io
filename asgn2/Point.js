// Assignment 2
// Faith Dominique

class Point{
   constructor(){
      this.type='point';
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
      this.outline = 0;
   }

   render() {
      var xy = this.position;
      var rgba = this.color;
      var size = this.size;
      // Pass the color of a point to a_Position variable
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the size tp u_Size
      gl.uniform1f(u_Size, size);

      var d = size/60.0;
      var c1 = xy[0]-d;
      var c2 = xy[0]+d;
      var c3 = xy[1]-d;
      var c4 = xy[1]+d;
      drawTriangle([c1, c3, c1, c4, c2, c4], this.outline);
      drawTriangle([c1, c3, c2, c3, c2, c4], this.outline);

   }
}