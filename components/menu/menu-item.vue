<template>
  <div class="menu-item">
    <NuxtLink
      class="menu-item__link"
      :to="routeOptions"
      active-class="menu-item__link--active"
      exact
    >
      <icon-component v-if="icon" class="menu-item__icon" :name="icon" />
      {{ label }}
    </NuxtLink>
  </div>
</template>

<script>
import IconComponent from '../common/icon'
export default {
  name: 'MenuItem',
  components: { IconComponent },
  props: {
    icon: { type: String, default: () => null },
    label: { type: String, required: true },
    routeName: { type: String, required: true },
  },
  computed: {
    routeOptions() {
      return {
        name: this.routeName,
      }
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/styles/media';

$item-color: darken(#a3cb38, 10%);
$item-color-hover: darken(#a3cb38, 15%);
$hover-background-color: transparentize(black, 0.95);

.menu-item {
  transition: 250ms background-color;

  &__link {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: $item-color;
    font-family: 'Get Schwifty', serif;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
      0 16px 16px rgba(0, 0, 0, 0.12);
    transition: 250ms all;

    &--active {
      background-color: black;
    }

    &:active {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }

    &:hover {
      color: $item-color-hover;
    }
  }

  &__icon {
    fill: black;
  }
}

@include adaptive('phone') {
  .menu-item {
    &__link {
      font-size: 1rem;
      padding: 10px;
      border-radius: 15px;
    }

    &__icon {
      width: 25px;
      height: 25px;
      margin-bottom: 2px;
    }
  }
}

@include adaptive('tablet') {
  .menu-item {
    &__link {
      font-size: 1rem;
      padding: 10px;
      border-radius: 30px;
    }

    &__icon {
      width: 30px;
      height: 30px;
      margin-bottom: 3px;
    }
  }
}

@include adaptive('desktop') {
  .menu-item {
    &__link {
      font-size: 1.2rem;
      padding: 15px;
      border-radius: 50px;
    }

    &__icon {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
  }
}
</style>
