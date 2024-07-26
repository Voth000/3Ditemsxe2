import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

import {GLTFLoader} from "./GLTFLoader.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

import {DragControls} from "./DragControls.js";





const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()



//responsive



window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // renderer.render(scene, camera); // -> Not needed since it is called in animate()
});





///glb2

const loader1 = new GLTFLoader()
loader1.load('./3.glb', function(glb){
  console.log(glb);

 
const root1 = glb.scene;
root1.scale.set(2, 2, 2);
root1.position.y= -2;
root1.position.z= 3;
root1.name = "root1";
root1.alpha = true,
root1.visible = true;

root1.traverse(function(node1) {
    if(node1.isMesh)
    node1.material.metalness = 0.1;
   
    node1.castShadow = true;
    node1.receiveShadow = false;
    
});
   scene.add(root1);
}, function(xhr){
   console.log(xhr.loaded/xhr.total * 100 + "% loaded")
}, function(error){
   console.log("an error has occurred")
})



//light
const light = new THREE.AmbientLight(0xffffff, 0.7)
light.position.set(2,10,5)

scene.add(light)

const al = new THREE.AmbientLight(0xFF00FF, 0.4)
al.position.set(20,-10,-5)

scene.add( al )

const wl = new THREE.DirectionalLight(0xFFFF00, 0.4)
wl.position.set(8,3,8)
wl.castShadow = true
scene.add( wl )

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 40, 30, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.position.y = -3;
plane.rotateX( - Math.PI / 2);
scene.add( plane );
///grid

const grid = new THREE.GridHelper(0,0);
scene.add( grid );
//Boiler 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(2,8,9)
camera.lookAt(scene.position)
scene.add(camera)



const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

///plane



///orbit

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;



///

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.gammaOutput = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4))
renderer.shadowMap.enabled = true
renderer.render(scene,camera)
renderer.setClearColor( 0xffffff, 0)
document.body.appendChild( renderer.domElement );

function animate(){
    controls.update();
requestAnimationFrame(animate)
renderer.render(scene,camera)
}
animate()






