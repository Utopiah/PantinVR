
/* ==== ==== ==== ==== ==== = */
/* ==== GLOBAL VARIABLES ==== */
/* ==== ==== ==== ==== ==== = */

// ThreeJS
var renderer, scene, camera;
// VR stuff
var controls, effect, manager;

/*
// Debug Interface
var mydebug = true;
var params = { }
var FizzyText = function() {
    this.message = 'Menu to test values faster';
};
var text = new FizzyText();
var gui = new dat.GUI();
gui.add(text, 'message');
*/

// === Pantin VR ===
var player = [];
var path = [];
var lap = 0;

/* ==== ==== ==== ====  */
/* ==== INIT SETUP ==== */
/* ==== ==== ==== ====  */

function init() {
    initThreeJS();
    camera.position.z = 1;
    initVR();

    addSkyBox();

    // === Pantin VR ===

    // Path Initialisation to a Regular Pentagon
    // Each elemnt of the path array is a node
    // Each consecutive couple of nodes defines a segment
    path.push( {position: {x: 0, y:-1, z:0}, action: action_countLap});
    path.push( {position: {x:-1, y: 0, z:0}});
    path.push( {position: {x:-1, y: 1, z:0}});
    path.push( {position: {x: 1, y: 1, z:0}, action: action_moodChecking});
    path.push( {position: {x: 1, y: 0, z:0}});

    // Visual manifestation of the path
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var lineGeometry = new THREE.Geometry();
    for(var i = 0; i < path.length -1; i++) {
        lineGeometry.vertices.push( path[i].position );
    }
    lineGeometry.vertices.push( path[0].position );
    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );

    // Render first transition screen:
    var screenMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    var radius = 0.1;
    var segments = 12;
    var screenGeometry = new THREE.CircleGeometry( radius, segments );
    var screenT = new THREE.Mesh( screenGeometry, screenMaterial );
    //rotate....

    console.log(screenT.position);
    screenT.position.set( path[0].position.x, path[0].position.y, path[0].position.z );
    screenT.rotation.y = 1.5;
    console.log(path[2].position);
    console.log(screenT.position);
    
    scene.add( screenT );


    // Player initialisation
    player.id = 0;
    player.position = path[0].position;
    player.lookAt = path[1].position - path[0].position;
    player.speed = 0;
    player.acceleration = 0;
    player.currentSegment = 0; // Segment I means between node I and node I+1

    // Playground initialisation
    // loading pantin.stl
    addPantinSTL();
}


/* ==== ==== ==== ==== == */
/* ==== ANIMATE LOOP ==== */
/* ==== ==== ==== ==== == */

function animate() {

    // Update VR headset position and apply to camera.
    controls.update();

    // === Pantin VR ===
    var pastSegment = player.currentSegment;
    updatePlayerPosition();

    if(pastSegment != player.currentSegment) {
        // Player just crossed a new node. Maybe there is an action to trigger ?
        var crossedNode = Math.max(pastSegment, player.currentSegment);
        if( path[crossedNode].hasOwnProperty('action') ) {
            path[crossedNode].action();
        }
    }

    // === ====== ===

    // Render the scene through the manager.
    manager.render(scene, camera);
    // Kick off next animate call when requested
    requestAnimationFrame(animate);

}

/* ==== ==== ==== === */
/* ==== KICK OFF ==== */
/* ==== ==== ==== === */

init();
animate();

/* ==== ==== ==== ==== */
/* ==== PANTIN VR ==== */
/* ==== ==== ==== ==== */

function updatePlayerPosition() {

    // Move within constrains

    // If changing node, then player.hasActed = false;

}


// ACTION: Counting number of laps
function action_countLap() {
    lap++;
    
    console.log("lap:", lap);
    // Visual feedback
    
    var geometry = new THREE.SphereGeometry(1, 12, 8);
    var newLapObject = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.5, wireframe: true}));

    displayInFrontOfPlayer(newLapObject,5);
}

// ACTION: checking mood, killer7-like decision
function action_moodChecking() {
    // QUESTION: How do you feel today ?

    // Visual feedback
    // ...

    // ANSWERS: Good / Not Good.
    // Impact average speed of user.

    // Visual feedback
    // ...
}

//display a 3D object in front of the user and remove it after X seconds
function displayInFrontOfPlayer(objectToDisplay, timeDisplayed) {
    objectToDisplay.position = player.position; //+ player.lookingAt + distanceExpected;
    objectToDisplay.position.setZ(-5);
    camera.add(objectToDisplay);
    window.setTimeout(function(){
        camera.remove(objectToDisplay);
    }, timeDisplayed*1000);
}

/* ==== ==== ==== ==== ==== */
/* ==== EVENT HANDLING ==== */
/* ==== ==== ==== ==== ==== */

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

// Gaze interaction
// ...

/* ==== ==== ==== ==== === */
/* ==== INIT SHORTCUT ==== */
/* ==== ==== ==== ==== === */

function initThreeJS() {

    //Setup three.js WebGL renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append the canvas element created by the renderer to document body element.
    document.body.appendChild(renderer.domElement);

    // Create a three.js scene.
    scene = new THREE.Scene();

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
    //create gaze interaction manager
    scene.add(camera);
}


function initVR() {

    // Apply VR headset positional data to camera.
    controls = new THREE.VRControls(camera);

    // Apply VR stereo rendering to renderer.
    effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    // Create a VR manager helper to enter and exit VR mode.
    manager = new WebVRManager(renderer, effect, {
        hideButton: false
    });

}

function addSkyBox() {

    // Also add a repeating grid as a skybox.
    var boxWidth = 10;
    var texture = THREE.ImageUtils.loadTexture( 'assets/textures/box.png');
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

}

function addPantinSTL() {
	var preDesignedMeshLoader=new THREE.STLLoader();
	preDesignedMeshLoader.addEventListener('load', function (event){
		var geometry=event.content;
		var material=new THREE.MeshBasicMaterial({ color: 0xfdd017, wireframe: true });
		var mesh=new THREE.Mesh(geometry, material);
		scene.add(mesh);});
	// STL file to be loaded
	preDesignedMeshLoader.load('assets/pantin.stl');
}
