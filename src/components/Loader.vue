<template>
  <div class="loader" :class="this.loaderClass">
      is loading!
  </div>
</template>

<style lang="scss">
@import '../scss/variables';

.loader {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color--dark-500;
  color: white;
  transition: opacity 200ms;

  &.show {
    display: flex;
  }
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters('global', {
      isLoading: 'isLoading',
    }),
    loaderClass() {
      return {
        show: this.isLoading,
      };
    },
  },
};
</script>
