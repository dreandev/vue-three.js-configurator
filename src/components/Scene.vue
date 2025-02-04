<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { loadModelGLTF } from "@/utils/threeUtils";
import ducky from "@/assets/models/ducky.glb";
import cat from "@/assets/models/concrete_cat.glb";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster, Vector2 } from "three";

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      model: null,
      controls: null,
      raycaster: new Raycaster(),
      mouse: new Vector2(),
      dragging: false,
      lastMousePosition: null,
      ambientLight: null,
      directionalLight: null,
    };
  },
  mounted() {
    this.initScene();
    this.loadModel();

    const container = this.$refs.sceneContainer;
    window.addEventListener("resize", () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  },
  methods: {
    initScene() {
      const container = this.$refs.sceneContainer;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x3a3b3c);

      this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, -10, 250);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.shadowMap.enabled = true;
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabledDamping = true;
      this.controls.dampingFactor = 0.5;
      this.controls.screenSpacePanning = false;

      container.addEventListener("mousedown", this.onMouseDown);
      container.addEventListener("mousemove", this.onMouseMove);
      container.addEventListener("mouseup", this.onMouseUp);

      window.addEventListener("resize", () => {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      });

      this.ambientLight = new THREE.AmbientLight(0xff00ac, 1);
      this.scene.add(this.ambientLight);

      // this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      // this.directionalLight.position.set(-70, 60, 0);
      // this.directionalLight.castShadow = true;
      // this.scene.add(this.directionalLight);

      // if (this.directionalLight) {
      //   this.dLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
      //   this.scene.add(this.dLightHelper);
      // } else {
      //   console.warn("La luz direccional no está definida al crear el helper");
      // }

      this.animate();
    },
    async loadModel() {
      try {
        this.duckModel = await loadModelGLTF(ducky);
        this.duckModel.scale.set(100, 100, 100);
        this.duckModel.position.set(-30, -5, 30);
        this.duckModel.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xcdcdcd });
            child.castShadow = true;
          }
        });
        this.catModel = await loadModelGLTF(cat);
        this.catModel.scale.set(100, 100, 100);
        this.catModel.position.set(30, -5, 30);
        this.catModel.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xcdcdcd });
            child.castShadow = true;
          }
        });
        this.scene.add(this.duckModel, this.catModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    },
    animate() {
      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
      };
      animate();
    },
    setAmbientLightColor(color) {
      if (this.ambientLight) {
        this.ambientLight.color.set(color);
      }
    },
    setAmbientLightIntensity(intensity) {
      if (this.ambientLight) {
        console.log("Cambiando intensidad de luz ambiental:", intensity);
        this.ambientLight.intensity = intensity;
      }
    },
    sliderAmbientLight(enabled) {
      if (enabled) {
        console.log("Activando luz ambiental");
        if (!this.scene.children.includes(this.ambientLight)) {
          this.scene.add(this.ambientLight);
        }
      } else {
        console.log("Desactivando luz ambiental");
        this.scene.remove(this.ambientLight);
      }
    },
    setDirectionalLightColor(color) {
      if (this.directionalLight) {
        this.directionalLight.color.set(color);
      }
    },
    setDirectionalLightIntensity(intensity) {
      if (this.directionalLight) {
        this.directionalLight.intensity = intensity;
      }
    },
    sliderDirectionalLight(enabled) {
      if (enabled) {
        if (!this.directionalLight) {
          this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          this.directionalLight.position.set(-70, 60, 0);
          this.directionalLight.castShadow = true;
        }
        this.scene.add(this.directionalLight);

        if(!this.dLightHelper) {
          this.dLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
          this.scene.add(this.dLightHelper);
        }
      } else {
        if (this.directionalLight) {
          this.scene.remove(this.directionalLight);
        } if(this.dLightHelper) {
          this.scene.remove(this.dLightHelper)
          this.dLightHelper = null;  
        }
        this.directionalLight = null;
      }
    },
    setDirectionalLightPosition(x, y, z) {
      if (this.directionalLight) {
        this.directionalLight.position.set(x, y, z);
        this.dLightHelper.update();
      }
    },
  },
  onMouseDown(event) {
    this.dragging = true;
    this.lastMousePosition = { x: event.clientX, y: event.clientY };
  },
  onMouseMove(event) {
    if (this.dragging && this.duckModel) {
      const deltaX = event.clientX - this.lastMousePosition.x;
      const deltaY = event.clientY - this.lastMousePosition.y;

      this.duckModel.rotation.y += deltaX * 0.01;
      this.duckModel.rotation.x += deltaY * 0.01;

      this.mouseLastPosition = { x: event.clientX, y: event.clientY };
    }
    if (this.dragging && this.catModel) {
      const deltaX = event.clientX - this.lastMousePosition.x;
      const deltaY = event.clientY - this.lastMousePosition.y;

      this.catModel.rotation.y += deltaX * 0.01;
      this.catModel.rotation.x += deltaY * 0.01;

      this.mouseLastPosition = { x: event.clientX, y: event.clientY };
    }
  },
  onMouseUp() {
    this.dragging = false;
  },
  beforeDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
};
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 100%;
}
</style>
