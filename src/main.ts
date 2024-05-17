
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;


    constructor() {

        this._scene = new THREE.Scene();
        this._scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 1;

        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );


        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.05;
        this._controls.minDistance = 0.550;
        this._controls.maxDistance = 2;


        /// Add your code here


        document.body.appendChild( this._renderer.domElement );
        this._renderer.setAnimationLoop( this._animate.bind(this) );
        window.addEventListener( 'resize', this._resize.bind(this) );

    }


    private _animate( time: number ) {

        this._controls.update();
        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}



new Engine();
