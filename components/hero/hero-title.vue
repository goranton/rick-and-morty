<template>
  <h2 class="hero__title">{{ title }}</h2>
</template>

<script>
export default {
  name: 'HeroTitle',
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero__title {
  text-align: center;
}

@include adaptive('phone') {
  .hero__title {
    font-size: 1.2rem;
    line-height: 2.2rem;
    margin-top: 17px;
  }
}

@include adaptive('tablet') {
  .hero__title {
    font-size: 1.7rem;
    line-height: 2.7rem;
    margin-top: 17px;
  }
}

@include adaptive('desktop') {
  .hero__title {
    margin-top: 20px;
    font-size: 2rem;
    line-height: 3rem;
  }
}
</style>
