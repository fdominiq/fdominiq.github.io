// Faith Dominique, 1869778
// asg1

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const COMPOSITE = 3;

// Global Variables
var gl;
var canvas;
var a_Position;
var u_FragColor;
var u_Size;
var ctx;
var cnt;
var col;

// Array
var g_shapesList = [];
var tt = [];

// UI
var g_selectedColor = [0.5, 0.5, 0.5, 1.0];
var g_selectedSize = 5;
var g_selectedType = POINT;
var g_selectedsCount = 12;
var g_outline = 0;
var flg = false;


// Vertex shader program ==========================================
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform float u_Size;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = u_Size;\n' +
    '}\n';

// Fragment shader program ========================================
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' + 
    '}\n';

// HTML ============================================================
function addActionsForHtmlUI(){
   // Button Events
   document.getElementById('clear').onclick     = function() { g_shapesList = []; renderAllShapes(); };
   document.getElementById('square').onclick    = function() { g_selectedType = POINT;    g_outline = 0;};
   document.getElementById('triangle').onclick  = function() { g_selectedType = TRIANGLE; g_outline = 0;};
   document.getElementById('circle').onclick    = function() { g_selectedType = CIRCLE;   g_outline = 0;};
   document.getElementById('osquare').onclick   = function() { g_selectedType = POINT;    g_outline = 1;};
   document.getElementById('otriangle').onclick = function() { g_selectedType = TRIANGLE; g_outline = 1;};
   document.getElementById('ocircle').onclick   = function() { g_selectedType = CIRCLE;   g_outline = 1;};
   document.getElementById('composite').onclick   = function() { g_selectedType = COMPOSITE;   g_outline = 0;};
   document.getElementById('painting').onclick   = function() {g_shapesList = []; showPicture();};

   // Color Slider Events
   document.getElementById('red').addEventListener('mouseup',  function() { g_selectedColor[0] = this.value*0.1; });
   document.getElementById('green').addEventListener('mouseup',function() { g_selectedColor[1] = this.value*0.1; });
   document.getElementById('blue').addEventListener('mouseup', function() { g_selectedColor[2] = this.value*0.1; });

   // Size and Seg Slider Events
   document.getElementById('size').addEventListener('mouseup',    function() { g_selectedSize = this.value });
   document.getElementById('sCount').addEventListener('mouseup',  function() { g_selectedsCount = this.value; });

   var bttn = document.getElementById("bttn");
   var img = document.getElementsByTagName("img")[0];
   bttn.onclick = function() {
        if(bttn.innerHTML === "Hide"){
            img.style.display = "none";
            bttn.innerHTML = "Show";
        } else {
            img.style.display = "block";
            bttn.innerHTML = "Hide";
        }
   }

}

// Get Canvas and GL Context ======================================
function setupWebGL(){
   // Retrieve <canvas> element
   canvas = document.getElementById('asg1');
   if (!canvas) {
       console.log('Failed to retrieve the <canvas> element');
       return;
   }

   // Rendering context for WebGL
   gl = getWebGLContext(canvas);
   if(!gl){
       console.log('Failed to get the rendering context for WebGL');
       return;
   }
}

// Compile Shader Programs and connect js to GLSL =================
function connectVariablesToGLSL(){
   // Initialize shaders ==========================================
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to intialize shaders.');
       return;
   }

   // Get the storage location of attribute variable ==============
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
       console.log('Failed to get the storage location of a_Position');
       return;
   }

   // Get the storage location of attribute variable ==============
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) {
       console.log('Failed to get u_FragColor');
       return;
   }

   u_Size = gl.getUniformLocation(gl.program, 'u_Size');
   if (!u_Size) {
       console.log('Failed to get u_Size');
       return;
   }

}

// Main ===========================================================
function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();

   // Register function (event handler) to be called on a mouse press
   canvas.onmousedown = function(ev){      
        click(ev);
        flg = true;
   };
   canvas.onmouseup = function(ev){
        flg = false;
   };
   canvas.onmousemove = function(ev){
   if (flg) {
        click(ev);
   }
   };

   // Specify the color for clearing <canvas>
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
} // end of main

