import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'

const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//the shoe
gltfLoader.load('Im done.gltf', (gltf) =>{
    gltf.scene.scale.set(5,5,5)
    gltf.scene.rotation.set(0,-2,0)
    
    
    scene.add(gltf.scene)

    let position = gltf.scene.position;
    let rotation = gltf.scene.rotation;

    // gui.add(position, 'x').min(0).max(9).name('translateX')
    // gui.add(position, 'y').min(0).max(9).name('translateY')
    // gui.add(position, 'z').min(0).max(9).name('translateZ')

    // gui.add(rotation, 'x').min(0).max(9).name('rotateX')
    // gui.add(rotation, 'y').min(0).max(9).name('rotateY')
    // gui.add(rotation, 'z').min(0).max(9).name('rotateZ')

    tl.to(rotation, {
        // z: -10,
        y: 10,
        // x: -5,
        duration: 30,
        repeat:-1,
        ease:"linear"})
    dat.GUI.toggleHide();
})

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 1
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -10
camera.position.y = 5
camera.position.z = 10
scene.add(camera)

let tl = gsap.timeline()



// Controls
// const controls = new OrbitControls(camera, canvas)
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = false
controls.enableZoom = true
controls.enablePan = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha: true 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    scene.rotation.x = 0.4 

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



// gsap animations
gsap.from(".element", {
    y:200,
    opacity: 0,
    duration: 1,
    stagger: 0.2
})

let detailsButton = document.querySelector('.details')
let theshoeContext = document.querySelector('.theshoe-context')
let btn = document.querySelector('.btn')

detailsButton.addEventListener('click', ()=>{
    console.log('i was clicked')
    theshoeContext.classList.toggle('show-context')


    // if (detailsButton.textContent = 'Read') {
    //     detailsButton.textContent = 'Close';
    //   }else if(detailsButton.textContent = 'Close') {
    //     detailsButton.textContent = 'Read'
    //   }

    if (btn.textContent == "Read"){
        btn.textContent = "Close";
      }else {
        btn.textContent = "Read";}
} )