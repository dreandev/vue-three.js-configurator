<template>
    <div class="slider-wrapper" @click="handleClick">
      <div class="slider-track">
        <div
          class="slider-progress"
          :style="{ width: `${(value - min) / (max - min) * 100}%` }"
        ></div>
        <div
          class="slider-thumb"
          :style="{ left: `${(value - min) / (max - min) * 100}%` }"
          @mousedown="startDragging"
          @touchstart="startDragging"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Slider",
    props: {
      value: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 100,
      },
      step: {
        type: Number,
        default: 1,
      }
    },
    data() {
      return {
        isDragging: false,
      };
    },
    methods: {
      startDragging(event) {
        this.isDragging = true;
        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("mouseup", this.stopDragging);
        document.addEventListener("touchmove", this.onDrag);
        document.addEventListener("touchend", this.stopDragging);
        event.preventDefault();
      },
      onDrag(event) {
        if (!this.isDragging) return;
        this.updateValueFromEvent(event);
      },
      stopDragging() {
        this.isDragging = false;
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.stopDragging);
        document.removeEventListener("touchmove", this.onDrag);
        document.removeEventListener("touchend", this.stopDragging);
      },
      handleClick(event) {
        if(this.isDragging) return;
        this.updateValueFromEvent(event);
      },
      updateValueFromEvent(event) {
        const track = this.$el.querySelector(".slider-track");
        const trackRect = track.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  
        let newValue = ((clientX - trackRect.left) / trackRect.width) * (this.max - this.min) + this.min;
        newValue = Math.max(this.min, Math.min(this.max, newValue));
        newValue = Math.round(newValue / this.step) * this.step;
        newValue = parseFloat(newValue.toFixed(2));
        this.$emit("input", newValue);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .slider-wrapper {
    position: relative;
    width: 100%;
    height: fit-content;
    cursor: pointer;
  }
  
  .slider-track {
    position: relative;
    width: 100%;
    height: 4px;
    background: #9b9b9b;
    border-radius: 2px;
  }
  
  .slider-progress {
    position: absolute;
    height: 100%;
    background: #000;
    border-radius: 2px;
  }
  
  .slider-thumb {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 8px;
    background: #000;
    border: 2px solid #666;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.1s ease-out, background-color 0.2s ease;
  }
  
  .slider-thumb:hover {
    background: #222;
  }
  </style>
  