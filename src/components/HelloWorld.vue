<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h3 class="blue" style="font-weight: 600;">耐心 坚定 毅力</h3>
    <h3>
     event driven(能够有热度 有想象空间 有爆发力)+ 提前布局 + good price + risk control 
     <br>
     壁虎理论+吃鱼理论+价格 价位太高 再好的逻辑也不进
    </h3>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
