import { useState } from "react"
import { logout } from "./endpoints"
import Login from "./Login"
import { nothing } from "./utils"

const ProfileNav = ({
    onLogin=nothing,
    onLogout=nothing,
    onProfile=nothing,
    loggedIn=false,
    username='',
}) => {
    const [loginPrompt, setLoginPrompt] = useState(false)
    const [registering, setRegistering] = useState(false)

    const showLoginPrompt = registering => e => {
        e.preventDefault()
        setLoginPrompt(true)
        setRegistering(registering)
    }

    return (
        <div id="profile-nav" style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            height: '3rem',
        }}>
            { loggedIn ? <>
                    <span style={{marginRight: '2rem'}}>Welcome, {username}!</span>
                    <div style={{marginRight: '1rem'}}>
                        <a
                            href="/#"
                            style={
                                {
                                    marginRight: '0.5em',
                                }
                            }
                            onClick={e => {
                                e.preventDefault()
                                logout()
                                onLogout({})
                            }
                        }>Logout</a>
                        <a
                            href="/#"
                            onClick={e => {
                                e.preventDefault()
                                onProfile()
                            }
                        }>Profile</a>
                    </div>
                </> : <>
                <div style={{marginRight: '1rem'}}>
                    <a href="/#" onClick={showLoginPrompt(false)}>Login</a>
                    &nbsp;or&nbsp;
                    <a href="/#" onClick={showLoginPrompt(true)}>Register</a>
                </div>
                <div style={{
                    display: loginPrompt ? '' : 'none',
                    position: 'absolute',
                    top: '3rem',
                    right: '0px'
                }}>
                    <Login
                        registering={registering}
                        onSuccess={
                            result => {
                                setLoginPrompt(false)
                                onLogin(result)
                            }
                        }
                    />
                </div></>
            }
        </div>
    )
}

export default ProfileNav
