var mydebug = true;

var params = {
}

var FizzyText = function() {
    this.message = 'Menu to test values faster';
};

var text = new FizzyText();
var gui = new dat.GUI();
gui.add(text, 'message');

//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
//create gaze interaction manager
scene.add(camera);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var manager = new WebVRManager(renderer, effect, {
    hideButton: false
});

    
// Also add a repeating grid as a skybox.
var boxWidth = 10;
var texture = THREE.ImageUtils.loadTexture( 'textures/box.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(boxWidth, boxWidth);

var geometry = new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth);
var material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x333333,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.7
});

var skybox = new THREE.Mesh(geometry, material);
scene.add(skybox);

// Request animation frame loop function
function animate() {
    // Apply rotation to cube mesh

    // Update VR headset position and apply to camera.
    controls.update();

    // Render the scene through the manager.
    manager.render(scene, camera);

    requestAnimationFrame(animate);
}


// Kick off animation loop
animate();

function onKey(event) {
    if (event.keyCode == 90) { // z to reset the sensors
        controls.resetSensor();
	if (mydebug) console.log("sensor resetted");
    }
    if (event.keyCode == 13) { // enter to start
    }
};

function onClick(event) {
};

window.addEventListener('onclick', onClick, true);
window.addEventListener('click', onClick, true);
// does not work on mobile

window.addEventListener('keydown', onKey, true);
// Handle window resizes
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}
