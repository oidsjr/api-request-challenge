import RequestsFactory from './requests';

export default class UserFactory extends RequestsFactory {
  // Due user blocks API is available to developers preview
  // To access we must provide this custom media type in the Accept header
  previewBlocksApiAcceptHeader = { headers: { Accept: 'application/vnd.github.giant-sentry-fist-preview+json' } };

  getUser() {
    return this.get('/user');
  }

  getUserFollowers() {
    return this.get('/user/followers');
  }

  getUserFollowing() {
    return this.get('/user/following');
  }

  /**
   * Status: 204 No Content - you are following the user;
   * Status: 404 Not Found - you are not following the user;
   * @param username Username on github
   */
  checkUserFollowing(username) {
    return this.get(`/user/following/${username}`);
  }

  /**
   * Starts to follow a user from username
   * @param username Username on github
   */
  followUser(username) {
    return this.put(`/user/following/${username}`);
  }

  unfollowUser(username) {
    return this.delete(`/user/following/${username}`);
  }

  getUserBlocks() {
    return this.get('/user/blocks', this.previewBlocksApiAcceptHeader);
  }

  /**
   * Status: 204 No Content - the user is blocked;
   * Status: 404 Not Found - the user is not blocked;
   * @param username Username on github
   */
  checkUserBlocked(username) {
    return this.get(`/user/blocks/${username}`, this.previewBlocksApiAcceptHeader);
  }

  blockUser(username) {
    return this.put(`/user/blocks/${username}`, {}, this.previewBlocksApiAcceptHeader);
  }

  unblockUser(username) {
    return this.delete(`/user/blocks/${username}`, this.previewBlocksApiAcceptHeader);
  }
}
