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
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters('user', {
      accessToken: 'accessToken',
    }),
  },
  methods: {
    ...mapActions('user', {
      getUser: 'getUser',
    }),
    findIfExistsTokenInStore() {
      if (!this.accessToken) return;
      this.getUser(this.accessToken);
    },
  },
  mounted() {
    this.findIfExistsTokenInStore();
  },
};
</script>
