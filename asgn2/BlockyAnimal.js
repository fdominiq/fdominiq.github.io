// Assignment 2
// Faith Dominique


//Global Variable that constant
let canvas;
let gl;
let u_Size;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix

let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_globalAngleZ = 0;
let g_Animation       = false;
let g_TailAnimation   = false;
var Shift_and_Click   = false;
var g_Angle           = 0;
var g_Angle2          = 0;
var head_motion       = 0;
var g_tails_wagging    = 0;
var g_start_time      = performance.now()/1000.0;
var g_seconds         = performance.now()/1000.0 - g_start_time
var g_headscan        = 0;



// The Global variable that will be changed
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' + //attribute variable
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_GlobalRotateMatrix;\n' +
    'void main() {\n' +
    '  gl_Position =u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';

function addActionForHtmlUI() {

    //Camera Angle
    document.getElementById('CameraAngleSlideX').addEventListener(('mousemove'),function (){
        g_globalAngleX = this.value;
        renderScene();
    })
    document.getElementById('CameraAngleSlideY').addEventListener(('mousemove'),function (){
        g_globalAngleY = this.value;
        renderScene();
    })
    document.getElementById('CameraAngleSlideZ').addEventListener(('mousemove'),function (){
        g_globalAngleZ = this.value;
        renderScene();
    })

    //Animations
    document.getElementById('WalkButton_On').onclick = function(){g_Animation = true}
    document.getElementById('WalkButton_Off').onclick = function(){g_Animation = false}
    document.getElementById('TailAnimationButton_On').onclick = function(){g_TailAnimation = true}
    document.getElementById('TailAnimationButton_Off').onclick = function(){g_TailAnimation = false}
    
    document.getElementById('joint').addEventListener('mousemove', function () {
        g_Angle = this.value;
        renderScene();
    });

    document.getElementById('joint2').addEventListener('mousemove', function () {
        g_Angle2 = this.value;
        renderScene();
    });

    document.getElementById('Head_Joint').addEventListener('mousemove', function () {
        head_motion = this.value;
        renderScene();
    });
}

//Set up Canvas and Gl
function setupWebGL() {
    canvas = document.getElementById("webgl");
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
    if (!gl) {
        console.log("Falied to get the rendering context for WebGL ")
    }
    gl.enable(gl.DEPTH_TEST)
}

function connectVariableToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
    if(!u_ModelMatrix){
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
        console.log('Failed to get u_GlobalRotateMatrix');
        return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix,false, identityM.elements);
}

function updateAnimationAngles(){
    if(g_Animation){
        var tmp = Math.sin(g_seconds);
        g_Angle = 10 * tmp;
        head_motion = 12 * tmp;
        g_tails_wagging = 3 * tmp;
        g_Angle2 = 3 * tmp;
    }
    if (g_TailAnimation){
        g_tails_wagging = 10 * Math.sin(g_seconds); //5
    }
}

function tick(){
    g_seconds = performance.now()/750.0-g_start_time;
    updateAnimationAngles();
    renderScene();
    requestAnimationFrame(tick);
}

function renderScene() {
    var startTime = performance.now();

    var globalRotMat = new Matrix4().rotate(g_globalAngleX,1,0,0)
    globalRotMat.rotate(g_globalAngleY,0,1,0);
    globalRotMat.rotate(g_globalAngleZ,0,0,1);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix,false,globalRotMat.elements);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawAnimal();

    // Check time/display
    var duration = performance.now() - startTime;
    SendTextToHTML(  " ms:" + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "fps");
}

function SendTextToHTML(text, htmlID) {
   (document.getElementById(htmlID)).innerHTML = text;
}

function initEventHandlers(canvas, currentAngle) {
    var drag = false;
    var prevX = -1;
    var prevY = -1;
    canvas.onmousedown = function(ev) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
            prevX = x; 
            prevY = y;
            drag = true;
        }
    };
    canvas.onmouseup = function() { drag = false;}; // Mouse released

    canvas.onclick = function(ev) { 
                if (ev.shiftKey){
                           Shift_and_Click = true; 
                }; 
    }

    canvas.onmousemove = function(ev) { 
        var x = ev.clientX
        var y = ev.clientY;
        if (drag) {
            var factor = 100/canvas.height;
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + (factor * (y - prevY)), 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + (factor * (x - prevX));
            g_globalAngleX = -currentAngle[0];
            g_globalAngleY = -currentAngle[1];
            
        }
        prevX = x;
        prevY = y;
    };
}

function delayFunction() {
      Shift_and_Click = false; 
}



function main() {
    setupWebGL();
    connectVariableToGLSL();
    addActionForHtmlUI();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    var currentAngle = [g_globalAngleX,g_globalAngleY];
    initEventHandlers(canvas, currentAngle);
    requestAnimationFrame(tick)
}