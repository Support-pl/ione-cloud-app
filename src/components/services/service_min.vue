<template>
  <div
    class="service__item"
    @click="service.onclick.function(...service.onclick.paramsArr)"
  >
    <div class="service__icon">
      <a-icon :type="service.icon"></a-icon>
    </div>
    <div class="service__title">
      {{ translatedName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "service-item",
  props: ["service"],
  computed: {
    translatedName() {
      if (this.service.translatable) {
        return this.$t(this.service.title);
      }
      return this.service.title;
    },
  },
};
</script>

<style>
.service__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: background-color 0.2s ease, color 0.2s ease;
  padding: 10px;
  cursor: pointer;
}

/* .service__item:not(:last-of-type){
	margin-right: 10px;
} */

.service__item:hover {
  background-color: #fff;
}
.service__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 3px;
  position: relative;
  color: var(--light);
}

.service__title {
  color: #fff;
}
.service__item:hover .service__title {
  color: var(--main);
  font-weight: 500;
}
/* .service__icon::after{
	color: var(--main);
	font-size: 2.3rem;
	content: '+';
	display: block;
	position: absolute;
	right: 0;
	bottom: 0;
	width: 1rem;
	height: 1rem;
	transform: translate(5px, -14px);
} */
</style>
