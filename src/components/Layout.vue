<template>
    <div class="layout">
      <div class="scene-container">
        <Scene ref="scene"/>
      </div>
      <div class="editor-container">
        <Editor
          @update-ambient-light-color="updateAmbientLightColor"
          @update-ambient-light-intensity="updateAmbientLightIntensity"
          @slider-ambient-light="sliderAmbientLight"
          @update-directional-light-color="updateDirectionalLightColor"
          @update-directional-light-intensity="updateDirectionalLightIntensity"
          @slider-directional-light="sliderDirectionalLight"
          @update-directional-light-position="updateDirectionalLightPosition"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Scene from './Scene.vue';
  import Editor from './Editor.vue';
  
  export default {
    name: 'Layout',
    components: {
      Scene,
      Editor,
    },
    methods: {
      updateAmbientLightColor(color) {
        this.$refs.scene.setAmbientLightColor(color);
      },
      updateAmbientLightIntensity(intensity) {
        this.$refs.scene.setAmbientLightIntensity(intensity);
      },
      sliderAmbientLight(enabled) {
        this.$refs.scene.sliderAmbientLight(enabled);
      },
      updateDirectionalLightColor(color) {
        this.$refs.scene.setDirectionalLightColor(color);
      },
      updateDirectionalLightIntensity(intensity) {
        this.$refs.scene.setDirectionalLightIntensity(intensity);
      },
      sliderDirectionalLight(enabled) {
        this.$refs.scene.sliderDirectionalLight(enabled);
      },
      updateDirectionalLightPosition(position) {
        this.$refs.scene.setDirectionalLightPosition(position.x, position.y, position.z);
      }
    }
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  .scene-container {
    width: 65vw;
    height: 100vh;
    background: black;
  }
  </style>
  