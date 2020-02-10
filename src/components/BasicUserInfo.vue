<template>
  <div class="basic-user-info" v-if="!!this.user">
    <AvatarImage :user="this.user" class="basic-user-info__avatar" />
    <div class="basic-user-info__username">
      <h1>{{ this.user.name }}</h1>
      <p><a
        :href="this.user.html_url"
        target="_blank"
        rel="noreferrer">@{{ this.user.login }}</a></p>
    </div>
    <div class="basic-user-info__basics">
      <address>
        {{ this.user.email }}<br>
        {{ this.user.location }}
      </address>
      <blockquote v-if="this.user.bio">{{ this.user.bio }}</blockquote>
    </div>
  </div>
</template>

<style lang="scss">
.basic-user-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  &__avatar {
    height: 100px;
    margin: 15px 15px 15px 0;
  }
  &__username {
    text-align: left;
  }
  &__basics {
    width: 100%;
  }
}
</style>

<script>
import AvatarImage from '@/components/AvatarImage.vue';

export default {
  name: 'BasicUserInfo',
  components: {
    AvatarImage,
  },
  props: ['user'],
  computed: {
    showAvatar() {
      return !!this.user && !!this.user.avatar_url;
    },
  },
};
</script>
