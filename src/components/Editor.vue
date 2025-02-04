<template>
  <div class="editor">
    <h2>Editor</h2>
    <div class="section">
      <h3>Iluminación</h3>
      <div class="section__type">
        <p class="section__tittle">Ambiental</p>
        <div class="section__type__control">
          <label class="section__type__control__info" for="ambient-light-color">Color de la luz ambiental:</label>
          <input
            type="color"
            class="section__type__control__select"
            v-model="ambientLightColor"
            @input="updateAmbientLightColor"
          />
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info">Activar luz ambiental:</label>
          <div class="section__type__control__checkbox" @click="checkAmbientLight">
            <img
              class="section__type__control__checkbox__icon"
              :src="
                ambientLightEnabled ? require('@/assets/icons/checked.svg') : require('@/assets/icons/unchecked.svg')
              "
              alt="checkbox-icon"
            />
          </div>
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info" for="ambient-light-intensity"
            >Intensidad de la luz ambiental:</label
          >
          <Slider
            class="section__type__control__slider--ambient-light"
            v-model="ambientLightIntensity"
            :min="0"
            :max="10"
            step="0.1"
            @input="updateAmbientLightIntensity"
          />
          <span class="section__type__control__slider__data">{{ ambientLightIntensity }}</span>
        </div>
      </div>
      <div class="section__type">
        <p class="section__tittle">Direccional</p>
        <div class="section__type__control">
          <label class="section__type__control__info" for="directional-light-color">Color de la luz direccional:</label>
          <input
            type="color"
            class="section__type__control__select"
            v-model="directionalLightColor"
            @input="updateDirectionalLightColor"
          />
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info">Activar luz direccional:</label>
          <div class="section__type__control__checkbox" @click="checkDirectionalLight">
            <img
              class="section__type__control__checkbox__icon"
              :src="
                directionalLightEnabled
                  ? require('@/assets/icons/checked.svg')
                  : require('@/assets/icons/unchecked.svg')
              "
              alt="checkbox-icon"
            />
          </div>
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info" for="directional-light-intensity"
            >Intensidad de la luz direccional:</label
          >
          <Slider
            class="section__type__control__slider--directional-light"
            :min="0"
            :max="10"
            step="0.1"
            v-model="directionalLightIntensity"
            @input="updateDirectionalLightIntensity"
          />
          <span class="section__type__control__slider__data">{{ directionalLightIntensity }}</span>
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info" for="directional-light-position-x"
            >Posición X de la luz direccional:</label
          >
          <Slider
            class="section__type__control__sliderPos--directional-light"
            :min="-50"
            :max="50"
            step="1"
            v-model="directionalLightPositionX"
            @input="updateDirectionalLightPosition"
          />
          <span class="section__type__control__slider__data">{{ directionalLightPositionX }}</span>
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info" for="directional-light-position-y"
            >Posición Y de la luz direccional:</label
          >
          <Slider
            class="section__type__control__sliderPos--directional-light"
            :min="-50"
            :max="50"
            step="1"
            v-model="directionalLightPositionY"
            @input="updateDirectionalLightPosition"
          />
          <span class="section__type__control__slider__data">{{ directionalLightPositionY }}</span>
        </div>
        <div class="section__type__control">
          <label class="section__type__control__info" for="directional-light-position-z"
            >Posición Z de la luz direccional:</label
          >
          <Slider
            class="section__type__control__sliderPos--directional-light"
            :min="-100"
            :max="100"
            step="1"
            v-model="directionalLightPositionZ"
            @input="updateDirectionalLightPosition"
          />
          <span class="section__type__control__slider__data">{{ directionalLightPositionZ }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>Texturas</h3>
      <div class="section__type">
        <label class="section__type__control__info">Seleccionar modelo:</label>
        <select class="section__type__control__select" v-model="selectedModel" @change="onModelChange">
          <option v-for="model in models" :key="model.id" :value="model.id">
            {{ model.name }}
          </option>
        </select>
      </div>
      <div class="section__type__control">
        <label class="section__type__control__info">Añadir textura:</label>
        <input type="file" class="section__type__control__file" @change="onAddTexture" />
      </div>
      <div class="section__type__control">
        <p v-if="textures.length === 0" class="section__type__control--empty">No hay texturas</p>
        <div v-for="texture in textures" :key="texture.id" class="section__type__control__item">
          <span class="section__type__control__slider__data">{{ texture.name }}</span>
          <button class="section__type__control__button" @click="onRemoveTexture(texture.id)">Quitar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { TextureUtils } from "three";
import Slider from "./lib/Slider.vue";

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
      selectedModel: null,
      models: [
        { id: 1, name: "Duck" },
        { id: 2, name: "Kitty" },
      ],
      textures: [],
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
  &__tittle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px, 0, 0, 0;
  }
  &__type {
    border-bottom: 1px solid #ddd;
    &__control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      gap: 5px;
      margin-bottom: 15px;
      &__info {
        font-size: 12px;
      }
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
      &__slider--ambient-light,
      &__slider--directional-light {
        width: 200px;
      }
      &__slider {
        &__data {
          font-size: 12px;
        }
      }
    }
  }
}

h3 {
  text-decoration: underline;
}

h2 {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
