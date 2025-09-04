const fs = require('fs')
const path = require('path')

const CURRENT_SEASON = 'SPRING 25'

function attemptLogin(username, password) {

    const filePath = path.join(__dirname,'..', 'data.json')

    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let team of division['teams']) {
            for (let coach of team['personnel']) {
                if (coach['username'] === username && coach['password'] === password) {
                    return coach
                }
            }
        }
    }

    for (let official of data['seasons'][CURRENT_SEASON]['officials']) {
        if (official['username'] === username && official['password'] === password) {
            return official
        }
    }

    for (let admin of data['Admin']) {
        if (admin['username'] === username && admin['password'] === password) {
            return admin
        }
    }

    return null

}

module.exports = { attemptLogin }