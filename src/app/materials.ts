import { CubeTextureLoader, MeshPhongMaterial, MeshPhongMaterialParameters } from "three";

const loader = new CubeTextureLoader();
loader.setPath('src/assets/');

const cubeMap = loader.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
]);

const MATERIAL_DEFAULT_PARAMS: MeshPhongMaterialParameters = {
    transparent: true,
    opacity: 0.8,
    color: 0xff0000,
    emissive: 0xb74c4c,
    emissiveIntensity: 1,
    specular: 0xfff,
    shininess: 1,
    reflectivity: 1,
    envMap: cubeMap,
}

export class TranslucentMaterial extends MeshPhongMaterial {
    constructor() {
        super(MATERIAL_DEFAULT_PARAMS);
    }
}