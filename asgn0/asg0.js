// asg0
// Faith Dominique, fdominiq@ucsc.edu
var ctx;
var canvas;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('asg0');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);
}

function drawVector(v, color){
   var mpx = (canvas.width)/2;
   var mpy = (canvas.height)/2;
   ctx.strokeStyle = color; // Set color
   ctx.beginPath();

   ctx.moveTo(mpx, mpy);
   ctx.lineTo(mpx + (20*v.elements[0]), mpy - (20*v.elements[1]), v.elements[2]*20);
   ctx.stroke();

}

function handleDrawEvent(){
   var x = document.getElementById('xcoord').value;
   var y = document.getElementById('ycoord').value;
   var x2 = document.getElementById('xcoord2').value;
   var y2 = document.getElementById('ycoord2').value;
   // Clear Canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Set background color
   ctx.fillStyle = 'black'; 
   ctx.fillRect(0, 0, 400, 400);

   // Draw lines
   drawVector(new Vector3([x, y, 0.0]), "red");
   drawVector(new Vector3([x2, y2, 0.0]), "blue");
}

function handleDrawOperationEvent(){
   var x = document.getElementById('xcoord').value;
   var y = document.getElementById('ycoord').value;
   var x2 = document.getElementById('xcoord2').value;
   var y2 = document.getElementById('ycoord2').value;

   // Clear Canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Set background color
   ctx.fillStyle = 'black'; // Set color to black
   ctx.fillRect(0, 0, 400, 400);

   // Draw lines
   var v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, "red");
   var v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, "blue");

   var operation = document.getElementById('opt').value;
   if (operation == "Add"){
        v1.add(v2);
        drawVector(v1, "green");
   } else if (operation == "Subtract"){
        v1.sub(v2);
        drawVector(v1, "green");
   } else if (operation == "Multiply"){
        var s = document.getElementById('scalar').value;
        v1.mul(s);
        v2.mul(s);
        drawVector(v1, "green");
        drawVector(v2, "green");
   } else if (operation == "Divide"){
        var s = document.getElementById('scalar').value;
        v1.div(s);
        v2.div(s);
        drawVector(v1, "green");
        drawVector(v2, "green");
   } else if (operation == "Mag"){
        console.log("Magnitude v1: "+ v1.magnitude());
        console.log("Magnitude v2: "+ v2.magnitude());
   } else if (operation == "Norm"){
        var v1norm = v1.normalize();
        var v2norm = v2.normalize();
        drawVector(v1norm, "green");
        drawVector(v2norm, "green");
   } else if (operation == "Ang"){
        console.log("Angle: " + (angleBetween(v1, v2)).toFixed(2)); //2 decimal places
   } else if (operation == "Area"){
        console.log("Area of this triangle: " + (areaTriangle(v1, v2)).toFixed(2));
   }
}

function angleBetween(v1, v2){
   var mag = v1.magnitude()*v2.magnitude();
   var alpha = Math.acos(Vector3.dot(v1, v2)/mag); // Radians
   return alpha*180/Math.PI;
}

function areaTriangle(v1, v2){
   var a = Vector3.cross(v1, v2);
   var v1 = new Vector3([a.elements[0], a.elements[1], a.elements[2]]); 
   return (v1.magnitude()/2);
}
