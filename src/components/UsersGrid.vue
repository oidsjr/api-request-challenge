<template>
  <div class="users-grid">
    <router-link
      v-for="user of this.users"
      :key="user.id"
      :to="`/about/${user.login}`">
      <AvatarImage :user="user" />
    </router-link>
  </div>
</template>

<style lang="scss">
.users-grid {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 25px);
}
</style>

<script>
import AvatarImage from './AvatarImage.vue';

export default {
  name: 'UsersGrid',
  components: {
    AvatarImage,
  },
  props: [
    'users',
  ],
};
</script>
