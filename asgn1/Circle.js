// Faith Dominique, 1869778
// asg1
class Circle{
    constructor(){
       this.type='circle';
       this.position = [0.0, 0.0, 0.0];
       this.color = [1.0, 1.0, 1.0, 1.0];
       this.size = 5.0;
       this.sCount = 12;
       this.outline = 0;
    }
 
    render() {
       var positn = this.position;
       var rgba = this.color;
       var size = this.size;
 
       // Pass the color of a point to u_FragColor variable
       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
       // Draw
       var delta = size/40.0;
       var angleDelta = 360/this.sCount*.5;
       var tmp = Math.PI/180;
       var centerPt = [positn[0], positn[1]];
 
       if(this.outline == 0){
          for(var angle = 0; angle <= 360; angle += angleDelta){
             let angle1 = angle;
             let angle2 = angle + angleDelta;
             let vec1   = [Math.cos(angle1*tmp)*delta, Math.sin(angle1*tmp)*delta];
             let vec2   = [Math.cos(angle2*tmp)*delta, Math.sin(angle2*tmp)*delta];
             let pt1    = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
             let pt2    = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];
 
             drawTriangle([positn[0], positn[1], pt1[0], pt1[1], pt2[0], pt2[1]], this.outline);
          }
       } else if(this.outline == 1){
          drawCircle(positn[0], positn[1], this.outline, this.sCount, 12-Math.round(size));
       }
    }
 }
 
 function drawCircle(x,y, outline, sCount, size){
    var theta = Math.PI/sCount;
    var count = 0; // Array count
    var n = 0; // Number of vertices
    var vertices = new Float32Array(48);
    var tmp = 1/(1.5*size);
 
    for(var circle = 0; circle <= (2*Math.PI); circle += theta){
       vertices[count++] = x+tmp*Math.cos(n*theta);
       vertices[count++] = y+tmp*Math.sin((n++)*theta);
    }
    n--;
 
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
       console.log('Failed to create the buffer object');
       return -1;
    }
 
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
 
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
 
    if (outline == 1){
       gl.drawArrays(gl.LINE_LOOP, 0, n);
    } else if (outline == 0) {
       gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
    }
 }