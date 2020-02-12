<template>
  <img
    v-if="this.showAvatar"
    :alt="`Avatar image of ${this.user.name || 'user'}`"
    :src="this.user.avatar_url"
    class="avatar-image">
</template>

<style lang="scss" scoped>
.avatar-image {
  border-radius: 50px;
  max-width: 100%;
}
</style>

<script>
export default {
  name: 'AvatarImage',
  props: [
    'user',
  ],
  computed: {
    showAvatar() {
      return !!this.user && !!this.user.avatar_url;
    },
  },
};
</script>
