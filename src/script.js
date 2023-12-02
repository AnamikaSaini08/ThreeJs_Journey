import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
scene.add(camera)

/**
 * Camera moving
 */
const cursor = {
    x: 0,
    y:0
}

window.addEventListener('mousemove',(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
})

const animation =()=>{
    camera.position.x = (Math.sin(cursor.x * Math.PI * 2)) * 3;
    camera.position.z = (Math.cos(cursor.x * Math.PI * 2)) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(mesh.position)

    window.requestAnimationFrame(animation);
    controls.update();
    renderer.render(scene, camera)
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
animation();