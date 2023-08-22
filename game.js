let scene, camera, renderer, controls, raycaster, mouse, INTERSECTED;
const cubes = [];

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(25, 25, 50);
    camera.lookAt(25, 25, 25);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    window.addEventListener('click', onDocumentMouseClick, false);
}

function onDocumentMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Check if a cube is clicked
        const clickedObject = intersects[0].object;
        if (cubes.includes(clickedObject)) {
            scene.remove(clickedObject);
            const index = cubes.indexOf(clickedObject);
            cubes.splice(index, 1);
        } else {
            const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
            const cubeMat = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(cubeGeo, cubeMat);
            cube.position.copy(intersects[0].point).add(intersects[0].face.normal);
            cube.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
            scene.add(cube);
            cubes.push(cube);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
