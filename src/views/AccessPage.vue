<template>
  <main class="access-page main">
    <BasicUserInfo
      class="access-page__welcome"
      :user="this.userInfo"
      no-user-message="Type your user's GitHub access token"/>

    <div v-if="!!this.userInfo && !!this.userInfo.login" class="access-page__options">
      <router-link
        class="btn btn-primary"
        to="/user">Access your user page</router-link>
      <a
        href="javascript:;"
        class="btn btn-danger"
        @click="this.clearToken">Remove your token</a>
    </div>

    <form @submit.prevent="findUser" class="access-page__token-form">
      <label>GitHub access token</label><br>
      <input
        type="text"
        class="input"
        placeholder="Type your GitHub access token"
        v-model="githubToken">
      <input type="submit" class="btn btn-primary" value="Buscar">
    </form>
  </main>
</template>

<style lang="scss">
.access-page {
  &__welcome {
    margin-bottom: 15px;
  }

  &__options {
    margin: 15px 0;
    a + a {
      margin-left: 10px;
    }
  }
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import BasicUserInfo from '@/components/BasicUserInfo.vue';

export default {
  name: 'AccessPage',
  components: {
    BasicUserInfo,
  },
  data() {
    return {
      githubToken: '',
    };
  },
  computed: {
    ...mapGetters('user', {
      accessToken: 'accessToken',
      userInfo: 'userInfo',
    }),
  },
  methods: {
    ...mapActions('user', {
      getUser: 'getUser',
      clearToken: 'clearToken',
    }),
    findUser() {
      this.getUser(this.githubToken);
    },
  },
  mounted() {
    this.githubToken = this.githubToken || this.accessToken;
  },
};
</script>
