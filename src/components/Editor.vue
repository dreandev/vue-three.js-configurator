<template>
  <div class="editor">
    <h2>Editor</h2>
    <div class="section">
      <h3>Iluminación</h3>
      <div class="control">
        <label for="ambient-light-color">Color de la luz ambiental:</label>
        <input type="color" class="control__select" v-model="ambientLightColor" @input="updateAmbientLightColor" />
      </div>
      <div class="control">
        <label>Activar luz ambiental:</label>
        <div class="control__checkbox" @click="checkAmbientLight">
          <img
            class="control__checkbox__icon"
            :src="ambientLightEnabled ? require('@/assets/icons/checked.svg') : require('@/assets/icons/unchecked.svg')"
            alt="checkbox-icon"
          />
        </div>
      </div>
      <div class="control">
        <label for="ambient-light-intensity">Intensidad de la luz ambiental:</label>
        <Slider
          class="control__slider--ambient-light"
          :value="ambientLightIntensity"
          :min="0"
          :max="10"
          step="0.1"
          @input="updateAmbientLightIntensity"
        />
        <span>{{ ambientLightIntensity }}</span>
      </div>
      <div class="control">
        <label for="directional-light-color">Color de la luz direccional:</label>
        <input
          type="color"
          class="control__select"
          v-model="directionalLightColor"
          @input="updateDirectionalLightColor"
        />
      </div>
      <div class="control">
        <label>Activar luz direccional:</label>
        <div class="control__checkbox" @click="checkDirectionalLight">
          <img
            class="control__checkbox__icon"
            :src="
              directionalLightEnabled ? require('@/assets/icons/checked.svg') : require('@/assets/icons/unchecked.svg')
            "
            alt="checkbox-icon"
          />
        </div>
      </div>
      <div class="control">
        <label for="directional-light-intensity">Intensidad de la luz direccional:</label>
        <Slider
          class="control__slider--directional-light"
          :min="0"
          :max="10"
          step="0.1"
          v-model="directionalLightIntensity"
          @input="updateDirectionalLightIntensity"
        />
        <span>{{ directionalLightIntensity }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-x">Posición X de la luz direccional:</label>
        <Slider
          class="control__sliderPos--directional-light"
          :min="-50"
          :max="50"
          step="1"
          v-model="directionalLightPositionX"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionX }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-y">Posición Y de la luz direccional:</label>
        <Slider
          class="control__sliderPos--directional-light"
          :min="-50"
          :max="50"
          step="1"
          v-model="directionalLightPositionY"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionY }}</span>
      </div>
      <div class="control">
        <label for="directional-light-position-z">Posición Z de la luz direccional:</label>
        <Slider
          class="control__sliderPos--directional-light"
          :min="-100"
          :max="100"
          step="1"
          v-model="directionalLightPositionZ"
          @input="updateDirectionalLightPosition"
        />
        <span>{{ directionalLightPositionZ }}</span>
      </div>
    </div>

    <div class="section">
      <h3>Texturas</h3>
    </div>
  </div>
</template>

<script>
import Slider from './lib/Slider.vue';

export default {
  name: "Editor",
  props: {
    aplication: Object,
  },
  components: {
    Slider,
  },
  data() {
    return {
      ambientLightEnabled: true,
      ambientLightIntensity: 5,
      ambientLightColor: "#ffffff",
      directionalLightEnabled: false,
      directionalLightIntensity: 5,
      directionalLightColor: "#ffffff",
      directionalLightPositionX: 1,
      directionalLightPositionY: 1,
      directionalLightPositionZ: 1,
    };
  },
  mounted() {
    this.updateAmbientLightIntensity();
  },
  methods: {
    checkAmbientLight() {
      this.ambientLightEnabled = !this.ambientLightEnabled;
      this.$emit("slider-ambient-light", this.ambientLightEnabled);
    },
    updateAmbientLightColor() {
      this.$emit("update-ambient-light-color", this.ambientLightColor);
    },
    updateAmbientLightIntensity() {
      this.$emit("update-ambient-light-intensity", this.ambientLightIntensity);
    },
    checkDirectionalLight() {
      this.directionalLightEnabled = !this.directionalLightEnabled;
      this.$emit("slider-directional-light", this.directionalLightEnabled);
    },
    updateDirectionalLightColor() {
      this.$emit("update-directional-light-color", this.directionalLightColor);
    },
    updateDirectionalLightIntensity() {
      this.$emit("update-directional-light-intensity", this.directionalLightIntensity);
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

<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 35vw;
  height: 100vh;
  gap: 10px;
  padding: 18px;
  overflow-y: scroll;
  scrollbar-width: none;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.editor::-webkit-scrollbar {
  display: none;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  border: 1px solid #ddd;
  margin-top: 0;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 1500px;
  width: 480px;
}

h2 {
  margin-top: 0;
  margin-bottom: 0;
}

label {
  font-size: 14px;
  font-weight: 400;
}

.control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  gap: 5px;
  margin-bottom: 15px;
  &__select {
    cursor: pointer;
    width: 80px;
    height: 34px;
    border: none;
    background: none;
  }
  &__checkbox {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    &__icon {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
  &__slider--ambient-light, &__slider--directional-light {
    width: 150px;
  }
}
</style>
