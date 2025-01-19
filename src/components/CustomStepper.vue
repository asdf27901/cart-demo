<template>
  <div class="stepper">
    <button class="minus" @click="$emit('input', value - 1)" :disabled="value <= 1">-</button>
    <input type="text" class="inp" :value="value" @change="$emit('input', parseInt($event.target.value))">
    <button class="add" @click="$emit('input', value + 1)">+</button>
  </div>
</template>

<script>
export default {
  name: 'CustomStepper',
  props: {
    value: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="less">
.stepper {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
