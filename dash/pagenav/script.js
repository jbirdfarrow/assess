import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

(function() {

	const canvas = document.querySelector('#stage');
	
	// static
	const fov = 45;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 10508790.505495341;
	const planeSize = 40;
	const repeats = planeSize / 2;
	let gltfScene;
	const stageAnimationDuration = 1;
	
	// Three.js: default
	const renderer = new THREE.WebGLRenderer({canvas});		
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// Three.js: lights  		
	const hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);
	const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
	
	// Three.js: texture	/mesh	
	const loader = new THREE.TextureLoader();
	const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');		
	const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
	const planeMat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, });
	const mesh = new THREE.Mesh(planeGeo, planeMat);		

	// Three.js: aniamtions
	let mixer;
	let clock = new THREE.Clock();
	
	
	// Three.js: gltf
	const gltfLoader = new GLTFLoader();
	
	const controls = new OrbitControls(camera, canvas);
	//controls.target.set(200, -684, -2290);
	controls.target.set(0,10,20);
	controls.update();

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.magFilter = THREE.NearestFilter;
	texture.repeat.set(repeats, repeats);
	mesh.rotation.x = Math.PI * -.5;
	scene.add(mesh);
	
	scene.background = new THREE.Color('#DAA520');
	//camera.position.set(200, -684, -2290);
	camera.position.set(0, 10, 20);
	camera.lookAt(scene.position);
	camera.zooom = 5;
	
	scene.add(hemisphereLight);
	directionalLight.position.set(5, 10, 2);
	scene.add(directionalLight);
	scene.add(directionalLight.target);

	window.camera = camera;
	window.scene = scene;
	
	
	let stages = [{
		x: -822,
		y: -258,
		z: -8114,
		fov: 67,
		zoom: 6,
	},
	{
		x: 10000,
		y: -787,
		z: 10000,
		fov: 104,
		zoom: 16,
	},
	{
		x: 2226,
		y: 5957,
		z: -4570,
		fov: 153,
		zoom: 56,
	},
	{
		x: 3547,
		y: 2511,
		z: 2229,
		fov: 145,
		zoom: 60,
	},
	{
		x: 10000,
		y: 743,
		z: -4452,
		fov: 164,
		zoom: 60,
	},
	{
		x: -8865,
		y: 3150,
		z: 735,
		fov: 150,
		zoom: 60,
	},
	{
		x: 10000,
		y: 743,
		z: -4452,
		fov: 119,
		zoom: 60,
	}];
	

  	function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
  		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  		const halfFovY = THREE.Math.degToRad(camera.fov * .5);
  		const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
  		// compute a unit vector that points in the direction the camera is now
  		// in the xz plane from the center of the box
  		const direction = (new THREE.Vector3())
  			.subVectors(camera.position, boxCenter)
  			.multiply(new THREE.Vector3(1, 0, 1))
  			.normalize();

  		// move the camera to a position distance units way from the center
  		// in whatever direction the camera was from the center already
  		camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

  		// pick some near and far values for the frustum that
  		// will contain the box.
  		camera.near = boxSize / 100;
  		camera.far = boxSize * 100;

  		camera.updateProjectionMatrix();

  		// point the camera to look at the center of the box
  		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  	}

  	function resizeRendererToDisplaySize(renderer) {
  		const canvas = renderer.domElement;
  		const width = canvas.clientWidth;
  		const height = canvas.clientHeight;
  		const needResize = canvas.width !== width || canvas.height !== height;
  		if (needResize) {
  			renderer.setSize(width, height, false);
  		}
  		return needResize;
  	}

  	function render() {
  		if (resizeRendererToDisplaySize(renderer)) {
  			const canvas = renderer.domElement;
  			camera.aspect = canvas.clientWidth / canvas.clientHeight;
  			camera.updateProjectionMatrix();
  		}

  		renderer.render(scene, camera);
		if (mixer) { mixer.update( clock.getDelta() ) }
  		requestAnimationFrame(render);
		
	}
	
	function animate(stage) {
		let current = stages[stage];
		if (current) {
			let started = window.performance.now();
			gsap.to(camera.position, {
				x: current.x, 
				y: current.y, 
				z: current.z, 
				duration: stageAnimationDuration, 
				onUpdate: function() {
					camera.lookAt(scene.position); 
				},
				onComplete: function() {
					console.log("finished", window.performance.now() - started)
				}
			});
			
			gsap.to(camera, {
					fov: current.fov, 
					zoom: current.zoom, 				
					duration: stageAnimationDuration, 
					onUpdate: function() { 
						camera.updateProjectionMatrix(); 
					}
			});
					
			if (stages[stage]) {
				setTimeout(animate, stageAnimationDuration*1000);
			}
		}
	}
		
		
	//gltfLoader.load('https://s3-us-west-1.amazonaws.com/cdn.linkcreative.com/scene.gltf', (gltf) => {	
	gltfLoader.load('https://s3-us-west-1.amazonaws.com/cdn.linkcreative.com/seed/Seed.gltf', (gltf) => {
		gltfScene = gltf.scene;
		scene.add(gltfScene[0]);
		const box = new THREE.Box3().setFromObject(gltfScene);
		const boxSize = box.getSize(new THREE.Vector3()).length();
		const boxCenter = box.getCenter(new THREE.Vector3());
		frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
		mixer = new THREE.AnimationMixer(gltfScene);
		//gltf.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
		//scene.add(gltf.scene);	
		console.log(gltf)
		//animate();			
	});
	
		

	// kick off
	requestAnimationFrame(render);

	

	
	let myFullpage;
	let Nav;
	let NavLis;
	let threeD = document.querySelector('#three-d');
	let fullPage = document.querySelector('#fullpage');
	let panels = Array.from(fullPage.children);
	let currentPage = fullPage.children[0];
	let ambientVideo = document.querySelector('video');
	let threeDImg = threeD.querySelector('img');
	let randomHeight = () => (Math.random() * window.innerHeight/3 * (Math.round(Math.random())===1?1:-1));
	let randomWidth = () => (Math.random() * window.innerWidth/3 * (Math.round(Math.random())===1?1:-1));
	let panelAction = function(step) {
		//threeD.style.transform = `translate(${randomWidth()}px, ${randomHeight()}px)`;
		
		if (step === panels.length-1) {
			ambientVideo.play();
		} else if (!ambientVideo.paused) {
			ambientVideo.pause();
		}
		
		if (step !== 0 && !panels.length-1) {
			//threeDImg.style.transform = `scale(${(Math.random()*1.5) + .5})`;
			if (stages[step-1]) { animate(step-1); }
		}
	};
	let updateNav = function() {
		if (NavLis) {
		    let activeNav = Nav.querySelector('a.active');
		    let prev = activeNav.parentNode.previousElementSibling;
		    let next = activeNav.parentNode.nextElementSibling;
		        
		    NavLis.forEach((li) => li.classList.remove('active', 'active-adjacent'));
		    activeNav.parentNode.classList.add('active');
		      
		    if (prev) { prev.classList.add('active-adjacent'); }
		    if (next) {next.classList.add('active-adjacent'); }
	    }
	}

	ambientVideo.pause();
	
    myFullpage = new fullpage(fullPage, {
        //anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage', 'eigthPage', 'ninthPage'],
        navigation: true,
        navigationPosition: 'right',
        //navigationTooltips: ['First page', 'Second page', 'Third page', 'Fourth page', 'Fifth page', 'Sixth page', 'Seventh page', 'Eigth page', 'Ninth and last page'],
        touchSensitivity: 10,
        scrollingSpeed: 1000,
        afterLoad: function(origin, dest, dir) {
	        dest.item.classList.add('active');
	        updateNav();
        },
        onLeave: function(origin, dest, dir){
	        panelAction(panels.indexOf(dest.item));
	        origin.item.classList.add('active');
        },
        afterRender: function() {
			Nav = document.querySelector('#fp-nav');
			NavLis = Array.from(document.querySelectorAll('li'));
			updateNav();
        }
    });
    
	
	    
    requestAnimationFrame(() => document.body.classList.add('loaded'));
})();