import { useState } from 'react'
//import logo from './logo.svg'
import './App.css'
import CardDetails from './CardDetails'
//import Login from './Login'
import CardList from './CardList'
import {cards} from './mock'

import {
    Navigate,
    Routes,
    Route,
} from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'
import ProfileNav from './ProfileNav'
import CardCreate from './CardCreate'


function App() {
    const [card, setCard] = useState(null)
    const [token, setToken] = useLocalStorageState('auth-token', {
        defaultValue: null,
    })
    const [username, setUsername] = useLocalStorageState('username', {
        defaultValue: '',
    })

    const setUserDetails = data => {
        setToken(data.token || null)
        setUsername(data.username || null)
    }

    return (
        <div>
            <ProfileNav
                onLogin={setUserDetails}
                onLogout={setUserDetails}
                loggedIn={token !== null}
                username={username}
            />
            <Routes>
                <Route path="/" element={<Navigate to="cards" />} />
                <Route path="cards" element={<CardList token={token} cards={cards} onSelect={setCard} />} />
                <Route path="cards/new" element={<CardCreate token={token} />} />
                <Route path="cards/:pk" element={<CardDetails token={token} card={card} />} />
            </Routes>
        </div>
    )
}

export default App
