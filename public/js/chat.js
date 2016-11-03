var socket = io()

function scrollToBottom () {
  var messages = $('#messages'),
      newMessage = messages.children('li:last-child'),
      clientHeight = messages.prop('clientHeight'),
      scrollTop    = messages.prop('scrollTop'),
      scrollHeight = messages.prop('scrollHeight'),
      newMessageHeight = newMessage.innerHeight(),
      lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  var params = $.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>')

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user))
  })

  $('#users').html(ol)
})

socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a')
  var template = $('#message-template').html()
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  })

  $('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a')
  var template = $('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formatedTime,
    url: message.url
  })

  $('#messages').append(html)
  scrollToBottom()
})

$('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextbox = $('input[name=message]')

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
})

var locationButton = $('#send-location')

locationButton.on('click', function () {
  if (!navigator.geolocation)
    return alert('Geolocation not supported by your browser.')

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send location')
  }, function () {
    alert('Unable to fetch location.')
    locationButton.removeAttr('disabled').text('Send location')
  })
})
