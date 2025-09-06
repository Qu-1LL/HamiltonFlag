
const { attemptLogin } = require('../controllers/handleLogging.js')

test('Try logging in as official', () => {

    let userData = attemptLogin('James', 'password')
    expect(userData.id).toBe(1)

})

test('Try logging in as admin', () => {

    let userData = attemptLogin('Arthur', 'password')
    expect(userData.id).toBe(0)

})

test('Try logging in as coach', () => {

    let userData = attemptLogin('Joshua', 'password')
    expect(userData.id).toBe(178)

})

test('Try logging in as nobody', () => {

    let userData = attemptLogin('James', 'NOT A PASSWORD')
    
    expect(userData).toBe(null)

})