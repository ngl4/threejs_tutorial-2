//1. create a scene object
var scene = new THREE.Scene();

//2. create a perspective camera
var camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near clipping plane
  1000 //far clipping plane
);

//3. push the camera back in z space to see things easier
camera.position.z = 15;

//4. creat a renderer
//renderer: handles the drawing of the objects in your scene
//that are visible to the camera
//antialias = true  ---> means to get smooth edges on the object
//setSize ---> of the draw area to full screen
//domElement ---> an html <canvas> element

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-image").appendChild(renderer.domElement);

//5. create a 3D object
//TorusKnotBufferGeometry
//(torus radius, tube radius, tube segments, tube segments, radial segments, radial segments)
var geometry = new THREE.TorusKnotBufferGeometry(4, 0.5, 60, 60, 13, 10);

//6. create a material
//MeshNormalMaterial ---> self-illuminated material
//var material = new THREE.MeshNormalMaterial();
//MeshStandardMaterial ---> Need light to see the material object
var material = new THREE.MeshStandardMaterial({ color: 0xee3333 });

//7. create an object Mesh to combine the geometry and material created above
var object = new THREE.Mesh(geometry, material);
object.castShadow = true;

//8. Add the object Mesh to the scene
scene.add(object);

//9. Render the scene
//Rendering is the function of drawing the scene data to
//the <canvas> element
//Uncomment the line 46 to see the object on the scene (without animation),
//but you dont have to do it, because Step 10 (with animation) has done this too.
//renderer.render(scene, camera);

//10. Render each 'requestAnimationFrame'
//'requestAnimationFrame' ---> bind the render function in a loop
//--->it will optimally run at 60 frames per seconds to ensure the browser is ready to render the next frame.
//Animate Object Rotation ---> Adding rotation inside the render loop
//so every frame you will see the update on the rotation
//In Three.js, these are radians not degrees
//radians = degrees x (Math.PI/ 180)
var animate = function() {
  requestAnimationFrame(animate);
  //the higher the number the faster it goes
  object.rotation.x += 0.01;
  object.rotation.y += 0.03;

  //update renderer to use shadowmap
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.render(scene, camera);
};
animate();

//11. Add Ambient Light
//---> casting a general light on the entire scene
//create an ambient light
//you will see dark red color of the geometric object
// var light = new THREE.AmbientLight( 0xffeecc, .4);
// scene.add(light);

//12. Add primary (spot) light
//---> classic theatrical lights used to light a character on stage
//---> they are directional and have a specific area of intensity
//create a SpotLight
var light = new THREE.SpotLight(0xffffff, 0.6);
scene.add(light);
light.position.set(3, 4, 15);

light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500;

//13. Add secondary (spot) light
//---> fill light to create more light and shadow effects
var light = new THREE.SpotLight(0xff0000, 0.4);
scene.add(light);
light.position.set(-5, 15, 5);

light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500;

//14. Create Ground Plane
//--->create a floor to help you to see the shadow of the object
//'PlaneBufferGeometry' --> you need to rotate the plane 90 degrees to the camera to lay flat
//then, you need to instruct it to 'receiveShadow'
var planeGeometry = new THREE.PlaneBufferGeometry(500, 500, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeaa33 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = (Math.PI / 180) * -90;
plane.position.y = -6;
plane.receiveShadow = true;
scene.add(plane);

//15. Create Back Wall
var planeGeometry = new THREE.PlaneBufferGeometry(500, 500, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeaa33 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.z = -50;
plane.receiveShadow = true;
scene.add(plane);

//16. Update Renderer to use 'shadowMap' --- Go to line 64
//17. Update object to cast shadow ---Go to line 39
//18. Update lights to cast shadows ---Go to line 88 and 100
