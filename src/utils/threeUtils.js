// import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export function loadModelGLTF(filePath) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      filePath,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
}

export function loadModelFBX(filePath) {
    return new Promise((resolve, reject) => {
      const loader = new FBXLoader();    
  
      loader.load(
        filePath,
        (fbx) => {
          resolve(fbx);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }

  export function setAmbientLightColor(light, color) {
    if (light && light.isAmbientLight) {
      light.color.set(color);
    }
  }
  
  export function setAmbientLightIntensity(light, intensity) {
    if (light && light.isAmbientLight) {
      light.intensity = intensity;
    }
  }
  
  export function toggleAmbientLight(scene, light, enabled) {
    if (!light) return;
    if (enabled) {
      if (!scene.children.includes(light)) {
        scene.add(light);
      }
    } else {
      scene.remove(light);
    }
  }