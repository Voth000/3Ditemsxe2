import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

import {GLTFLoader} from "./GLTFLoader.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

import {DragControls} from "./DragControls.js";



const container = document.getElementById('model');
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
let root1;
const s1 = $('#s1');
const s2 = $('#s2');
const s3 = $('#s3');
const s4 = $('#s4');





///glb2

const loader1 = new GLTFLoader()
loader1.load('./12.glb', function(glb){
  console.log(glb);

 
root1 = glb.scene;
root1.scale.set(5, 5, 5);
root1.position.y= -6.5;
root1.position.z= 0;
root1.position.x= -0.5;
root1.rotation.y = -0.5;
root1.name = "root1";
root1.alpha = true;
root1.metalness = 0.1;
root1.visible = true;

root1.traverse(function(node1) {
    if(node1.isMesh)
    node1.castShadow = false;
    node1.receiveShadow = false;
    node1.opacity = 0.3;
    
});
   scene.add(root1);
}, function(xhr){
   console.log(xhr.loaded/xhr.total * 100 + "% loaded")
}, function(error){
   console.log("an error has occurred")
})


//light
const light = new THREE.AmbientLight(0xFFFFFF, 2)
light.position.set(12,20,5)

scene.add(light)

const al = new THREE.AmbientLight(0xFFFFFF, 0.4)
al.position.set(-20,-20,-5)

scene.add( al )


//Create a plane that receives shadows (but does not cast them)
//const planeGeometry = new THREE.PlaneGeometry( 40, 30, 32, 32 );
//const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } )
//const plane = new THREE.Mesh( planeGeometry, planeMaterial );
//plane.receiveShadow = true;
//plane.position.y = -3;
//plane.rotateX( - Math.PI / 2);
//scene.add( plane );
///grid

const grid = new THREE.GridHelper(0,0);
scene.add( grid );
//Boiler 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(0,5,12)
camera.lookAt(scene.position)
scene.add(camera)



const renderer = new THREE.WebGL1Renderer({
    antialias: true,
    canvas: canvas,
    alpha: true
})

///plane



///orbit
let controls;

controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.enableZoom = false;





let radius = Math.min(window.innerWidth, window.innerHeight/1.25) * 0.015; // Example: 10% of the smaller viewport dimension
const segments = 64;
const points = [];

// Function to update circle points based on the current radius
function updateCirclePoints() {
    points.length = 0; // Clear previous points
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;
        points.push(new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0));
    }
    geometry.setFromPoints(points);
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0x292929 });

// Create the final object to add to the scene
const circle = new THREE.LineLoop(geometry, material);

// Apply transformations (rotate and scale)
circle.rotation.x = Math.PI / -2; // Rotate 45 degrees around the X axis
circle.rotation.y = Math.PI / -8; // Rotate 45 degrees around the Y axis
circle.scale.set(0.5, 0.5, 0.5); // Scale the circle by 1.5 in all directions
circle.position.y= 1;
scene.add(circle);

// Create the final object to add to the scene
const circle1 = new THREE.LineLoop(geometry, material);

// Apply transformations (rotate and scale)
circle1.rotation.x = Math.PI / -2; // Rotate 45 degrees around the X axis
circle1.rotation.y = Math.PI / -8; // Rotate 45 degrees around the Y axis
circle1.scale.set(0.5, 0.5, 0.5); // Scale the circle by 1.5 in all directions
circle1.position.y= 1;
scene.add(circle1);

let activeIndex = 0;
//responsive
// Function to position buttons based on circle points
function positionButtons() {
    const buttons = document.querySelectorAll('.main1');
    const boxs = document.querySelectorAll('.main2');

    const buttonPoints = [34, 48, 2, 18]; // Indices of circle points to use for buttons

    buttonPoints.forEach((pointIndex, i) => {
        const vector = points[pointIndex].clone();
        vector.applyMatrix4(circle.matrixWorld); // Apply the circle's transformations
        vector.project(camera); // Project the vector to screen space

        const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
        const y = (vector.y * -0.5 + 0.5) * container.clientHeight;

        const x1 = (vector.x * 0.5 + 0.5) * container.clientWidth - 40;
        const y1 = (vector.y * -0.5 + 0.5) * container.clientHeight + 20;

        const button = buttons[i];
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        const box = boxs[i];
        box.style.left = `${x1}px`;
        box.style.top = `${y1}px`;
    });
    
}

const buttonPoints = [40
    ];

// Function to position the arrow
function positionArrow() {
    const arrow = document.querySelector('.arrow');
    const pointIndex = buttonPoints[activeIndex];

    const vector = points[pointIndex].clone();
    vector.applyMatrix4(circle1.matrixWorld);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * container.clientWidth ; // Add 2px offset if needed
    const y = (vector.y * -0.5 + 0.5) * container.clientHeight ; // Add 2px offset if needed

    arrow.style.left = `${x}px`;
    arrow.style.top = `${y}px`;
}


// Initial positioning





let targetRotationY = -0.5;
const rotationSpeed = 0.01; 
let wheelEventTriggered = false;
// Adjust this value for faster/slower interpolation

function onMouseWheel(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    targetRotationY += delta * 1.5; // Update target rotation
    activeIndex = (activeIndex + delta + buttonPoints.length) % buttonPoints.length;
    wheelEventTriggered = true;
}

renderer.domElement.addEventListener('wheel', onMouseWheel);

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.physicallyCorrectLights = true;
renderer.gammaOutput =  true;
renderer.gammaFactor =  1;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4))
renderer.shadowMap.enabled = true
renderer.render(scene,camera)
renderer.setClearColor( 0xffffff, 0)
document.getElementById('model').appendChild( renderer.domElement );





window.addEventListener('resize', () => {
        // Adjust circle radius based on viewport size
        radius = Math.min(window.innerWidth/1.25, window.innerHeight/1.25) * 0.015;
        updateCirclePoints(); // Recalculate circle points
    
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
     updateCirclePoints();
    positionButtons();
    positionArrow(); 
   
    // renderer.render(scene, camera); // -> Not needed since it is called in animate()
});

updateCirclePoints();
positionButtons();
positionArrow(); 
///
s2.hover(
    () => {
    if(root1)
        gsap.to(root1.rotation, { y: 0.75, duration: 1.5 });
    wheelEventTriggered = false;
},
() => { }
);


s1.hover(() => {
    gsap.to
    if(root1)
        gsap.to(root1.rotation, { y: -0.5, duration: 1.5 });
    wheelEventTriggered = false;
},
() => { }
);

s3.hover(
    () => {
    if(root1)
        gsap.to(root1.rotation, { y: 2.5, duration: 1.5 });
    wheelEventTriggered = false;
},
() => { }
);

s4.hover(
    () => {
    if(root1)
        gsap.to(root1.rotation, { y: 3.5, duration: 1.5 });
    wheelEventTriggered = false;
},
() => { }
);


function animate(){
    circle1.rotation.z += 0.007;
requestAnimationFrame(animate);
if (root1) {
    // Only interpolate rotation if the wheel event has been triggered
    if (wheelEventTriggered) {
        root1.rotation.y += (targetRotationY - root1.rotation.y) * rotationSpeed;
    }
}
positionButtons();
positionArrow(); 
controls.update();
renderer.render(scene,camera)
}
animate()






