var socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
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
})

$('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextbox = $('input[name=message]')

  socket.emit('createMessage', {
    from: 'User',
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
