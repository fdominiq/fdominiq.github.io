
 import * as THREE from 'three';
 import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
 //import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
 //import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
 import {GUI} from 'three/addons/libs/lil-gui.module.min.js';  
 import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


var count = 0;
var count1 = 0;
var posZ = -1;
var posX = 26;
let angle = 0;


class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minDif = minDif;
      this.minProp = minProp;
      this.maxProp = maxProp;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min;
    }
}

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      logarithmicDepthBuffer: true,
    });
    renderer.outputEncoding = THREE.sRGBEncoding;

function main() {

    // Cameras
    const fov = 130;
    const aspect = 3;
    const near = 0.01;
    const far = 170;
    const view1Elem = document.querySelector('#view1');
    const view2Elem = document.querySelector('#view2');

    const Camera = [];
    const Controls = [];
    for (let i = 0; i < 2; i++) {
        if (i==0) { 
             Camera[i] = new THREE.PerspectiveCamera(fov,aspect,near,far);
             Camera[i].position.set(0, 20, 45);
             Controls[i] = new OrbitControls(Camera[0], view1Elem);
        }
        else { 
             Camera[i] = new THREE.PerspectiveCamera(60,2,0.1,500);
             Camera[i].position.set(-10, 2, 45);
             Controls[i] = new OrbitControls(Camera[1], view2Elem);
        }
        Controls[i].target.set(0, 5, 0);
        Controls[i].update();
    }

    const cameraHelper = new THREE.CameraHelper(Camera[0]);
    Camera[1].lookAt(0, 5, 0);

    //scene
    const scene = new THREE.Scene();
    {
      scene.fog = new THREE.Fog(0xFFFFff, 40, 70);	
    }

    //plane
    {
      const planeSize = 100;
      const loader = new THREE.TextureLoader();
      const texture = loader.load('resources/images/sun.png');
      texture.encoding = THREE.sRGBEncoding;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.repeat.set(planeSize/2, planeSize/2);

      const planeG = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeG, planeMat);
      mesh.rotation.x = Math.PI * - 0.5;
      scene.add(mesh);
    }

    //Sky Box
    {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
              'resources/images/sky.png',
              () => {
                const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
                rt.fromEquirectangularTexture(renderer, texture);
                scene.background = rt.texture;
              });
    }

    // Cubes
    {
      const loader = new THREE.TextureLoader();
      const geometry0 = new THREE.BoxGeometry(5, 10, 5);
      const material0 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/building.png'),
      });
      
      // Buildings
      const cube0 = new THREE.Mesh(geometry0, material0);
      cube0.position.set(10, 5, 5); 
      scene.add(cube0);

      const cube1 = new THREE.Mesh(geometry0, material0);
      cube1.position.set(-34, 5, -5);
      scene.add(cube1);
      const cube2 = new THREE.Mesh(geometry0, material0);
      cube2.position.set(-34, 15, -5);
      scene.add(cube2);

      // 2nd farthest back tower
      const cube3 = new THREE.Mesh(geometry0, material0);
      cube3.position.set(32, 15, -5);
      scene.add(cube3);
      const cube4 = new THREE.Mesh(geometry0, material0);
      cube4.position.set(32, 5, -5);
      scene.add(cube4);

      // Farthest back tower
      const cube3_2 = new THREE.Mesh(geometry0, material0);
      cube3_2.position.set(34, 15, -20);
      scene.add(cube3_2);
      const cube3_3 = new THREE.Mesh(geometry0, material0);
      cube3_3.position.set(32, 5, -20);
      scene.add(cube3_3);
      const cube3_4 = new THREE.Mesh(geometry0, material0);
      cube3_4.position.set(32, 25, -20);
      scene.add(cube3_4);
      const cube3_5 = new THREE.Mesh(geometry0, material0);
      cube3_5.position.set(34, 35, -20);
      scene.add(cube3_5);

      const material11 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/gray.png'),
      });
      const cube5 = new THREE.Mesh(geometry0, material11);
      cube5.position.set(15, 5, -8);
      scene.add(cube5);  

      const loader3 = new THREE.TextureLoader();
      const geometry14 = new THREE.BoxGeometry(5, 3, 5);
      const material14 = new THREE.MeshPhongMaterial({
        map: loader3.load('resources/images/grassb.png'),
      });
      const cube6 = new THREE.Mesh(geometry14, material14);
      cube6.position.set(0, 1, 0);
      scene.add(cube6);

      const geometry15 = new THREE.BoxGeometry(5, 6, 5);
      const cube7 = new THREE.Mesh(geometry15, material14);
      cube7.position.set(10, 2, 25);
      scene.add(cube7);

      const geometry16 = new THREE.BoxGeometry(5, 15, 5);
      const cube8 = new THREE.Mesh(geometry16, material14);
      cube8.position.set(10, 4, 32);
      scene.add(cube8);

      // Roads
      const material_r = new THREE.MeshPhongMaterial({
        map: loader3.load('resources/images/gray.png'),
      });
      const geometry_r = new THREE.BoxGeometry(15, 1, 100);
      
      const cube_r1 = new THREE.Mesh(geometry_r, material_r);
      cube_r1.position.set(0, 0.5, 0);
      scene.add(cube_r1);

      const cube_r2 = new THREE.Mesh(geometry_r, material_r);
      cube_r2.position.set(21, 0.5, 0);
      scene.add(cube_r2);

      const cube_r3 = new THREE.Mesh(geometry_r, material_r);
      cube_r3.position.set(-22, 0.5, 0);
      scene.add(cube_r3);

      // Landscape
      const material_l1 = new THREE.MeshPhongMaterial({
        map: loader3.load('resources/images/grass.jpg'),
      });
      const geometry_l1 = new THREE.BoxGeometry(6, 1, 100);

      const cube_g1 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g1.position.set(10.5, 0.5, 0);
      scene.add(cube_g1);

      const cube_g2 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g2.position.set(31, 0.5, 0);
      scene.add(cube_g2);
      const cube_g3 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g3.position.set(37, 0.5, 0);
      scene.add(cube_g3);

      const cube_g4 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g4.position.set(-11, 0.5, 0);
      scene.add(cube_g4);

      const cube_g5 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g5.position.set(-33, 0.5, 0);
      scene.add(cube_g5);
      const cube_g6 = new THREE.Mesh(geometry_l1, material_l1);
      cube_g6.position.set(-39, 0.5, 0);
      scene.add(cube_g6);

    }

    // Sphere
      const sphereRadius = 8;
      const sphereGeo = new THREE.SphereGeometry(0.3*sphereRadius, 64, 8);

      const loader = new THREE.TextureLoader();
      const sphereMat = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/fire.jpg'),
      });
      const ball_mesh = new THREE.Mesh(sphereGeo, sphereMat);
      ball_mesh.position.set(26, 70, -20);
      scene.add(ball_mesh);

      const sphereGeo2 = new THREE.SphereGeometry(0.4*sphereRadius, 64, 8);
      const sphereMat2 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/flag.jpg'),
      });
      const ball2_mesh = new THREE.Mesh(sphereGeo2, sphereMat2);
      ball2_mesh.position.set(-34, 30, 10);
      scene.add(ball2_mesh);

      const ball3_mesh = new THREE.Mesh(sphereGeo, sphereMat);
      ball3_mesh.position.set(26, 70, -20);
      scene.add(ball3_mesh);


    // Cylinder
    {
      const radiusTop = 4; 
      const radiusBottom = 4;  
      const height = 8;  
      const radialSegments = 12;  

      const geometry1 = new THREE.CylinderGeometry(0.7*radiusTop, 0.7*radiusBottom, height, radialSegments);
      const geometry1_1 = new THREE.CylinderGeometry(0.5*radiusTop, 0.5*radiusBottom, 4*height, radialSegments);
      const geometry1_2 = new THREE.CylinderGeometry(0.5*radiusTop, 0.175*radiusBottom, height, radialSegments);
      const geometry2 = new THREE.CylinderGeometry(radiusTop-1.5, radiusBottom-1.5, 2*height, radialSegments);
      const geometry3 = new THREE.CylinderGeometry(radiusTop-3, radiusBottom-3, height, radialSegments);

      const material1 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/building.png'),
      });

      const material2 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/glass1.jpg'),
      });

      const material3 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/stone4.jpeg'),
      });

      const cylinder0 = new THREE.Mesh(geometry1, material1);
      cylinder0.position.set(10.4,4,15);
      scene.add(cylinder0);

      const cylinder1 = new THREE.Mesh(geometry1, material2);
      cylinder1.position.set(-10.6,4,20);
      scene.add(cylinder1)

      const cylinder2 = new THREE.Mesh(geometry1_1, material2);
      cylinder2.position.set(-34,4,10);
      scene.add(cylinder2);

      const cylinder2_1 = new THREE.Mesh(geometry1_2, material2);
      cylinder2_1.position.set(-34,24,10);
      scene.add(cylinder2_1);

      const cylinder3 = new THREE.Mesh(geometry1, material1);
      cylinder3.position.set(32,4,23);
      scene.add(cylinder3);

      const cylinder4 = new THREE.Mesh(geometry2, material1);
      cylinder4.position.set(32,12,23);
      scene.add(cylinder4);

      const cylinder5 = new THREE.Mesh(geometry3, material1);
      cylinder5.position.set(32,24,23);
      scene.add(cylinder5);

      const geometry4 = new THREE.CylinderGeometry(radiusTop-3, 1.2*radiusBottom, 3*height, radialSegments);
      const cylinder6 = new THREE.Mesh(geometry4, material3);
      cylinder6.position.set(32,14,13);
      scene.add(cylinder6);

      const geometry5 = new THREE.CylinderGeometry(0.8*radiusTop, radiusBottom-3, 2*height, radialSegments);
      const cylinder7 = new THREE.Mesh(geometry5, material1);
      cylinder7.position.set(32,24,13);
      scene.add(cylinder7);
    }

    // Octahedron
    const radius = 8;  
    const geometry4 = new THREE.OctahedronGeometry(0.5*radius);
    const material3 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/fire.png'),
    });

    const material1_1 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/gray.png'),
    });

    const material3_1 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/blocl.png'),
    });

    let x_1 = -34;
    let y_1 = 4;
    let z_1 = 30;
    const octahedron = new THREE.Mesh(geometry4, material1_1);
    octahedron.position.set(x_1,y_1,z_1);
    scene.add(octahedron);
    const octahedron1_1 = new THREE.Mesh(geometry4, material3);
    octahedron1_1.position.set(x_1,y_1+7,z_1);
    scene.add(octahedron1_1);
    const octahedron1_2 = new THREE.Mesh(geometry4, material1_1);
    octahedron1_2.position.set(x_1,y_1+14,z_1);
    scene.add(octahedron1_2);

    const geometry44 = new THREE.OctahedronGeometry(0.5*radius);
    const octahedron2 = new THREE.Mesh(geometry44, material3);
    octahedron2.position.set(35,45,2);
    scene.add(octahedron2);

    const octahedron3 = new THREE.Mesh(geometry4, material3);
    octahedron3.position.set(25,50,-20);
    scene.add(octahedron3);

    const octahedron4 = new THREE.Mesh(geometry4, material3);
    octahedron4.position.set(-22,50,-20);
    scene.add(octahedron4);

    const radius1 = 6;
    const geometry5 = new THREE.OctahedronGeometry(radius1);
    const material5 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/grassb.png'),
      });
    const octahedron5 = new THREE.Mesh(geometry5, material5);
    octahedron5.position.set(-10,-2,30);
    scene.add(octahedron5);

    //Cone
    {
      const height = 12;  

      const geometry3 = new THREE.ConeGeometry(5, 1.8*height, 16);
      const material3 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/building.png'),
      });
      const Cone1 = new THREE.Mesh(geometry3, material3);
      Cone1.position.set(-10.6,5.5,0);
      scene.add(Cone1);

      const material4 = new THREE.MeshPhongMaterial({
        map: loader.load('resources/images/grassb.png'),
      });
      const geometry3_5 = new THREE.ConeGeometry(5, 6*height, 16);

      // Cones in the back
      const Cone2 = new THREE.Mesh(geometry3_5, material4);
      Cone2.position.set(22,5.5,-15);
      scene.add(Cone2);
      const Cone3 = new THREE.Mesh(geometry3_5, material4);
      Cone3.position.set(-20,5.5,-15);
      scene.add(Cone3);
    }

    {
      scene.add(new THREE.HemisphereLight(0xB1E1FE, 0xB97A20, 1));
    }

    //GLB Figures ------------------------
    {
       var tree1;
       const glbLoader = new GLTFLoader();
       glbLoader.load(
	'resources/OBJ/Tree.glb',
	function (gltf1) {
                tree1 = gltf1.scene;
                tree1.position.set(10,0,20);
                tree1.scale.x = 0.5;
                tree1.scale.y = 0.8;
		scene.add( tree1 );
	} );
    }

    {
       var tree2;
       const glbLoader = new GLTFLoader();
       glbLoader.load(
	'resources/OBJ/Tree3.glb',
	function (gltf2) {
                tree2 = gltf2.scene;
                tree2.position.set(10,0,40);
                tree2.scale.x = 0.75;
                tree2.scale.y = 1.2;
		scene.add( tree2 );
	} );
    }

    {
       var skyscraper;
       const glbLoader = new GLTFLoader();
       glbLoader.load(
	'resources/OBJ/Skyscraper.glb',
	function (gltf3) {
                skyscraper = gltf3.scene;
                skyscraper.position.set(-35,0,22);
                skyscraper.scale.x = 0.75;
                skyscraper.scale.z = 0.75;
		scene.add( skyscraper );
	} );
    }

    {
       var bill;
       const glbLoader = new GLTFLoader();
       glbLoader.load(
	'resources/OBJ/Billboard.glb',
	function (gltf4) {
                bill = gltf4.scene;
                bill.position.set(32,0,29);
                bill.scale.x = 0.03;
                bill.scale.y = 0.05;
                bill.scale.z = 0.05;
		scene.add( bill );
	} );
    }

    //LIGHT Types ----------------------------------------
    {
      const light = new THREE.DirectionalLight(0xff0000, 1);
      light.position.set(5, 10, 12);
      scene.add(light);
      scene.add(light.target);
    }

    // Direct
    {
      const light = new THREE.DirectionalLight(0x00FF00, 1);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    // Spot
      const color = 0xffff00;
      const intensity = 4000;
      const light1 = new THREE.SpotLight(0xffff00, 4000);
      light1.position.set(4,10,8);
      light1.target.position.set(4,0,8);
      scene.add(light1);
      scene.add(light1.target);

    // Point
    {
      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(3, 43, -20);
      scene.add(light);

      const helper = new THREE.PointLightHelper(light);
      scene.add(helper);
    }



    // Multi-Rendering
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    const rtCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
    rtCamera.position.z = 2;

    const rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color(0xff0000);
    {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(-1, 2, 4);
      rtScene.add(light);
    }

    const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);

    function makeInstance(geometry, color, x, y, z, num) {
      const material = new THREE.MeshPhongMaterial({color});

      const cube = new THREE.Mesh(geometry, material);
      rtScene.add(cube);

      cube.position.x = x;
      if (num==2) { cube.position.y = y;}
      return cube;
    }

    const rtCubes = [
      makeInstance(geometry, 0xffff00, -1,0,0, 1),
      makeInstance(geometry, 0x0000ff, 0,0,0, 2),
      makeInstance(geometry, 0x00ff00, 1,0,0, 3)];

    const material = new THREE.MeshPhongMaterial({
      map: renderTarget.texture,
    });

    const geometry2 = new THREE.BoxGeometry(18, 35, 8);
    const cube = new THREE.Mesh(geometry2, material);
    cube.position.set(0,20,-12);
    scene.add(cube);

    const gui = new GUI();
    gui.add(Camera[0], 'fov', 1, 180); 
    const minMaxGUIHelper = new MinMaxGUIHelper(Camera[0], 'near', 'far', 0.1);
    gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');


    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render(time) {
      time *= 0.0005;
       
      ball2_mesh.rotation.y = time;

      // remove this section to stop rotation of the 2 spheres
      count +=1;
      if (count == 8) { 
             angle += 0.25;
             ball_mesh.position.z = -30 + Math.sin(angle) * 20;
             ball_mesh.position.x = Math.cos(angle) * 40;

             ball3_mesh.position.z = ball_mesh.position.z;
             ball3_mesh.position.y = 60;
             ball3_mesh.position.x = -ball_mesh.position.x;
             count = 0;    

             light1.target.position.set(ball3_mesh.position.x, 0, 20+ball3_mesh.position.z);
      }         

      resizeRendererToDisplaySize(renderer);
      renderer.setScissorTest(true);

      rtCubes.forEach((cube, ndx) => {
        const rot = 5 * time * (1 + ndx*0.1);
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.setRenderTarget(renderTarget);
      renderer.render(rtScene, rtCamera);
      renderer.setRenderTarget(null);

      resizeRendererToDisplaySize(renderer);
      // render original view
      {
        const aspect = setScissorForElement(view1Elem);
        Camera[0].aspect = aspect;
        Camera[0].updateProjectionMatrix();

        cameraHelper.update();
        cameraHelper.visible = false;
        renderer.render(scene, Camera[0]);
      }

      // 2nd camera
      {
        const aspect = setScissorForElement(view2Elem);
        Camera[1].aspect = aspect;
        Camera[1].updateProjectionMatrix();
        cameraHelper.visible = true;
        renderer.render(scene, Camera[1]);
      }
      requestAnimationFrame(render);
    } 
    requestAnimationFrame(render);
  }


  function setScissorForElement(elem) {
      const canvasRect = canvas.getBoundingClientRect();
      const elemRect = elem.getBoundingClientRect();

      // canvas relative rectangle
      const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
      const top = Math.max(0, elemRect.top - canvasRect.top);
      const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
      const left = Math.max(0, elemRect.left - canvasRect.left);
      const width = Math.min(canvasRect.width, right - left);
      const height = Math.min(canvasRect.height, bottom - top);

      // scissor to render part of the canvas
      const positiveYUpBottom = canvasRect.height - bottom;
      renderer.setScissor(left, positiveYUpBottom, width, height);
      renderer.setViewport(left, positiveYUpBottom, width, height);

      return width / height;
  }

  main();