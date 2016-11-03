const expect = require('expect')
const { Users } = require('./users')

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node'
    }]
  })

  it('should add new user', () => {
    const users = new Users()
    const user = { id: 1, name: 'Pedro', room: 'Node' }

    users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    const user = users.removeUser('1')

    expect(users.users.length).toBe(2)
    expect(user).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node'
    })
  })

  it('should get a user', () => {
    const user = users.getUser(users.users[1].id)

    expect(users.users[1]).toEqual(user)
  })

  it('should return room user list', () => {
    const list = users.getUserList('Node')

    expect(list.length).toEqual(2)
    expect(list).toEqual(['Mike', 'Julie'])
  })
})
