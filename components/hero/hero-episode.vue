<template>
  <div class="hero-episode">
    <div class="hero-episode__wrapper">
      <h3 class="hero-episode__row hero-episode__name title--normal">
        {{ name }}
      </h3>
      <div class="hero-episode__row hero-episode__code">
        {{ episode }}
      </div>
      <time :datetime="airDate" class="hero-episode__row hero-episode__date">
        {{ airDate }}
      </time>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroEpisode',
  props: {
    name: {
      type: String,
      required: true,
    },
    episode: {
      type: String,
      required: true,
    },
    airDate: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/media';

.hero-episode {
  &__name {
    font-weight: bold;
  }

  &__code {
    color: gray;
  }

  &__date {
    font-style: italic;
  }
}

@include adaptive('phone') {
  .hero-episode {
    margin-bottom: 5px;

    &,
    &__wrapper {
      padding: 5px;
    }

    &__row {
      padding: 5px;
    }

    &__wrapper {
      border: 1px solid black;
    }
  }
}
@include adaptive('tablet') {
  .hero-episode {
    margin-bottom: 7px;

    &,
    &__wrapper {
      padding: 7px;
    }

    &__row {
      padding: 7px;
    }

    &__wrapper {
      border: 1px solid black;
    }
  }
}
@include adaptive('desktop') {
  .hero-episode {
    margin-bottom: 10px;

    &,
    &__wrapper {
      padding: 10px;
    }

    &__row {
      padding: 10px;
    }

    &__wrapper {
      border: 2px solid black;
    }
  }
}
</style>
