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
    <div class="basic-user-info__basics" v-if="this.showBasics">
      <address>
        {{ this.user.email }}<br v-if="this.user.email && this.user.location" />
        {{ this.user.location }}
      </address>
      <blockquote v-if="this.user.bio">{{ this.user.bio }}</blockquote>
    </div>
  </div>
</template>

<style lang="scss">
@import "../scss/variables";

.basic-user-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin: 30px 0;
  border: 1px solid $color--dark-100;
  padding: 15px;
  border-radius: $border-radius;

  &__avatar {
    height: 100px;
    margin-right: 15px;
  }
  &__username {
    text-align: left;
  }
  &__basics {
    margin-top: 15px;
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
    showBasics() {
      return !!this.user.email || !!this.user.location || !!this.user.bio;
    },
  },
};
</script>
