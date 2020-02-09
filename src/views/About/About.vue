<template>
  <section class="about" v-if="!!this.currentUser">
    <BasicUserInfo :user="this.currentUser" />
    <AboutActionButtons v-if="!this.currentUserIsLogged" :user="this.currentUser" />
  </section>
</template>

<style lang="scss">
.about {
  max-width: 1100px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import UserFactory from '@/api/user';
import BasicUserInfo from '@/components/BasicUserInfo.vue';
import AboutActionButtons from './AboutActionButtons';

const userFactory = new UserFactory();

export default {
  name: 'About',
  components: {
    AboutActionButtons,
    BasicUserInfo,
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
      return !this.username || this.username === this.userInfo.username;
    },
  },
  methods: {
    async getUserFromUsernamePropOrCurrent() {
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
};
</script>
