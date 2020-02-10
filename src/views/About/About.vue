<template>
  <main class="about main" v-if="!!this.currentUser">
    <BasicUserInfo :user="this.currentUser" />
    <AboutActionButtons
      v-if="!this.currentUserIsLogged"
      :key="this.currentUser.id"
      :user="this.currentUser" />
    <FollowersAndFollowingUsers :username="this.username" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import UserFactory from '@/api/user';
import BasicUserInfo from '@/components/BasicUserInfo.vue';
import FollowersAndFollowingUsers from '@/components/FollowersAndFollowingUsers.vue';
import AboutActionButtons from './AboutActionButtons';

const userFactory = new UserFactory();

export default {
  name: 'About',
  components: {
    AboutActionButtons,
    BasicUserInfo,
    FollowersAndFollowingUsers,
  },
  data() {
    return {
      currentUser: {},
    };
  },
  props: ['username'],
  computed: {
    ...mapGetters('user', {
      userInfo: 'userInfo',
    }),
    currentUserIsLogged() {
      return !this.username || this.username === this.userInfo.login;
    },
  },
  methods: {
    async getUserFromUsernamePropOrCurrent() {
      this.currentUser = {};
      // if has no username or is equal logged user
      // uses logged user info
      if (this.currentUserIsLogged) {
        this.currentUser = this.userInfo;
        return;
      }

      try {
        this.currentUser = await userFactory.getUser(this.username);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getUserFromUsernamePropOrCurrent();
  },
  watch: {
    username() {
      this.getUserFromUsernamePropOrCurrent();
    },
  },
};
</script>
