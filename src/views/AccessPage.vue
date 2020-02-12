<template>
  <main class="access-page main">
    <BasicUserInfo
      class="access-page__welcome"
      :user="this.userInfo"
      no-user-message="Digite o token de acesso de seu usuário do GitHub"
      />

    <form @submit.prevent="findUser" class="access-page__token-form">
      <label>Token de acesso GitHub:</label>
      <input type="text" class="input" name="githubToken" id="githubToken" v-model="githubToken">
      <input type="submit" class="btn btn-primary" value="Buscar">
    </form>
  </main>
</template>

<style lang="scss">
.access-page {
  &__avatar {
    height: 100px;
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
