var fb = new Firebase('https://tremendus-ember-app.firebaseio.com/codeclub')

var data = {
  users: fb.child('users'),
  rooms: fb.child('rooms')
}

var session = window.session = {
  user: {}
}

fb.onAuth(function (user) {
  console.log('auth():session', session)
  if (user) {
    session.user = user
    save(user)
  }
})

function save (user) {
  console.log('save()', user)
  data.users.child(user.uid).set(user)
}

var vue = new Vue({
  name: 'App',
  el: "#app",
  data: function () {
    return {
      session: window.session,
      user: {
        alias: ''
      },
      room: {
        name: ''
      },
      users: {},
      rooms: {}
    }
  },
  created: function () {
    data.users.on('value', function (snapshot) {
      vue.$set('users', snapshot.val())
    })
    data.rooms.on('value', function (snapshot) {
      vue.$set('rooms', snapshot.val())
    })
  },
  methods: {
    save: function (model) {
      console.log('model', model)
      var _model = this.$get(model)
      _model.addedBy = this.session.user.google.displayName
      data[model+'s'].push(_model)
      this[model] = { alias: null, name: null }
    },
    login: function () {
      fb.authWithOAuthPopup('google', function (user) {
        console.log('loggedIn', user)
      }, { scope: 'email' })
    },
    logout: function () {
      fb.unauth()
      window.session.user = {}
    }
  }
})

console.log('vue', vue)
