// Assignment 4
// revised from ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE =
    'precision mediump float;' +
    'attribute vec4 a_Position;\n' +
    'attribute vec2 a_UV;' +
    'attribute vec3 a_Normal;' +
    'varying vec2 v_UV;' +
    'varying vec3 v_Normal;' +
    'varying vec4 v_VertPos;' +
    'uniform mat4 u_ModelMatrix;' +
    'uniform mat4 u_GlobalRotateMatrix;' +
    'uniform mat4 u_ViewMatrix;' +
    'uniform mat4 u_ProjectionMatrix;' +
    'void main() {\n' +
    '    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;' +
    '    v_UV = a_UV;' +
    '    v_Normal = a_Normal;' +
    '    v_VertPos = u_ModelMatrix * a_Position;' +
    '}\n';

//Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec2 v_UV;' +
    'varying vec3 v_Normal;' +
    'uniform vec4 u_FragColor;\n' +
    'uniform sampler2D u_Sampler0;' +
    'uniform sampler2D u_Sampler1;' +
    'uniform sampler2D u_Sampler2;' +
    'uniform sampler2D u_Sampler3;' +
    'uniform sampler2D u_Sampler4;' +
    'uniform sampler2D u_Sampler5;' +
    'uniform int u_whichTexture;' +
    'uniform vec3 u_lightPos;' +
    'uniform vec3 u_cameraPos;' +
    'uniform vec3 u_lightColor;' +
    'uniform int u_light;' +
    'uniform int u_lightC;' +
    'varying vec4 v_VertPos;' +
    '' +
    'uniform vec3 u_spotLightPos;' +
    '' +
    'void main() {\n' +
    '   if(u_whichTexture == -3){' +
    '       gl_FragColor = vec4((v_Normal+1.0)/2.0, 1.0);\n' +
    '   } else if(u_whichTexture == -2){' +
    '       gl_FragColor = u_FragColor;' +
    '   } else if (u_whichTexture ==-1){' +
    '       gl_FragColor = vec4(v_UV,1.0,1.0);' +
    '   } else if(u_whichTexture == 0){' +
    '       gl_FragColor = texture2D(u_Sampler0, v_UV);' +
    '   } else if(u_whichTexture == 1){' +
    '       gl_FragColor = texture2D(u_Sampler1, v_UV);' +
    '   } else if(u_whichTexture == 2){' +
    '       gl_FragColor = texture2D(u_Sampler2, v_UV);' +
    '   } else if(u_whichTexture == 3){' +
    '       gl_FragColor = texture2D(u_Sampler3, v_UV);' +
    '   } else if(u_whichTexture == 4){' +
    '       gl_FragColor = texture2D(u_Sampler4, v_UV);' +
    '   } else{' +
    '       gl_FragColor = vec4(1,.2,.2,1);' +
    '   }' +
    '' +
    '   if (u_light==1){' +
    '' +
    '   vec3 lightVector = u_lightPos - vec3(v_VertPos);' +
    '   float r = length(lightVector);' +
    '   vec3 L = normalize(lightVector);' +
    '   vec3 N = normalize(v_Normal);' +
    '   float nDotL = max(dot(N,L), 0.0);' +
    '' +
    '   vec3 R = reflect(-L,N);' +
    '' +
    '   vec3 E = normalize(u_cameraPos - vec3(v_VertPos));' +
    '' +
    '   float specular = pow(max(dot(E,R), 0.0), 100.0);' +
    '' +
    '   vec3 diffuse = vec3(gl_FragColor) * nDotL;' +
    '   vec3 ambient = vec3(gl_FragColor) * 0.3;' +
    '   if(u_whichTexture == 0 || u_whichTexture == 1|| u_whichTexture == -2 || u_whichTexture == 4 || u_whichTexture == 3)' +
    '       specular = 0.0;' +
    '       if(u_lightC == 0){' +
    '       gl_FragColor = vec4(specular+diffuse+ambient, 1.0);' +
    '} else{' +
    '       gl_FragColor = vec4(u_lightColor*(diffuse+ambient), 1.0);' +
    '       }' +
    '   } else if (u_light == 2){' +
    '' +
    '   vec3 lightVector = u_spotLightPos - vec3(v_VertPos);' +
    '   vec3 L = normalize(lightVector);' +
    '   vec3 N = normalize(v_Normal);' +
    '   float nDotL = dot(N,L);' +
    '       float spotFactor = 1.0;' +
    '       vec3 D = -vec3(0,-1,0);' +
    '   float spotCosine = dot(D,L);' +
    '       float spotCosineCutoff = 0.98; ' +
    '       if (spotCosine >= spotCosineCutoff) { \n' +
    '            spotFactor = pow(spotCosine,2.0);\n' +
    '       } else { ' +
    '            spotFactor = 0.0;' +
    '       }' +
    '       if(dot(N,L) <=0.0){' +
    '           gl_FragColor = vec4(0.0,0.0,0.0,1.0);' +
    '      } else {' +
    '           vec3 diffuse = vec3(gl_FragColor) * nDotL;' +
    '           vec3 ambient = vec3(gl_FragColor) * 0.3;' +
    '           vec3 reflection = dot(L,N) * u_lightColor * diffuse;' +
    '           vec3 R = reflect(-L,N);' +
    '           vec3 E = normalize(u_cameraPos - vec3(v_VertPos));' +
    '           float specular = pow(max(dot(E,R), 0.0), 100.0);' +
    '           if(dot(R,E)>0.0){' +
    '               float factor = pow(dot(R,E),2.0);' +
    '               reflection += factor *specular* u_lightColor;' +
    '             }' +
    '           vec3 color = spotFactor*reflection;' +
    '           gl_FragColor = vec4(color, 1.0);' +
    '       }' +
    '' +
    '   }' +
    '}';

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
let u_cameraPos;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_light;

