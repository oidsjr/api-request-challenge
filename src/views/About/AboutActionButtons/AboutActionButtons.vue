<template>
  <div class="about-action-buttons">
    <div class="about-action-buttons__grid">
      <button
        v-if="!this.loggedIsFollowingCurrent"
        class="btn btn-primary"
        type="button"
        @click="this.startToFollow">Seguir {{ this.user.login }}</button>
      <button
        v-else
        class="btn btn-danger"
        type="button"
        @click="this.stopToFollow">Parar de seguir {{ this.user.login }}</button>

      <button
        v-if="!this.currentUserIsBlocked"
        class="btn btn-outline"
        type="button"
        @click="this.blockUser">Bloquear {{ this.user.login }}</button>
      <button
        v-else
        class="btn btn-outline"
        type="button"
        @click="this.unblockUser">Desbloquear {{ this.user.login }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-action-buttons {
  &__grid {
    max-width: 400px;
    margin: 10px 0;

    .btn + .btn { margin-left: 10px; }
  }
}
</style>

<script>
import UserFactory from '@/api/user';

const userFactory = new UserFactory();

export default {
  name: 'AboutActionButtons',
  data() {
    return {
      currentUser: {},
      loggedIsFollowingCurrent: false,
      currentUserIsBlocked: false,
    };
  },
  props: ['user'],
  methods: {
    async getUserInfo() {
      if (!this.user || !this.user.login) return;

      try {
        this.loggedIsFollowingCurrent = await userFactory.checkUserFollowing(this.user.login);
        this.currentUserIsBlocked = await userFactory.checkUserBlocked(this.user.login);
      } catch (error) {
        console.error(error);
      }
    },
    async startToFollow() {
      if (!this.user || !this.user.login) return;

      try {
        await userFactory.followUser(this.user.login);
        this.loggedIsFollowingCurrent = true;
      } catch (error) {
        console.error(error);
      }
    },
    async stopToFollow() {
      if (!this.user || !this.user.login) return;

      try {
        await userFactory.unfollowUser(this.user.login);
        this.loggedIsFollowingCurrent = false;
      } catch (error) {
        console.error(error);
      }
    },
    async blockUser() {
      if (!this.user || !this.user.login) return;

      try {
        await userFactory.blockUser(this.user.login);
        this.currentUserIsBlocked = true;
      } catch (error) {
        console.error(error);
      }
    },
    async unblockUser() {
      if (!this.user || !this.user.login) return;

      try {
        await userFactory.unblockUser(this.user.login);
        this.currentUserIsBlocked = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
