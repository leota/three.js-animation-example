import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Math, HemisphereLight } from 'three';
import { Pyramid } from './pyramid';
import { TranslucentMaterial } from './materials';

export class App {
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });

    private pyramid: Pyramid;

    constructor() {
        this.pyramid = new Pyramid(20, 25, new TranslucentMaterial());
        this.pyramid.rotateY(Math.degToRad(45));
        this.scene.add(this.pyramid);
        
        this.camera.position.set(0, 0, 200);
        this.camera.lookAt(new Vector3(0, 0, 0));
        
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(2,16,76)'));

        const light = new HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(light);
        
        this.render();
    }
    
    private adjustCanvasSize(): void {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }
    
    private render(): void {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
        
        this.adjustCanvasSize();
        this.pyramid.rotateZ(0.01);
        this.pyramid.rotateY(0.03);
    }
}