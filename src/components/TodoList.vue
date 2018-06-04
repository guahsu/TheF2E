<template>
  <div>
    <div class="header">
      <div class="header-item">My Tasks</div>
      <div class="header-item">In Progress</div>
      <div class="header-item">Completed</div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'todolist',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #e1e1e1;
}
.header {
  width: 100%;
  height: 76px;
  background-color: #4a90e2;
  &-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 100%;
    color: #00408b;
    font-weight: 500;
    font-size: 24px;
    &:hover, &.active {
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease-in-out 0s;
    }
    &:before {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 160px;
      height: 5px;
      background-color: #00408b;
      content: '';
      transition: transform 0.25s ease-out;
      transform: translateX(-50%) scaleX(0);
    }
    &:hover:before {
      transform: translateX(-50%) scaleX(1);
    }
  }
}

.content {
  max-width: 660px;
}
</style>
