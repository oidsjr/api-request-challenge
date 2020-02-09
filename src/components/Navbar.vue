<template>
  <nav class="navbar">
    <img
      v-if="this.showAvatar"
      :alt="`Imagem de avatar de ${this.userInfo.name || 'usuário'}`"
      :src="this.userInfo.avatar_url"
      class="navbar__avatar avatar-image">
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

export default {
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo',
    }),
    showAvatar() {
      return this.userInfo && this.userInfo.avatar_url;
    },
  },
};
</script>
