<template>
  <nav class="navbar">
    <AvatarImage :user="this.userInfo" class="navbar__avatar" />
    <ul class="navbar__list">
      <li class="navbar__list__item"><router-link to="/">Home</router-link></li>
      <li class="navbar__list__item"><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss">
.navbar {
  display: flex;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5px;
  &__avatar {
    width: auto;
    height: 50px;
    margin-right: 10px;
  }
  &__list {
    display: flex;
    align-items: center;
    &__item {
      padding: .5em;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex';
import AvatarImage from '@/components/AvatarImage.vue';

export default {
  components: {
    AvatarImage,
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo',
    }),
  },
};
</script>
