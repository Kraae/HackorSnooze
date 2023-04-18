"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */
// storyId, title, author, url, username, createdAt, updatedAt
  constructor(storyObj) {
    this.storyId = storyObj.storyId;
    this.title = storyObj.title;
    this.author = storyObj.author;
    this.url = storyObj.url;
    this.username = storyObj.username;
    this.createdAt = storyObj.createdAt;
    this.updatedAt = storyObj.updatedAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // UNIMPLEMENTED: complete this function!
    //"hostname.com";
     return new URL(this.url).host
  }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    // Note presence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method?

    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/stories`);
      

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    // const storyList = new StoryList(stories);
    const storyList = new StoryList(stories);
    return storyList;
  }
  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  async addStory(user, newStory) {
      const response = await axios.post(`${BASE_URL}/signup`, {
        user: {username, password}
        
      })
      const token = user.loginToken;
      const story = new story(response.data.story);
      this.stories.unshift(story);
      user.ownStories.unshift(story);

      return story;
  }


async removeStory(user, storyId){
  const token = user.loginToken;
  const response = await axios.delete(`${$BASE_URL}/stories/${storyId}`, {
     data: {token: user.loginToken}
 })
 //filter out the story of the id being removed
this.stories = this.stories.filter(story => story.storyId !== storyId);
//filter the user's list of stories and favorites
user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
user.favorites = user.favorites.filter(s => s.storyId !== storyId);
}
}
//User: a user in the system (only used to represent the current user)

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor(userObj) {
    this.username = userObj.username;
    this.name = userObj.name;
    this.createdAt = userObj.createdAt;
    this.updatedAt = userObj.updatedAt;

    //these are not passed through the constructor, they are all set to default
    favorites = [],
    ownStories = []
    this.loginToken = "";  
  

const existingUser = new User(response.data.user);
    // instantiate Story instances for the user's favorites and ownStories
    existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
    existingUser.ownStories = response.data.user.stories.map(s => new Story(s));
    
   
    // store the login token on the user so it's easy to find for API calls.
    // make sure to attach the token to the newUser
    existingUser.loginToken = response.data.token;
    return existingUser;
}
  
  

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios(`${BASE_URL}/signup`, {
      user: { username, password, name } 
});    

    const newUser = new User(response.data.user);    

    newUser.loginToken = response.data.token;

    return newUser;
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, {
    user: { username, password },
    
  });
}
  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    console.log("token value",token)
    //if there is no user info then return null
    if(!token || !username) return null;
    //call api
      const response = await axios.get(`${BASE_URL}/users/${username}`, {
        params: {token}
      });

     
      
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }


