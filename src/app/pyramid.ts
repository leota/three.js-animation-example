import { Mesh, ConeBufferGeometry, Material } from 'three';

export class Pyramid extends Mesh {
    constructor(radius: number, height: number, material: Material) {
        super();
        this.geometry = new ConeBufferGeometry(radius, height, 4, 1);
        this.material = material;
    }
}