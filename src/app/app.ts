import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, MeshBasicMaterial } from 'three';
import { Pyramid } from './pyramid';

export class App {
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });

    private pyramid: Pyramid;

    constructor() {
        this.pyramid = new Pyramid(5, 20, new MeshBasicMaterial({ color: 0xffff00 }));
        this.scene.add(this.pyramid);

        this.camera.position.set(200, 200, 200);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(0,0,0)'));

        this.render();
    }

    private adjustCanvasSize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());

        this.adjustCanvasSize();
        this.pyramid.rotateY(0.03);
    }
}