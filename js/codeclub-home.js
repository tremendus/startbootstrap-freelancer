var fb = new Firebase('https://tremendus-ember-app.firebaseio.com/codeclub')
var data = {
  users: fb.child('users'),
  rooms: fb.child('rooms')
}

var vue = new Vue({
  name: 'App',
  el: "#app",
  data: function () {
    return {
      msg: 'hello world',
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
      data[model+'s'].push(this.$get(model))
      this[model] = { alias: null, name: null }
    }
  }
})

console.log('vue', vue)