let a_Normal = false;
let g_CallAnimal = true;
let g_Animation = false;
let g_set_Location = 0;
let Shift_and_Click = false;
let g_BoolTailAnimation = false;
let g_normal = false;
let g_lightMoveOn = false;

var g_Angle = 0;
var head_animation = 0;
var g_tails_animation = 0;
var g_Angle2 = 0;
var g_start_time = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_start_time;
let g_camera = new Camera();

let u_spotLightPos;
let g_lightPos = [10.1,3,12];
//let g_lightPos = [10,3,12];
let drawMap_bool = false;
let g_globalAngleY = 0;
let g_globalAngleX = 0;
let g_globalAngleZ = 0;
let g_lightColor = [1,1,1];
let u_lightColor;
let u_lightC;
let g_spotlightPos = [10.125, g_set_Location+0.4, 7.15];



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
     // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
     // Get the storage location of a_UV
    a_UV = gl.getAttribLocation(gl.program, 'a_UV');
    if (a_UV < 0) {
        console.log('Failed to get the storage location of a_UV');
        return;
    }

    // Get the storage location of u_FragColor
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
    var u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
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

    // get the storage location of u_Sampler
    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_sampler3');
        return;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
        console.log('Failed to get the storage location of u_ProjectionMatrix');
        return;
    }

    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
        console.log('Failed to get the storage location of u_ViewMatrix');
        return;
    }

    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    if (!a_Normal) {
        console.log("failed get a_Normal");
        return;
    }

    u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
    if (!u_lightPos) {
        console.log("failed get u_lightPos");
        return;
    }

    u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
    if (!u_cameraPos) {
        console.log("failed get u_cameraPos");
        return;
    }

    u_spotLightPos = gl.getUniformLocation(gl.program, 'u_spotLightPos');
    if (!u_spotLightPos) {
        console.log('Failed to get the storage location of u_spotLightPos');
        return;
    }

    u_lightColor = gl.getUniformLocation(gl.program, 'u_lightColor');
    if (!u_lightColor) {
        console.log('Failed to get the storage location of u_lightColor');
        return;
    }
    u_light = gl.getUniformLocation(gl.program, 'u_light');
    if (!u_light) {
        console.log('Failed to get the storage location of u_light');
        return false;
    }
    u_lightC = gl.getUniformLocation(gl.program, 'u_lightC');
    if (!u_lightC) {
        console.log('Failed to get the storage location of u_lightC');
        return false;
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
    document.getElementById('Normal_On').onclick = function () {
        g_normal = !g_normal;
    }
    document.getElementById('lightSlideX').addEventListener('mousemove', function (ev) {
            if (ev.buttons === 1) {
                g_lightPos[0] = 0.01*this.value;
                renderAllShapes();
            }
        });
    document.getElementById('lightSlideY').addEventListener('mousemove', function (ev) {
            if (ev.buttons === 1) {
                g_lightPos[1] = 0.01*this.value;
                renderAllShapes();
            }
        });
    document.getElementById('lightSlideZ').addEventListener('mousemove', function (ev) {
            if (ev.buttons === 1) {
                g_lightPos[2] = 0.01*this.value;
                renderAllShapes();
            }
        });

    document.getElementById('light_animation_On').addEventListener('mousemove',
        function (ev) {
            g_lightMoveOn = true;
            renderAllShapes();
        });

    document.getElementById('light_animation_Off').addEventListener('mousemove',
        function (ev) {
            g_lightMoveOn = false;
            renderAllShapes();
        });

    document.getElementById('Light_On').onclick = function () {
        gl.uniform1i(u_light,1);
    };
    document.getElementById('Light_Off').onclick = function(){
        gl.uniform1i(u_light,0);
        gl.uniform1i(u_lightC,0);
        g_lightColor = [1,1,1];
        document.getElementById("lightRed").value = g_lightColor[0]*255;
        document.getElementById("lightGreen").value = g_lightColor[1]*255;
        document.getElementById("lightBlue").value = g_lightColor[2]*255;
    };
    document.getElementById('Spot_Light_on').onclick = function () {
        gl.uniform1i(u_light, 2);
    };
    document.getElementById('Spot_Light_off').onclick = function (){
        gl.uniform1i(u_light, 0);
        gl.uniform1i(u_lightC, 0);
        g_lightColor = [1,1,1];
        document.getElementById("lightRed").value = g_lightColor[0]*255;
        document.getElementById("lightGreen").value = g_lightColor[1]*255;
        document.getElementById("lightBlue").value = g_lightColor[2]*255;
    };

    document.getElementById('lightRed').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            gl.uniform1i(u_lightC, 1);
            g_lightColor[0] = 0.01*this.value;
        }
    });
    document.getElementById('lightGreen').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            gl.uniform1i(u_lightC, 1);
            g_lightColor[1]= 0.01*this.value;
        }
    });
    document.getElementById('lightBlue').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            gl.uniform1i(u_lightC, 1);
            g_lightColor[2] = 0.01*this.value;
        }
    });
    document.getElementById('SpotlightSlideX').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            g_spotlightPos[0] = 0.1*this.value;
        }
    });
    document.getElementById('SpotlightSlideY').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            g_spotlightPos[1]= 0.1*this.value;
        }
    });
    document.getElementById('SpotlightSlideZ').addEventListener('mousemove', function (ev){
        if(ev.buttons === 1){
            g_spotlightPos[2] = 0.1*this.value;
        }
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

    image0.src = 'stone2.jpg';
    image1.src = 'sky.png';
    image2.src = 'gnd.png';
    image3.src = 'stone4.jpeg';
    image4.src = 'stone3.jpg';
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
    if(g_lightMoveOn){
        g_lightPos[1] = 2*Math.cos(g_seconds);
        g_spotlightPos[1] = 2*Math.cos(g_seconds);
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
    projMat.setPerspective(60, canvas.width / canvas.height, .1, 100);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    // Pass the view matrix
    var viewMat = new Matrix4();
    viewMat.setLookAt(
        g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2],
        g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2],
        g_camera.up.elements[0], g_camera.up.elements[1], g_camera.up.elements[2]);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

    // Pass the global rotate matrix
    var globalRotMat = new Matrix4().rotate(g_globalAngleX, 1, 0, 0);
    globalRotMat.rotate(g_globalAngleY, 0, 1, 0);
    globalRotMat.rotate(g_globalAngleZ, 0, 0, 1);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
    gl.uniform3f(u_spotLightPos, g_spotlightPos[0], g_spotlightPos[1], g_spotlightPos[2]);
    gl.uniform3f(u_lightColor, g_lightColor[0], g_lightColor[1], g_lightColor[2]);
    gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);

    var floor = new Cube();
    floor.textureNum = 2;
    floor.matrix.translate(-0, -.75, -0);
    floor.matrix.scale(35, .01, 35);
    floor.matrix.translate(-.15, 0, -.15);
    floor.multidrawCube(1);

    var light = new Cube();
    light.color = [2,2,0,1];
    if (g_normal) {
        light.textureNum = -3;
    }
    //light.matrix.translate(10,3,11);
    light.matrix.translate(g_lightPos[0], g_lightPos[1]+1, g_lightPos[2]);
    light.matrix.scale(-.1,-.1,-.1);
    //light.matrix.translate(-0.5,-0.5,-.5);
    light.multidrawCube(1);

    // ------------------ BEGIN RENDERING CUBES ------------------
    drawMap(); 
    drawSetting();

    if (!g_CallAnimal) {
        drawAnimal();
    }

    var duration = performance.now() - startTime;
    SendTextToHTML(" ms:" + Math.floor(duration) + " fps: " + Math.floor(10000 / duration) / 10, "fps");
}

function SendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    htmlElm.innerHTML = text;
}

function drawSetting() {
    var sky = new Cube();
    sky.textureNum = 1;
    if (g_normal) {
        sky.textureNum = -3;
    }
    sky.matrix.translate(0, 0, 0);
    //sky.matrix.scale(20, 20, 20);
    sky.matrix.scale(60, 60, 60);
    sky.matrix.translate(0, -0.5, 0);
    sky.multidrawCube(1);

    var sphere=[];
    for (let i = 0; i < 2; i++) {
       sphere[i] = new Sphere();
       sphere[0].textureNum =-3;
       if (g_normal) {
        sphere[i].textureNum =-3;
       }
    }
    sphere[1].color = [0,0,0,1];
    sphere[0].matrix.translate(12, 3, 12);
    sphere[1].matrix.translate(8, 3, 12);
    sphere[0].render();
    sphere[1].render();
}

let g_map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 5, 6, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 6, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 7, 10, 10, 7, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 5, 6, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 6, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


function drawMap() {

    for (x = 0; x < 32; x++) {
        for (y = 0; y < 32; y++) {
            for (z = 0; z < g_map[x][y]; z++) {
                var cube_rendering = new Cube();

                if (g_map[x][y] === 0) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map[x][y] === 1) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map[x][y] === 2) {
                    cube_rendering.textureNum = 3;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map[x][y] > 2 && g_map[x][y] <=5) {
                    cube_rendering.textureNum = 4;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map[x][y] > 5 && g_map[x][y] <= 7) {
                    cube_rendering.textureNum = 0;
                    cube_rendering.matrix.translate(y - 4, z - 0.75, x - 4);
                    cube_rendering.multidrawCube(1);
                } else if (g_map[x][y] > 8 && g_map[x][y] < 12) {
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
        }
    };
    canvas.onmouseup = function () {
        dragging = false;
    }; 
    canvas.onmousemove = function (ev) { // Mouse moved
        var x = ev.clientX
        var y = ev.clientY;
        if (dragging) {
            var factor = 100 / canvas.height; // The rotation ratio
            var dx = factor * (x - prevX);
            var dy = factor * (y - prevY);
            // Limit x-axis rotation angle to +-90 degrees
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + dx;
            g_globalAngleX = -currentAngle[0];
            g_globalAngleY = -currentAngle[1];

        }
        prevX = x;
        prevY = y;
    };
}

