const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Camera position
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

let cubes = [];

document.addEventListener('click', function(event) {
    // Get clicked position in the 3D space
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
        cube.position.set(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z));
        cubes.push(cube);
        scene.add(cube);
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
