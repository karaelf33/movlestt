var url = {
  users: 'https://jsonblob.com/api/jsonBlob/34f2ac63-44d2-11e8-adbe-d35ed1c5ed6f',
  photos: 'https://randomuser.me/api/?results=10&format=json' };


Vue.component('control-icon', {
  template: '#control-icon',
  data: function data() {
    return {
      iconset: 'fontawesome',
      iconTypes: {
        fontawesome: {
          name: 'Font Awesome',
          template: 'fa fa-fw fa-',
          icons: {
            ajax: 'circle-o-notch fa-spin',
            menu: 'bars',
            close: 'times',
            search: 'search',
            compose: 'pencil',
            emoji: 'smile-o',
            attachment: 'paperclip',
            send: 'paper-plane' } },


        materialdesign: {
          name: 'Material Design',
          template: 'mdi mdi-',
          icons: {
            ajax: '',
            menu: 'menu',
            search: 'magnify',
            close: 'close',
            compose: 'pencil',
            emoji: 'emoticon',
            attachment: 'paperclip',
            send: 'send' } } } };




  },
  props: {
    icon: {
      type: String,
      required: true },

    classes: {
      type: String,
      required: false,
      default: '' } },


  methods: {},

  computed: {
    iconclass: function iconclass() {
      var iconset = this.iconTypes[this.iconset];
      return iconset.template + iconset.icons[this.icon] + this.classes;
    } },

  mounted: function mounted() {
    this.iconset = this.$root.iconset;
    this.$root.icons.push(this);
  } });


Vue.component('control-ajax', {
  template: '#control-ajax',
  data: function data() {
    return {
      isShown: true };

  },
  methods: {
    hide: function hide() {
      this.isShown = false;
    },
    show: function show() {
      this.isShown = true;
    } } });



Vue.component('chat-panel', {
  template: '#control-chat-panel',
  data: function data() {
    return {
      isExpanded: true,
      isLoaded: false,
      users: [],
      filteredUsers: [],
      searchInput: '',
      scrollbar: false };

  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Hello World' } },


  computed: {},

  methods: {
    expand: function expand() {
      this.isExpanded = !this.isExpanded;
    },
    addUser: function addUser(userData) {
      this.users.push(userData);
    },
    filterByName: function filterByName(name) {
      var filteredList = [];

      this.users.forEach(function (user) {
        if (user.username.toLowerCase().indexOf(name) !== -1) {
          filteredList.push(user);
        }
      });
      return filteredList;
    },
    hideAjax: function hideAjax() {
      this.isLoaded = true;
    },
    showAjax: function showAjax() {
      this.isLoaded = false;
    } },

  watch: {
    searchInput: function searchInput(value) {
      if (value.length > 0) {
        this.filteredUsers = this.filterByName(value.toLowerCase());
      } else {
        this.filteredUsers = this.users;
      }
    } },

  mounted: function mounted() {
    this.filteredUsers = this.users;
    this.scrollbar = new PerfectScrollbar(this.$refs.content);
  } });


Vue.component('chat-user', {
  template: '#control-chat-user',
  data: function data() {
    return {};

  },
  props: {
    index: {
      type: Number,
      required: true },

    userdata: {
      type: Object,
      required: true } },


  computed: {},

  methods: {
    chatUser: function chatUser(index) {
      var $root = this.$root;
      if ($root.lookupChatByIndex(index) === false) {// check to see if the chat is already opened
        $root.chatWith(index, this.userdata);
      } else {
        $root.focusChat(index);
      }
    } },


  watch: {},

  mounted: function mounted() {
  } });


Vue.component('chat-window', {
  template: '#control-chat-window',
  data: function data() {
    return {
      isExpanded: true,
      iAmTyping: false,
      theyAreTyping: false,
      sendMessageInput: '',
      readTimeout: false,
      writeTimeout: false,
      scrollbar: false };

  },
  props: {
    index: {
      type: Number,
      required: true },

    chatdata: {
      type: Object,
      required: true } },


  computed: {
    time: function time() {
      var hour = Math.ceil(Math.random() * 12);
      var minute = Math.ceil(Math.random() * 60);
      var ampm = Math.ceil(Math.random() * 2) === 2 ? 'pm' : 'am';
      return hour + ':' + (minute > 9 ? minute : '0' + minute) + ' ' + ampm;
    },
    usersInChat: function usersInChat() {
      var userList = this.getUsers();
      userList.shift();
      return userList.join(', ');
    } },

  methods: {
    closeChat: function closeChat(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      this.$root.removeChat(this.index);
    },
    expand: function expand() {
      this.isExpanded = !this.isExpanded;
      this.scrollToBottom();
    },
    getUser: function getUser(userIndex) {
      return this.chatdata.users[userIndex].username;
    },
    getUsers: function getUsers() {
      var users = [];
      this.chatdata.users.forEach(function (user) {
        users.push(user.username);
      });

      return users;
    },
    scrollToBottom: function scrollToBottom(force) {
      force = force || false;
      var chat = this.$refs.chat;
      if (!force) {
        var obj = createjs.Tween.get(chat, {}).
        to({
          scrollTop: chat.scrollHeight },
        600).play();
      } else {
        chat.scrollTop = chat.scrollHeight;
      }
    },
    sendMessage: function sendMessage(ev) {var _this = this;
      var messages = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis augue accumsan.',
      'Cras ullamcorper turpis tellus, sit amet tristique turpis fermentum eget. Vivamus iaculis.',
      'Nulla et massa feugiat, lobortis quam vitae, euismod urna. Vestibulum blandit ultrices.',
      'Morbi laoreet sollicitudin auctor. Nunc eu augue blandit, vulputate orci at, maximus.',
      'Nullam nec auctor massa. Sed felis ipsum, tincidunt vitae dapibus eu, ornare.'];

      this.chatdata.history.push({
        user: 0,
        message: this.sendMessageInput });

      this.sendMessageInput = '';
      this.scrollToBottom();
      var readTime = Math.floor(Math.random() * 5);
      if (this.readTimeout) {
        clearTimeout(this.readTimeout);
      }
      if (this.writeTimeout) {
        clearTimeout(this.writeTimeout);
      }
      this.readTimeout = setTimeout(function () {
        var writeTime = Math.floor(Math.random() * 8);
        _this.theyAreTyping = true;
        _this.scrollToBottom();

        if (_this.writeTimeout) {
          clearTimeout(_this.writeTimeout);
        }
        _this.writeTimeout = setTimeout(function () {
          var messageIndex = Math.floor(Math.random() * 5);
          var message = messages[messageIndex];

          _this.chatdata.history.push({
            user: 1,
            message: message });

          _this.theyAreTyping = false;
          _this.scrollToBottom();
        }, writeTime * 1000);
      }, readTime * 1000);
    } },

  watch: {
    sendMessageInput: function sendMessageInput(value) {
      if (value !== '') {
        this.iAmTyping = true;
      } else {
        this.iAmTyping = false;
      }
      this.scrollToBottom();
    } },

  mounted: function mounted() {
    this.scrollToBottom(true);
    var sendMessage = this.$refs['send-message'];
    if (sendMessage) {
      sendMessage.focus();
    }
    // this.scrollbar = new PerfectScrollbar(this.$refs.chat);
    // console.log(this.scrollbar)
  } });


