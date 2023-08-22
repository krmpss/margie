const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

const light = new THREE.AmbientLight(0x888888);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1.5, 1);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
let cubes = [];

camera.position.z = 60;
camera.position.y = 30;

// Grid helper for better orientation
const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

document.addEventListener('click', function(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    vector.unproject(camera);

    const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        // Remove the cube
        scene.remove(intersects[0].object);
        cubes = cubes.filter(cube => cube !== intersects[0].object);
    } else {
        // Add a cube
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z));
        cubes.push(cube);
        scene.add(cube);
    }
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
