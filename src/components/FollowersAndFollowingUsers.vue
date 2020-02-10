<template>
  <div class="followers-and-following-users">
    <section>
      <h3>Seguidores</h3>
      <UsersGrid v-if="this.followers" :users="this.followers" />
    </section>
    <section>
      <h3>Seguindo</h3>
      <UsersGrid v-if="this.following" :users="this.following" />
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
      followers: [],
      following: [],
    };
  },
  props: ['username'],
  methods: {
    async getFollowersAndFollowingUsers() {
      this.followers = [];
      this.following = [];

      try {
        this.followers = await userFactory.getUserFollowers(this.username);
        this.following = await userFactory.getUserFollowing(this.username);
      } catch (error) {
        console.error(error);
      }
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
