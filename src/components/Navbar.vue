<template>
  <nav class="navbar">
    <div class="navbar__wrapper">
      <AvatarImage :user="this.userInfo" class="navbar__avatar" />
      <ul class="navbar__list">
        <li class="navbar__list__item"><router-link to="/">Home</router-link></li>
        <li class="navbar__list__item"><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  background-color: rgb(25, 25, 25);
  &__wrapper {
    max-width: 1100px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 10px 5px;
  }
  &__avatar {
    width: auto;
    height: 45px;
    margin-right: 10px;
  }
  &__list {
    display: flex;
    align-items: center;
    &__item {
      padding: .5em;
      a {
        color: #fff;
      }
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
