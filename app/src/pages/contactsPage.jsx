import ContactCard from '../components/contactCard.jsx'
import '../styles/contactsPage.css'

import { getContactInfo } from '../hooks/contactsHandler.js'

import { useState, useEffect } from 'react'

export default function ContactsPage ({}) {

    const [officials, setOfficials] = useState([])
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getContactInfo(setContacts, setOfficials)
        setLoading(false)
    }, [])


    return(

        <div className="contacts-wrapper">
            
            <div className="contact-flex">
                <div className="contact-section">
                    <h2 className="contact-title">Contacts</h2>
                    <div className="contacts-container">
                        {contacts.map((contact) => (
                            <ContactCard key={contact.id} person={contact}/>
                        ))}
                        <ContactCard person={{name:'Add New Contact'}} /> {/*onClick={addNewContact} */}
                    </div>
                </div>
                <div className="contact-section">
                    <h2 className="contact-title">Officials</h2>
                    <div className="officials-container">
                        {officials.map((contact) => (
                            <ContactCard key={contact.id} person={contact}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )

}