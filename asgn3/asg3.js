// Assignment 3 program
// revised from ColoredPoint.js (c) 2012 matsuda

var u_Clicked;

// Vertex shader program
var VSHADER_SOURCE = `
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   uniform bool u_Clicked;
   void main() {
      if(u_Clicked){
         vec4(1,1,1,1);
      }
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
      v_UV = a_UV;
   }`

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;
    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2;
    uniform sampler2D u_Sampler3;
    uniform sampler2D u_Sampler4;
    uniform sampler2D u_Sampler5;
    uniform int u_whichTexture;
    void main() {
       if(u_whichTexture == -2){
           gl_FragColor = u_FragColor; }
       else if(u_whichTexture == -1){
           gl_FragColor = vec4(v_UV, 1.0, 1.0); }
       else if(u_whichTexture == 0){
           gl_FragColor = texture2D(u_Sampler0, v_UV);}
       else if(u_whichTexture == 1){
           gl_FragColor = texture2D(u_Sampler1, v_UV); }
       else if(u_whichTexture == 2){
           gl_FragColor = texture2D(u_Sampler2, v_UV); }
       else if(u_whichTexture == 3){
           gl_FragColor = texture2D(u_Sampler3, v_UV); }
       else if(u_whichTexture == 4){
           gl_FragColor = texture2D(u_Sampler4, v_UV); }
       else if(u_whichTexture == 5){
           gl_FragColor = texture2D(u_Sampler5, v_UV); }
       else { 
            gl_FragColor = vec4(1, .2, .2, 1);
       }
    }
   
    `

let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix
let u_whichTexture;

var u_Sampler0;
var u_Sampler1;
var u_Sampler2;
var u_Sampler3;
var u_Sampler4;
var u_Sampler5;
var picked = false;
var flybycntr1 = 0;
var flybycntr2 = 0;
var flybycntr3 = 0;
var flybycntr4 = 0;
var flybycntr5 = 0;
var flybycntr6 = 0;
var flybycntr7 = 0;
var flybycntr8 = 0;
var flybycntr9 = 0;
var g_delay1 = 0;
var g_delay2 = 0;
var g_delay3 = 0;
var g_delay4 = 0;
var g_delay5 = 0;
var g_delay6 = 0;
var g_delay7 = 0;
var g_delay8 = 0;
var g_delay9 = 0;
var g_delay1_fin = 0;
var g_delay2_fin = 0;
var g_delay3_fin = 0;
var g_delay4_fin = 0;
var g_delay5_fin = 0;
var g_delay6_fin = 0;
var g_delay7_fin = 0;
var g_delay8_fin = 0;
var g_delay9_fin = 0;
var g_delayC1 = 0;

var g_speed=30;

let g_CallAnimal = false;
let g_aerial = false;
let g_add = false;
let g_del = false;
let g_Animation = false;
let g_set_Location = 0;
let g_constr = false;
let Shift_and_Click = false;

var g_vertexBufferCube = null;
var g_Angle = 0;
var head_animation = 0;
var g_tails_animation = 0;
var g_Angle2 = 0;
var g_headscan = 0;
var g_start_time = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_start_time;

let g_BoolTailAnimation = false;
let g_globool = true;
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_globalAngleZ = 0;

let g_camera = new Camera();

var g_map_constr1=[];


let g_map_fd = [
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 7, 6, 7, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 6, 5, 6, 5, 4, 5, 4, 5, 0, 0, 0, 5, 4, 5, 4, 5, 6, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 7, 10, 10, 7, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 6, 5, 6, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 6, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2],
]; 

function setupCanvas() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true}); // gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function connectVariablesToGLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
    if (!u_Clicked) {
       console.log('Failed to get u_Clicked');
       return;
    }

    // Get storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Get storage location of a_UV
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
    }

    // Get storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
        console.log('Failed to get the storage location of u_GlobalRotateMatrix');
        return;
    }

    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
        console.log('Failed to get the storage location of u_ProjectionMatrix');
        return;
    }

    // Get the storage location of u_ModelMatrix
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    // get the storage location of u_Sample0
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_sampler0');
        return false;
    }

    // get the storage location of u_Sampler1
    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_sampler1');
        return;
    }

    // get the storage location of u_Sampler1
    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
        console.log('Failed to get the storage location of u_sampler2');
        return;
    }

    // get the storage location of u_Sampler3
    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
        console.log('Failed to get the storage location of u_sampler3');
        return;
    }

    // get the storage location of u_Sampler4
    u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
    if (!u_Sampler4) {
        console.log('Failed to get the storage location of u_sampler4');
        return;
    }

    // get the storage location of u_Sampler5
    u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
    if (!u_Sampler5) {
        console.log('Failed to get the storage location of u_sampler5');
        return;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_sampler');
        return;
    }

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function addActionForHtmlUI() {
    document.getElementById('Animate').onclick = function () {
        g_Animation = !g_Animation;
    };
    document.getElementById('CallAnimal').onclick = function () {
        g_CallAnimal = !g_CallAnimal;
    };
    document.getElementById('Random').onclick = function () {
        g_aerial = !g_aerial;
    }
    document.getElementById('Constr').onclick = function () {
        g_constr = !g_constr;
    }
    document.getElementById('Add').onclick = function () {
        g_add = !g_add;
    }
    document.getElementById('Del').onclick = function () {
        g_del = !g_del;
    }

    document.getElementById('Spd').addEventListener('mousemove', function () {
        g_speed = 121-this.value;
    });
}


function initTextures() {
    // image 0 --------------------------
    var image0 = new Image();
    if (!image0) {
        console.log('Failed to create the image0 object');
        return false;
    }
    image0.onload = function () {
        sendTextureToTEXTURE(image0,0);
    };

    // image 1 --------------------------
    var image1 = new Image();
    if (!image1) {
        console.log('Failed to create the image1 object');
        return false;
    }
    image1.onload = function () {
        sendTextureToTEXTURE(image1,1);
    };

    //image 2 --------------------------
    var image2 = new Image();
    if (!image2) {
        console.log('Failed to create the image2 object');
        return false;
    }
    image2.onload = function () {
        sendTextureToTEXTURE(image2,2);
    };

    //image 3 --------------------------
    var image3 = new Image();
    if (!image3) {
        console.log('Failed to create the image3 object');
        return false;
    }
    image3.onload = function () {
        sendTextureToTEXTURE(image3,3);
    };

    //image 4 --------------------------
    var image4 = new Image();
    if (!image4) {
        console.log('Failed to create the image4 object');
        return false;
    }
    image4.onload = function () {
        sendTextureToTEXTURE(image4,4);
    };

    //image 5 --------------------------
    var image5 = new Image();
    if (!image5) {
        console.log('Failed to create the image5 object');
        return false;
    }
    image5.onload = function () {
        sendTextureToTEXTURE(image5,5);
    };

    if (g_globool === true) {
        image0.src = 'stone2.jpg';
        image1.src = 'sky.png';
        image2.src = 'gnd.png';
        image3.src = 'stone4.jpeg';
        image4.src = 'stone3.jpg';
        image5.src = 'sand.jpg';
    }
}

function sendTextureToTEXTURE(image, ind) {
    var texture = gl.createTexture();
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    if (ind===0){
        gl.activeTexture(gl.TEXTURE0);
    } else if (ind===1) {
        gl.activeTexture(gl.TEXTURE1);
    } else if (ind===2) {
        gl.activeTexture(gl.TEXTURE2);
    } else if (ind===3) {
        gl.activeTexture(gl.TEXTURE3);
    } else if (ind===4) {
        gl.activeTexture(gl.TEXTURE4);
    } else if (ind===5) {
        gl.activeTexture(gl.TEXTURE5);
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler0, 0);
    if (ind===0){
        gl.uniform1i(u_Sampler0, 0);
    } else if (ind===1) {
        gl.uniform1i(u_Sampler1, 1);
    } else if (ind===2) {
        gl.uniform1i(u_Sampler2, 2);
    } else if (ind===3) {
        gl.uniform1i(u_Sampler3, 3);
    } else if (ind===4) {
        gl.uniform1i(u_Sampler4, 4);
    } else if (ind===5) {
        gl.uniform1i(u_Sampler5, 5);
    }
}



function main() {
    setupCanvas();
    connectVariablesToGLSL();
    addActionForHtmlUI();
    initTextures();
    document.onkeydown = keydown;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    var currentAngle = [g_globalAngleX, g_globalAngleY];
    initEventHandlers(canvas, currentAngle);
    requestAnimationFrame(tick);
}

function tick() {
    g_seconds = performance.now() / 1000.0 - g_start_time;
    updateAnimation();
    renderAllShapes();
    requestAnimationFrame(tick);
}

function updateAnimation() {
    if (g_Animation) {
        g_set_Location = ((Math.sin(g_seconds * 3)) / 30) - (.3);
        g_Angle = 10 * Math.sin(g_seconds);
        head_animation = 12 * Math.sin(g_seconds);
        g_Angle2 = 3 * Math.sin(g_seconds);
    }
    if (g_BoolTailAnimation) {
        g_tails_animation = 5 * Math.sin(g_seconds);
    }
}

function keydown(ev) {
    if (ev.keyCode === 68) {
        g_camera.right();
    } else if (ev.keyCode === 65) {
        g_camera.left();
    } else if (ev.keyCode === 87) {
        g_camera.forward();
    } else if (ev.keyCode === 83) {
        g_camera.backward();
    } else if (ev.keyCode === 69) {
        g_camera.rotRight();
    } else if (ev.keyCode === 81) {
        g_camera.rotLeft();
    } else if (ev.keyCode === 90) {
        g_camera.upward();
    } else if (ev.keyCode === 88) {
        g_camera.downward();
    }
    renderAllShapes();
}

function renderAllShapes() {
    var startTime = performance.now();

    // Pass the project matrix
    var projMat = new Matrix4();
    projMat.setPerspective(100, canvas.width / canvas.height, .1, 100); //was 60
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    // Pass the view matrix
    var viewMat = new Matrix4();
    viewMat.setLookAt(
        g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2],
        g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2],
        g_camera.up.elements[0], g_camera.up.elements[1], g_camera.up.elements[2]);
    
    //console.log(g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2]);

    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    // Pass the global rotate matrix
    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 1, 0, 0)
    globalRotMat.rotate(g_globalAngleY, 0, 1, 0);
    globalRotMat.rotate(g_globalAngleZ, 0, 0, 1);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // ------------------ BEGIN RENDERING CUBES ------------------

    drawSetting();
    if (g_aerial) {
        drawMap();
        var timelimit = 15;
        if (flybycntr1 < 5){
              if (g_delay1 === 0) { 
                  g_camera.backward();
                  flybycntr1 = flybycntr1+1;
                  if (flybycntr1 === 5) { g_delay1_fin=1;}
               }
               g_delay1 +=1; 
               if (g_delay1 === timelimit) { 
                  g_delay1 = 0;
               }
        }

        if (flybycntr2 < 12 && g_delay1_fin===1){
              if (g_delay2 ===0) { 
                  g_camera.upward();
                  flybycntr2 = flybycntr2+1;
                  if (flybycntr2 === 12) { g_delay2_fin=1;}
               }
               g_delay2 +=1; 
               if (g_delay2 === timelimit) { 
                   g_delay2=0;                 
               }
        } 

        if (flybycntr3 < 16 && g_delay2_fin===1){
              if (g_delay3 === 0) { 
                  g_camera.left();
                  if (flybycntr3 > 4 && flybycntr3 < 10 ){                   
                     g_camera.right();
                  }
                  flybycntr3 = flybycntr3+1;
                  if (flybycntr3 === 16) { g_delay3_fin=1;}
               }
               g_delay3 +=1; 
               if (g_delay3 === timelimit) { 
                   g_delay3=0;
               }
        } 

        if (flybycntr4 < 26 && g_delay3_fin===1){
              if (g_delay4 === 0) { 
                  g_camera.forward();
                  if (flybycntr4 > 12 && flybycntr4 < 22 ){
                    g_camera.rotDown();
                  }
                  flybycntr4 = flybycntr4+1;
                  if (flybycntr4 === 26) { g_delay4_fin=1;}
               }
               g_delay4 +=1; 
               if (g_delay4 === timelimit) { 
                   g_delay4=0;
               }
        } 

        if (flybycntr5 < 20 && g_delay4_fin===1){
              if (g_delay5 === 0) { 
                  g_camera.forward();
                  if (flybycntr5 > 4 && flybycntr5 < 16 ){
                    g_camera.rotDown();
                  }
                  flybycntr5 = flybycntr5+1;
                  if (flybycntr5 === 20) { g_delay5_fin=1;}
               }
               g_delay5 +=1; 
               if (g_delay5 === timelimit) { 
                   g_delay5=0;
               }
        }

        if (flybycntr6 < 32 && g_delay5_fin===1){
              if (g_delay6 === 0) { 
                  g_camera.rotRight();
                  flybycntr6 = flybycntr6+1;
                  if (flybycntr6 === 32) { g_delay6_fin=1;}
               }
               g_delay6 +=1; 
               if (g_delay6 === timelimit) { 
                   g_delay6=0;
               }
        }

        if (flybycntr7 < 10 && g_delay6_fin===1){
              if (g_delay7 === 0) { 
                  g_camera.downward();
                  flybycntr7 = flybycntr7+1;
                  if (flybycntr7 === 10) { g_delay7_fin=1;}
               }
               g_delay7 +=1; 
               if (g_delay7 === timelimit) { 
                   g_delay7=0;
               }
        }

        if (flybycntr8 < 8 && g_delay7_fin===1){
              if (g_delay8 === 0) { 
                  g_camera.left();
                  flybycntr8 = flybycntr8+1;
                  if (flybycntr8 === 8) { g_delay8_fin=1;}
               }
               g_delay8 +=1; 
               if (g_delay8 === timelimit) { 
                   g_delay8=0;
               }
        }

        if (flybycntr9 < 4 && g_delay8_fin===1){
              if (g_delay9 === 0) { 
                  g_camera.backward();
                  flybycntr9 = flybycntr9+1;
                  if (flybycntr9 === 4) { g_delay9_fin=1;}
               }
               g_delay9 +=1; 
               if (g_delay9 === timelimit) { 
                   g_delay9=0;
               }
        }

       if (g_delay9_fin==1) {
            g_aerial = !g_aerial;
            flybycntr1 = 0;
            flybycntr2 = 0;
            flybycntr3 = 0;
            flybycntr4 = 0;
            flybycntr5 = 0;
            flybycntr6 = 0;
            flybycntr7 = 0;
            flybycntr8 = 0;
            flybycntr9 = 0;
            g_delay1 = 0;
            g_delay2 = 0;
            g_delay3 = 0;
            g_delay4 = 0;
            g_delay5 = 0;
            g_delay6 = 0;
            g_delay8 = 0;
            g_delay9 = 0;
            g_delay6 = 0;
            g_delay1_fin = 0;
            g_delay2_fin = 0;
            g_delay3_fin = 0;
            g_delay4_fin = 0;
            g_delay5_fin = 0;
            g_delay6_fin = 0;
            g_delay7_fin = 0;
            g_delay8_fin = 0;
            g_delay9_fin = 0;
       } 
    } else if (g_constr){
        var timelimit = 0;
        timelimit = g_speed;
        if (g_delayC1===0){
            for (x = 0; x < 32; x++) {
               g_map_constr1[x] = [];
               for (y = 0; y < 32; y++) {
                   g_map_constr1[x][y] = 0;
               }
            }
        }
        
         g_delayC1 +=1; 

         if (g_delayC1 > timelimit){ 
            g_map_constr1[26][4] = 7;
            g_map_constr1[27][4] = 6;
            g_map_constr1[28][4] = 7;
            g_map_constr1[26][5] = 6;
            g_map_constr1[27][5] = 5;
            g_map_constr1[28][5] = 6;
            g_map_constr1[26][6] = 7;
            g_map_constr1[27][6] = 6;
            g_map_constr1[28][6] = 7;
            drawMapConstr(g_map_constr1); 
         }

         if (g_delayC1 >= 2*timelimit && g_delayC1 < 3*timelimit) { 
            g_map_constr1[25][5] = 4;
            g_map_constr1[24][5] = 4;
            g_map_constr1[23][5] = 4;
            g_map_constr1[22][5] = 4;
            g_map_constr1[27][7] = 5;
            g_map_constr1[27][8] = 4;
            g_map_constr1[27][9] = 5;
            g_map_constr1[27][10] = 4;
            g_map_constr1[27][11] = 5;
            drawMapConstr(g_map_constr1); 
         }

         if (g_delayC1 >= 3*timelimit && g_delayC1 < 4*timelimit) { 
            g_map_constr1[26][20] = 7;
            g_map_constr1[27][20] = 6;
            g_map_constr1[28][20] = 7;
            g_map_constr1[26][21] = 6;
            g_map_constr1[27][21] = 5;
            g_map_constr1[28][21] = 6;
            g_map_constr1[26][22] = 7;
            g_map_constr1[27][22] = 6;
            g_map_constr1[28][22] = 7;
            drawMapConstr(g_map_constr1); 
         }

         if (g_delayC1 >= 4*timelimit && g_delayC1 < 5*timelimit) { 
            g_map_constr1[16][20] = 7;
            g_map_constr1[17][20] = 6;
            g_map_constr1[18][20] = 7;
            g_map_constr1[16][21] = 6;
            g_map_constr1[17][21] = 5;
            g_map_constr1[18][21] = 6;
            g_map_constr1[16][22] = 7;
            g_map_constr1[17][22] = 6;
            g_map_constr1[18][22] = 7;
            drawMapConstr(g_map_constr1); 
         }

         if (g_delayC1 >= 5*timelimit && g_delayC1 < 6*timelimit) { 
            g_map_constr1[16][4] = 7;
            g_map_constr1[17][4] = 6;
            g_map_constr1[18][4] = 7;
            g_map_constr1[16][5] = 6;
            g_map_constr1[17][5] = 5;
            g_map_constr1[18][5] = 6;
            g_map_constr1[16][6] = 7;
            g_map_constr1[17][6] = 6;
            g_map_constr1[18][6] = 7;
            drawMapConstr(g_map_constr1); 
         }

         if (g_delayC1 === 6*timelimit) { 
               g_constr = 0;
               g_aerial=0;
               g_delayC1 = 0;
         }

    } else {
        if (g_add) {
           var xx = 4+Math.floor(g_camera.at.elements[0]);
           var zz = Math.floor((g_camera.at.elements[2]))-92;
           console.log(xx,zz);
           if (xx < 32 && xx >= 0 && zz < 32 && zz >= 0) {
                 g_map_fd[zz+1][xx-1] += 12;
           }
           g_add = false;
        } else if (g_del) {
           var xx = 4+Math.floor(g_camera.at.elements[0]);
           var zz = Math.floor((g_camera.at.elements[2]))-92;
           console.log(xx,zz);
           if (xx < 32 && xx >= 0 && zz < 32 && zz >= 0) {
                 g_map_fd[zz+1][xx-1] = 0;
           }
           g_del = false;
        }
        drawMap();
    }
    if (g_CallAnimal) {
        drawAnimal();  
    }
    var timetaken = performance.now() - startTime;
    SendTextToHTML(" ms:" + Math.floor(timetaken) + " fps: " + Math.floor(1000/timetaken), "fps");
}

function SendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    htmlElm.innerHTML = text;
}

function drawSetting() {
    var floor = new Cube();
    floor.textureNum = 2;
    floor.matrix.translate(-0, -.75, -0);
    floor.matrix.scale(35, .01, 35);
    floor.matrix.translate(-.15, 0, -.15);
    floor.multidrawCube(1);

    var sky = new Cube();
    sky.color = [0, 0.95, 1, 1];
    sky.textureNum = 1;
    sky.matrix.translate(-1, 0, -1);
    sky.matrix.scale(100, 100, 100);
    sky.matrix.translate(-.5, -.5, -.5);
    sky.multidrawCube(1);

    var floor = new Cube();
    floor.textureNum = 5;
    floor.matrix.translate(-0, -.75, -0);
    floor.matrix.scale(3, .01, 11);
    floor.matrix.translate(2.65, 0.1, 0.3);
    floor.multidrawCube(1);

    var gold = new Cube();
    gold.color = [234/255,162/255,33/255,1];
    gold.matrix.translate(-0, -.75, -0);
    gold.matrix.scale(0.15, .1, .175);
    gold.matrix.translate(50, 0.1, 114);
    gold.multidrawCube(1);
        
}


function drawMap() {

    for (x = 0; x < 32; x++) {
        for (y = 0; y < 32; y++) {
            for (z = 0; z < g_map_fd[x][y]; z++) {
                var cube_rendering = new Cube();

                if (g_map_fd[x][y] === 0) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] === 1) {
                    cube_rendering.textureNum = 2;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] === 2) {
                    cube_rendering.textureNum = 3;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] === 1.1) {
                    cube_rendering.textureNum = 3;
                    cube_rendering.matrix.translate(y - 4, z - 2.2, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] > 2 && g_map_fd[x][y] <=5) {
                    cube_rendering.textureNum = 4;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] > 5 && g_map_fd[x][y] <= 7) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] > 8 && g_map_fd[x][y] < 12) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map_fd[x][y] >= 12) {
                    var tmp = g_map_fd[x][y]-12;
                    console.log(tmp);
                    g_map_fd[x][y] = tmp+1;
                    cube_rendering.textureNum = 5;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                }
            }
        }
    }
}

function drawMapConstr(mp) {
 
    for (x = 0; x < 32; x++) {
        for (y = 0; y < 32; y++) {
            for (z = 0; z < mp[x][y]; z++) {
                var cube_rendering = new Cube();
                if (mp[x][y] === 0) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (mp[x][y] === 1) {
                    cube_rendering.textureNum = 2;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (mp[x][y] === 2) {
                    cube_rendering.textureNum = 3;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (mp[x][y] > 2 && mp[x][y] <=5) {
                    cube_rendering.textureNum = 4;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (mp[x][y] > 5 && mp[x][y] <= 7) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (mp[x][y] > 8) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                }
            }
        }
    }
}


function initEventHandlers(canvas, currentAngle) {
    var dragging = false;
    var prevX = -1, prevY = -1;

    canvas.onmousedown = function (ev) {
        var x = ev.clientX, y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
            prevX = x;
            prevY = y;
            dragging = true;

            var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
        }
    };
    canvas.onmouseup = function () {
        dragging = false;
    }; 
    canvas.onmousemove = function (ev) { // Mouse moved
        var x = ev.clientX
        var y = ev.clientY;
        if (dragging) {
            var factor = 100 / canvas.height; // rotation ratio
            var dx = factor * (x - prevX);
            var dy = factor * (y - prevY);
            // Limiting x-axis rotation angle to +-90 degrees
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + dx;
            g_globalAngleX = -currentAngle[0];
            g_globalAngleY = -currentAngle[1];

        }
        prevX = x;
        prevY = y;
    };
}

