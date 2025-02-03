<!-- TO-DO: -->
<!-- Continuar con los slider para cambiar la luz direccional en el eje Y y Z -->

<template>
  <div class="editor">
    <h2>Editor</h2>
    <div class="section">
      <h3>Iluminación</h3>
      <div class="control">
        <label for="ambient-light-color">Color de la luz ambiental:</label>
        <input type="color" id="ambient-light-color" v-model="ambientLightColor" @input="updateAmbientLightColor" />
      </div>
      <div class="control">
        <label>Activar luz ambiental:</label>
        <input
          type="checkbox"
          id="slider-ambient-light"
          checked
          v-model="ambientLightEnabled"
          @change="sliderAmbientLight"
        />
      </div>
      <div class="control">
        <label for="ambient-light-intensity">Intensidad de la luz ambiental:</label>
        <input
          type="range"
          id="ambient-light-intensity"
          min="0"
          max="10"
          step="0.1"
          v-model="ambientLightIntensity"
          @input="updateAmbientLightIntensity"
        />
        <span>{{ ambientLightIntensity }}</span>
      </div>
      <div class="control">
        <label for="directional-light-color">Color de la luz direccional:</label>
        <input
          type="color"
          id="directional-light-color"
          v-model="directionalLightColor"
          @input="updateDirectionalLightColor"
        />
      </div>
      <div class="control">
        <label>Activar luz direccional:</label>
        <input
          type="checkbox"
          id="slider-directional-light"
          checked
          v-model="directionalLightEnabled"
          @change="sliderDirectionalLight"
        />
      </div>
      <div class="control">
        <label for="directional-light-intensity">Intensidad de la luz direccional:</label>
        <input
          type="range"
          id="directional-light-intensity"
          min="0"
          max="10"
          step="0.1"
          v-model="directionalLightIntensity"
          @input="updateDirectionalLightIntensity"
        />
        <span>{{ directionalLightIntensity }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-x">Posición X de la luz direccional:</label>
        <input
          type="range"
          id="directional-light-position-x"
          min="-50"
          max="50"
          step="1"
          v-model="directionalLightPositionX"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionX }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-y">Posición Y de la luz direccional:</label>
        <input
          type="range"
          id="directional-light-position-y"
          min="-50"
          max="50"
          step="1"
          v-model="directionalLightPositionY"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionY }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-z">Posición Z de la luz direccional:</label>
        <input
          type="range"
          id="directional-light-position-z"
          min="-100"
          max="100"
          step="1"
          v-model="directionalLightPositionZ"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionZ }}</span>
      </div>
    </div>

    <div class="section">
      <p>Texturas</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    aplication: Object,
  },
  data() {
    return {
      ambientLightColor: "#ffffff",
      ambientLightIntensity: 5,
      ambientLightEnabled: true,
      directionalLightColor: "#ffffff",
      directionalLightIntensity: 5,
      directionalLightEnabled: true,
      directionalLightPositionX: 1,
      directionalLightPositionY: 1,
      directionalLightPositionZ: 1,
    };
  },
  mounted() {
    this.ambientLightIntensity = 5;
    this.directionalLightIntensity = 5;
  },
  methods: {
    updateAmbientLightColor() {
      this.$emit("update-ambient-light-color", this.ambientLightColor);
    },
    updateAmbientLightIntensity() {
      this.$emit("update-ambient-light-intensity", this.ambientLightIntensity);
    },
    sliderAmbientLight() {
      this.$emit("slider-ambient-light", this.ambientLightEnabled);
    },
    updateDirectionalLightColor() {
      this.$emit("update-directional-light-color", this.directionalLightColor);
    },
    updateDirectionalLightIntensity() {
      this.$emit("update-directional-light-intensity", this.directionalLightIntensity);
    },
    sliderDirectionalLight() {
      this.$emit("slider-directional-light", this.directionalLightEnabled);
    },
    updateDirectionalLightPosition() {
      this.$emit("update-directional-light-position", {
        x: this.directionalLightPositionX,
        y: this.directionalLightPositionY,
        z: this.directionalLightPositionZ,
      });
    },
  },
};
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.section {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 1500px;
}

h2 {
  margin-top: 0;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  font-weight: 500;
}

input[type="color"] {
  width: 70px;
  height: 70px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

input[type="checkbox"] {
  width: auto;
  cursor: pointer;
}

input[type="range"] {
  width: 100%;
  cursor: pointer;
}
</style>
