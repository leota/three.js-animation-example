import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, HemisphereLight, BackSide, Mesh, Clock } from 'three';
import { Pyramid } from './pyramid';
import { TranslucentMaterial } from './materials';

const PYRAMID_ROT_Y = 0.04;
const PYRAMID_ROT_Z = 0.02;

export class App {
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });

    private pyramid: Pyramid;
    private clock: Clock;

    constructor() {
        this.clock = new Clock();
        this.camera.position.set(0, 0, 200);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(2,16,76)'));

        // 3D objects
        this.pyramid = this.createPyramid();
        this.scene.add(this.pyramid);

        // lights
        const light = new HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(light);

        this.render();
    }

    private createPyramid(): Mesh {
        const innreMat = new TranslucentMaterial();
        innreMat.side = BackSide;
        const innrePyramid = new Pyramid(18, 23, innreMat);

        const outerPyramid = new Pyramid(20, 25, new TranslucentMaterial());
        outerPyramid.add(innrePyramid);

        return outerPyramid;
    }

    private adjustCanvasSize(): void {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private playAnimations(): void {
        const time = this.clock.getElapsedTime();
        if (time < 5) {
            this.pyramid.rotateY(PYRAMID_ROT_Y);
            this.pyramid.rotateZ(PYRAMID_ROT_Z);
        } else if (time > 5 && time <= 10) {
            this.pyramid.rotateY(PYRAMID_ROT_Y / (time / 4));
            this.pyramid.rotateZ(PYRAMID_ROT_Z / (time / 4));
            this.camera.position.x -= 0.05;
            this.camera.position.y -= 0.01;
            this.camera.position.z -= 0.55;
        } else {
            this.pyramid.rotateY(PYRAMID_ROT_Y / (time / 3));
            this.pyramid.rotateZ(PYRAMID_ROT_Z / (time / 3));
        }
    }

    private render(): void {
        this.playAnimations();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());

        this.adjustCanvasSize();
    }
}