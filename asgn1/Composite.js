class Composite{
    constructor(){
       this.type='composite';
       this.position = [0.0, 0.0, 0.0];
       this.color = [1.0, 1.0, 1.0, 1.0];
       this.size = 5.0;
       this.sCount = 6.5;
       this.outline = 0;
    }
 
    render() {
       var xy = this.position;
       var rgba = this.color;
       var size = 11-Math.round(this.size);
 
       // Pass the color of a point to u_FragColor variable
       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
       var beta = Math.PI/2;
       var count = 0; // add to array
       var counter = 0; // add to array
       var base = new Float32Array(10);
       var n = 0;
 
       // Creating the vertices for base circle
       for(var circle = 0; circle <= (2*Math.PI); circle += beta){
          base[count++] = (xy[0]+(1/(2*size))*Math.cos(n*beta));
          base[count++] = (xy[1]+(1/(2*size))*Math.sin(n*beta));
          n++;
       }
 
       // Draw Composite Figure
       counter = 0;
       var x = base[counter++];
       var y = base[counter++];
       drawCircle(x,y, 1, this.sCount, 1.5*size);
       drawCircle(x-0.08,y-0.051, 0, this.sCount, 4*size);
       drawCircle(x-0.05,y-0.075, 0, this.sCount, 4*size);
       drawCircle(x-0.095,y-0.095, 1, this.sCount, 4*size);
       
 
    }
 }