Vue.filter('reverse', function (value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse();
});

var app = new Vue({
  el: '#app',
  data: {
    chats: [],
    validTypes: [
    'application/json',
    'vnd.api+json'],

    iconset: 'fontawesome',
    icons: [] },

  computed: {
    chatsReversed: function chatsReversed() {
      return this.chats.slice().reverse();
    } },

  watch: {
    iconset: function iconset(value) {
      this.icons.forEach(function (icon) {
        icon.iconset = value;
      });
    } },

  methods: {
    buildChat: function buildChat(index, userdata) {
      var messages = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae arcu at arcu ultrices dignissim. Cras.',
      'Aliquam nec urna vitae leo lacinia. Duis lectus, efficitur sit amet scelerisque ac, consectetur.',
      'Curabitur maximus eleifend odio vitae commodo. Duis risus.',
      'Suspendisse ullamcorper cursus pulvinar. Sed pretium purus ut.'];

      var data = {
        users: [
        {
          username: 'John Doe' }],


        history: [] };

      data.users.push({
        username: userdata.username });

      messages.forEach(function (message) {
        var user = Math.random() > 0.5 ? 1 : 0;
        data.history.push({
          user: user,
          message: message });

      });
      data.id = index;
      return data;
    },
    chatWith: function chatWith(index, userdata) {
      var _chat = this.buildChat(index, userdata);
      this.chats.unshift(_chat);
    },
    focusChat: function focusChat(index) {
      var chat = this.$refs['index-' + index];
      if (chat) {
        chat.$refs['send-message'].focus();
      }
    },
    getData: function getData(url) {var _this2 = this;
      return fetch(url, { cors: false }).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText + '. ' + urlUsers);
        }
        var contentType = response.headers.get('content-type');
        var valid = false;
        if (contentType) {
          _this2.validTypes.forEach(function (type) {
            if (contentType.includes(type)) {
              valid = true;
            }
          });
          if (valid === true) {
            return response.json();
          }
        }
        throw new TypeError('Content returned from "' + url + '" is not valid json. \ncontentType: ' + contentType);
      }).catch(function (err) {
        console.error(err);
      });
    },
    lookupChatByIndex: function lookupChatByIndex(index) {
      var ret = false;
      this.chats.forEach(function (chat) {
        if (chat.id === index) {
          ret = chat;
        }
      });
      return ret;
    },
    removeChat: function removeChat(index) {
      this.chats.splice(this.index, 1);
    },
    wobble: function wobble(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var el = ev.target;
      if (!el.classList.contains('wobbler')) {
        el = el.parentNode;
      }
      el.classList.add('wobble');
      setTimeout(function () {
        el.classList.remove('wobble');
      }, 500);
    } },

  mounted: function mounted() {var _this3 = this;
    var chatPanel = this.$refs['chat-panel'];
    chatPanel.isLoaded = false;
    this.getData(url.users).then(function (userData) {
      _this3.getData(url.photos).then(function (photoData) {
        userData.forEach(function (user, userIndex) {
          user.photo = photoData.results[userIndex].picture.thumbnail;
          chatPanel.addUser(user);
        });
        chatPanel.hideAjax();
      });
    });
  } });