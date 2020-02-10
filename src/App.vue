<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './scss/plugins/reset';
@import './scss/main';
</style>

<script>
import { mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  methods: {
    ...mapActions('user', {
      getUserInfo: 'getUserInfo',
      getUserFollowers: 'getUserFollowers',
      getUserFollowing: 'getUserFollowing',
      getUserBlockeds: 'getUserBlockeds',
    }),
  },
  mounted() {
    this.getUserInfo();
    this.getUserFollowers();
    this.getUserFollowing();
    this.getUserBlockeds();
  },
};
</script>
