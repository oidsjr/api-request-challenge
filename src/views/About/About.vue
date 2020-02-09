<template>
  <section class="about" v-if="!!this.currentUser">
    <AvatarImage :user="this.currentUser" class="about__avatar" />
    <div class="about__username">
      <h1>{{ this.currentUser.name }}</h1>
      <p><a
        :href="this.currentUser.html_url"
        target="_blank"
        rel="noreferrer">@{{ this.currentUser.login }}</a></p>
    </div>
    <div class="about__basics">
      <address>
        {{ this.currentUser.email }}<br>
        {{ this.currentUser.location }}
      </address>
      <blockquote v-if="this.currentUser.bio">{{ this.currentUser.bio }}</blockquote>
    </div>
    <AboutActionButtons
      v-if="!this.currentUserIsLogged"
      class="about__actions"
      :user="this.currentUser" />
  </section>
</template>

<style lang="scss">
.about {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1100px;

  &__avatar {
    height: 100px;
    margin: 15px;
  }
  &__username {
    text-align: left;
  }
  &__basics {
    width: 100%;
  }
  &__actions {
    width: 100%;
  }
}
</style>

<script>
import { mapGetters } from 'vuex';
import UserFactory from '@/api/user';
import AvatarImage from '@/components/AvatarImage.vue';
import AboutActionButtons from './AboutActionButtons';

const userFactory = new UserFactory();

export default {
  name: 'About',
  components: {
    AvatarImage,
    AboutActionButtons,
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
    showAvatar() {
      return !!this.currentUser && !!this.currentUser.avatar_url;
    },
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
