const apiUrl = process.env.API_URL

export const loginUser = async(myUsername, myPassword, setUserInfo) => {

    try {
        console.log(myUsername, myPassword)
        let res = await fetch(`http://${apiUrl}/login`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'username': myUsername,
                'password': myPassword
            })
        })
        
        let json = await res.json()

        setUserInfo(json.user)
        console.log(json.user)
    } catch (e) {
        console.log('Failed to fetch: ' + e + e.stack)
    }

}