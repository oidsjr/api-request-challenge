<template>
  <div class="user-action-buttons">
    <div class="user-action-buttons__grid">
      <button
        v-if="!this.loggedIsFollowingCurrent"
        class="btn btn-primary"
        type="button"
        @click="this.startToFollow">Follow {{ this.user.login }}</button>
      <button
        v-else
        class="btn btn-danger"
        type="button"
        @click="this.stopToFollow">Stop following {{ this.user.login }}</button>

      <button
        v-if="!this.currentUserIsBlocked"
        class="btn btn-outline"
        type="button"
        @click="this.blockUser">Block {{ this.user.login }}</button>
      <button
        v-else
        class="btn btn-outline"
        type="button"
        @click="this.unblockUser">Unblock {{ this.user.login }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-action-buttons {
  &__grid {
    max-width: 400px;
    margin: 10px 0;

    .btn + .btn { margin-left: 10px; }
  }
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserActionButtons',
  props: ['user'],
  methods: {
    startToFollow() {
      if (this.currentUserIsBlocked) {
        // eslint-disable-next-line no-alert
        alert(`You can't follow @${this.user.login}, the user is on your block list.`);
        return;
      }
      this.$store.dispatch('user/followUser', this.user);
    },
    stopToFollow() {
      this.$store.dispatch('user/unfollowUser', this.user);
    },
    blockUser() {
      this.$store.dispatch('user/blockUser', this.user);
    },
    unblockUser() {
      this.$store.dispatch('user/unblockUser', this.user);
    },
  },
  computed: {
    ...mapGetters('user', {
      following: 'following',
      blockeds: 'blockeds',
    }),
    loggedIsFollowingCurrent() {
      return !!this.following.find((user) => user.login === this.user.login);
    },
    currentUserIsBlocked() {
      return !!this.blockeds.find((user) => user.login === this.user.login);
    },
  },
};
</script>