// Get Coordinates =================================================
function convertCoordinatesEventToGL(ev){
   var x = ev.clientX; // x coordinate of mouse
   var y = ev.clientY; // y coordinate of mouse
   var rect = ev.target.getBoundingClientRect() ;

   // set coordinates based on origin
   var tmp1 = canvas.width/2;
   var tmp2 = canvas.height/2;
   x = ((x - rect.left) - tmp1)/tmp1;
   y = (tmp2 - (y - rect.top))/tmp2;
   return [x,y];
}

// Click ==========================================================
function click(ev) {
   var [x,y] = convertCoordinatesEventToGL(ev);
   var point;
   if(g_selectedType==POINT){
      point = new Point();
   } else if (g_selectedType==TRIANGLE){
      point = new Triangle();
   } else if (g_selectedType==CIRCLE){
      point = new Circle();
      point.sCount = g_selectedsCount;
   } else if (g_selectedType==COMPOSITE){
   point = new Composite();
   }

   point.position = [x,y];
   point.color = g_selectedColor.slice();
   point.size = g_selectedSize;
   point.outline = g_outline;
   g_shapesList.push(point);

   // Draw every shape that is suppose to be in the canvas
   renderAllShapes();

}

// renderAllShapes =================================================
function renderAllShapes(){
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);

   var len = g_shapesList.length;
   for (var a = 0; a < len; a += 1) {
      g_shapesList[a].render();
   }

}


function sier(gl, x,y,size,depth, cnt, col,a,b){
            if (depth === 0) {      
                   tt[cnt] = new Triangle();         
                   tt[cnt].size = size;
                   tt[cnt].position = [x+a,y+b, 0.0];
                   col=[1,0,0,1];
                   tt[cnt].color = col;
                   g_shapesList[cnt] = tt[cnt++];

            } else {         
                   tt[cnt] = new Triangle();         
                   tt[cnt].size = size;
                   tt[cnt].position = [x,y, 0.0];
                   tt[cnt].color = col;
                   g_shapesList[cnt] = tt[cnt];

                   tt[cnt+1] = new Triangle();
                   tt[cnt+1].size = size;
                   tt[cnt+1].position = [x+a,y-b, 0.0];
                   tt[cnt+1].color = col;
                   g_shapesList[cnt+1] = tt[cnt+1];

                   tt[cnt+2] = new Triangle();
                   tt[cnt+2].size = size;
                   tt[cnt+2].position = [x-a,y-b, 0.0];
                   tt[cnt+2].color = col;
                   g_shapesList[cnt+2] = tt[cnt+2];
            }
}

function showPicture(){
    g_shapesList = [];
    renderAllShapes();
    gl = getWebGLContext(canvas);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    //-----Generates a Fractal Triangle-----------
    col =[1,0,0,1];
    cnt = 0;
    sier(gl, 0.0, 0.0, 40,0,cnt,col,0,0 );
    cnt++;
    col =[1,1,0,1];
    sier(gl, 0.0, 0.5, 20,1,cnt,col,0.5,1 );
    cnt+=3;
    col =[0,1,0,1];
    sier(gl, 0.0,0.75, 10,1,cnt,col,0.25,0.5 );
    cnt+=3;    
    sier(gl, 0.5,-0.25, 10,1,cnt,col,0.25,0.5 );
    cnt+=3;    
    sier(gl, -0.5,-0.25, 10,1,cnt,col,0.25,0.5 );
    cnt+=3;
    col =[0,0,1,1];
    sier(gl, 0.0,0.875, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, 0.5,-0.125, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, -0.5,-0.125, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, 0.25,-0.625, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, 0.75,-0.625, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, -0.75,-0.625, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, -0.25,-0.625, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, -0.25,0.375, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    sier(gl, 0.25,0.375, 5,1,cnt,col,0.125,0.25 );
    cnt+=3;    
    col =[0.75,0,1,1];
    sier(gl, 0.0,0.9375, 2.5,1,cnt,col,0.125/2,0.25/2 );
    cnt+=3; 
    sier(gl, -0.875,-0.8125, 2.5,1,cnt,col,0.125/2,0.25/2 );
    cnt+=3; 
    sier(gl, 0.875,-0.8125, 2.5,1,cnt,col,0.125/2,0.25/2 );
    renderAllShapes();
}




