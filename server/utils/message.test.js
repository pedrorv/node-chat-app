const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Pedro',
          text = 'Hey'

    const response = generateMessage(from, text)

    expect(response).toInclude({from, text})
    expect(response.createdAt).toBeA('number')
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Pedro',
          lat  = '30.123125125',
          lng  = '-70.12341312',
          url  = `https://www.google.com/maps?q=${lat},${lng}`

    const response = generateLocationMessage(from, lat, lng)

    expect(response).toInclude({from, url})
    expect(response.createdAt).toBeA('number')
  })
})
