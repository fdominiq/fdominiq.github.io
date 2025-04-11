// Faith Dominique, 1869778
// asg1
class Triangle{
    constructor(){
       this.type='triangle';
       this.position = [0.0, 0.0, 0.0];
       this.color = [1.0, 1.0, 1.0, 1.0];
       this.size = 5.0;
       this.outline = 0;
    }
 
    render(){
       var positn = this.position;
       var rgba = this.color;
       var size = this.size;
 
       // Pass color to u_FragColor
       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
       // Pass the size tp u_Size
       gl.uniform1f(u_Size, size);
 
       var d = size/40.0;
       drawTriangle([positn[0]-d, positn[1]-d, positn[0]+d, positn[1]-d, positn[0], positn[1]+d], this.outline);
 
    }
 }
 
 function drawTriangle(vertices, outline){
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
       console.log('Failed to create the buffer object');
       return -1;
    }
 
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
 
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
 
    if (outline == 0){
       gl.drawArrays(gl.TRIANGLES, 0, n);
    } else if(outline == 1){
       gl.drawArrays(gl.LINE_LOOP, 0, n);
    }
 }