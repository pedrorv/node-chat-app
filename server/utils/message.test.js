const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Mike',
          text = 'Hey'

    const response = generateMessage(from, text)

    expect(response).toInclude({from, text})
    expect(response.createdAt).toBeA('number')
  })
})
