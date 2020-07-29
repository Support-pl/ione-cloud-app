<template>
  <div class="loading" :style="{'color': color}">
      <a-icon type="loading" />
  </div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        color: {
            type: String,
            default: '#427cf7'
        }
    }
}
</script>

<style>
    .loading {
        height: 100%;
        display: grid;
        place-items: center;
        font-size: 3rem;
    }
</style>