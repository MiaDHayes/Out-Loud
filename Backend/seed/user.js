const db = require('../db')
const { User } = require('../models/user')

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

  const users = [
    {
        fullName: 'Mia Hayes',
        username: 'Hentanim',
        password: 'ScaryStories123',
        email: 'heyall@fake.com',
        phoneNumber: 112-345-6789,
        birthDate: '2000-11-25'
    },  
    // {
    //     fullName: 'Michael Garcia',
    //     username: 'MichaelMonte86',
    //     password: 'Christeen456',
    //     email: 'carman@fakemail.com',
    //     phoneNumber: 111-222-4563,
    //     birthDate: '1999-12-22'
    // }
]
 
    await User.insertMany(users)
  
    console.log('Created initial user accounts!')
  }
  
  const run = async () => {
    await main()
    db.close()
  }
  
  run()