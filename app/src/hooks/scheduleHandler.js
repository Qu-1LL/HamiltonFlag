const apiUrl = process.env.API_URL

function convertMilitary(timeStr) {
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12; // 0 becomes 12 AM

    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

function sortGamesByDate(games) {
    return [...games].sort((a, b) => {
        if (a.date.month === b.date.month) {
            return a.date.date - b.date.date;
        }
        return a.date.month - b.date.month;
    });
}

export const loadGameData = async (setMyGames, debug = false) =>  {

    let myGames = {}

    try {
        let res = await fetch(`http://${apiUrl}/schedule`)

        if (!res.ok) {
            throw new Error('Failed to fetch: '+res.error)
        }
        let json = await res.json()

        let mySchedule = []
        for (let myItem of json.mySchedule) {
            let myDate = new Date(myItem['date'])
            let theDate = null
            if (debug) {
                theDate = new Date(2025, 3, 30)
            } else {
                theDate = new Date()
            }
            let myDiff = theDate - myDate
            if (myDiff < 0) {
                myItem['status'] = 'future'
            } else if (myDiff > 0) {
                myItem['status'] = 'past'
            } else {
                myItem['status'] = 'today'
            }

            myItem.date = {date: myDate.getDate(), month: myDate.getMonth(), year: myDate.getYear()}
            myItem.startTime = convertMilitary(myItem.startTime)
            myItem.endTime = convertMilitary(myItem.endTime)

            let homeId = myItem['homeTeam']
            let res = await fetch(`http://${apiUrl}/team?id=` + homeId)
            let json = await res.json()
            myItem['homeTeam'] = json.team

            let awayId = myItem['awayTeam']
            res = await fetch(`http://${apiUrl}/team?id=` + awayId)
            json = await res.json()
            myItem['awayTeam'] = json.team

            mySchedule.push(myItem)
            mySchedule = sortGamesByDate(mySchedule)
        }
        myGames = mySchedule
    } catch (e) {
        //setError(e)
        console.log('Failed to fetch: '+ e + e.stack)
    } finally {
        setMyGames(myGames)
    }
    
}

export const submitAvailability = async (officialId, availability) => {

    try {
        let res = await fetch(`http://${apiUrl}/availability`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'officialId': officialId,
                'availability': availability
            })
        })

        if (!res.ok) {
            throw new Error('Failed to save availability: ' + res.error)
        }

        let text = await res.text()

        console.log(text)
    } catch (e) {
        console.log('Failed to submit availabilty data: ' + e + e.stack)
    }

}

export const getOfficialsDict = async () => {

    try {
        let res = await fetch(`http://${apiUrl}//officials`)

        let json = await res.json()

        let myOfficials = json['officials']

        let myDict = {}

        for (let official of myOfficials) {
            myDict[official['id']] = official
        }

        return myDict
    } catch (e) {
        console.log('Failed to fetch: ' + e + e.stack)
        return {}
    }

}

export const getWeeklyGames = async () => {

    try {
        let res = await fetch(`http://${apiUrl}//weekly-games`)

        let json = await res.json()

        let myGames = json['games']

        return myGames
    } catch (e) {
        console.log('Failed to fetch: ' + e + e.stack)
        return []
    }

}

export const setGameOfficials = async () => {

    try {

        let res = await fetch(`http://${apiUrl}//generate-official-schedule`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }

        })

    } catch (e) {
        console.log('Error generating weekly schedule: ' + e + e.stack)
    }
}

export const removeOfficial = async (officialId, gameId) => {

    try {

        let res = await fetch(`http://${apiUrl}//remove-official`, {
            method: 'PATCH',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                'officialId': officialId,
                'gameId': gameId
            })
        })

    } catch (e) {
        console.log('Failed to fetch: ' + e + e.stack)
        throw new Error("Please catch me!")
    }

}

export const addOfficial = async (officialId, gameId) => {

    try {

        let res = await fetch(`http://${apiUrl}//add-official`, {
            method: 'PATCH',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                'officialId': officialId,
                'gameId': gameId
            })
        })

    } catch (e) {
        console.log('Failed to fetch: ' + e + e.stack)
        throw new Error("Please catch me!")
    }

}