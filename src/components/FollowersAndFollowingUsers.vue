<template>
  <div class="followers-and-following-users">
    <section v-if="this.currentUserFollowers && this.currentUserFollowers.length">
      <h3>Followers</h3>
      <UsersGrid v-if="this.currentUserFollowers" :users="this.currentUserFollowers" />
    </section>
    <section v-if="this.currentUserFollowing && this.currentUserFollowing.length">
      <h3>Following</h3>
      <UsersGrid v-if="this.currentUserFollowing" :users="this.currentUserFollowing" />
    </section>
    <section v-if="this.currentUserIsLogged && this.blockeds && this.blockeds.length">
      <h3>Blocks</h3>
      <UsersGrid v-if="this.blockeds" :users="this.blockeds" />
    </section>
  </div>
</template>

<style lang="scss">
.followers-and-following-users {
  display: grid;
  grid-gap: 10px;
  margin: 30px 0;
  text-align: left;
}
</style>

<script>
import { mapGetters } from 'vuex';
import UserFactory from '@/api/user';
import UsersGrid from '@/components/UsersGrid.vue';

const userFactory = new UserFactory();

export default {
  name: 'FollowersAndFollowingUsers',
  components: {
    UsersGrid,
  },
  data() {
    return {
      currentUserFollowers: [],
      currentUserFollowing: [],
    };
  },
  props: ['username'],
  methods: {
    async getFollowersAndFollowingUsers() {
      this.currentUserFollowers = [];
      this.currentUserFollowing = [];

      if (this.currentUserIsLogged) {
        this.currentUserFollowers = this.followers;
        this.currentUserFollowing = this.following;
        return;
      }

      try {
        this.currentUserFollowers = await userFactory.getUserFollowers(this.username);
        this.currentUserFollowing = await userFactory.getUserFollowing(this.username);
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo',
      following: 'following',
      followers: 'followers',
      blockeds: 'blockeds',
    }),
    currentUserIsLogged() {
      return !this.username || this.username === this.userInfo.login;
    },
  },
  mounted() {
    this.getFollowersAndFollowingUsers();
  },
  watch: {
    username() {
      this.getFollowersAndFollowingUsers();
    },
  },
};
</script>
