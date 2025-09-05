const apiUrl = process.env.REACT_APP_API_URL

export const getContactInfo = async (setContacts, setOfficials) => {
    let myContacts = {}
    let myOfficials = {}

    try {
        let res = await fetch(`http://${apiUrl}/contacts`)

        if (!res.ok) {
            throw new Error('Failed to fetch: ' + res.error)
        }
        let json = await res.json()
        console.log(json)

        myContacts = json.info
        myOfficials = json.officials
    } catch (e) {
        console.log('Failed to fetch: ' + e)
    } finally {
        setContacts(myContacts)
        setOfficials(myOfficials)
    }
}