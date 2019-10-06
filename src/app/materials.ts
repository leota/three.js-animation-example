import { MeshPhysicalMaterial, MeshPhysicalMaterialParameters } from "three";

const MATERIAL_DEFAULT_PARAMS: MeshPhysicalMaterialParameters = {
    transparent: true,
    opacity: 0.8,
    color: 0xff0000,
    emissive: 0xb74c4c,
    roughness: 0.2,
    metalness: 0.75,
    reflectivity: 0.35,
    clearcoat: 1,
    clearcoatRoughness: 0.45
}

export class TranslucentMaterial extends MeshPhysicalMaterial {
    constructor() {
        super(MATERIAL_DEFAULT_PARAMS);
    }
}