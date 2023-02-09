import { useState } from "react";
import { handleUpdate, nothing } from "./utils";
import { login, register } from "./endpoints";

const Login = ({registering, onSuccess=nothing}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState({})

    const handleLogin = callback => res => {
        if (res.status === 200) {
            setErrors({})
            callback({
                username,
                token: res.data.auth_token,
            })
        } else {
            let err = new Error(`Got unexpected response code ${res.status}`)
            err.response = {
                data: {
                    non_field_error: [ err.message ]
                }
            }
            throw err
        }
    }

    const clickHandler = event => {
        event.preventDefault()
        if (registering) {
            register({
                username, email, password,
                re_password: confirm,
            }).then(login({ username, password }))
                .then(handleLogin(onSuccess))
                .catch(err => setErrors(err.response.data || {}))
        } else {
            login({ username, password })
                .then(handleLogin(onSuccess))
                .catch(err => setErrors(err.response.data || {}))
        }
    }

    const listErrors = field => (
        errors[field] ?
        <div>
            {errors[field].map(err => <div key={`${field}: ${err}`}>{err}</div>)}
        </div> : ''
    )

    return (
        <form>
            <div>
                {listErrors('username')}
                <label htmlFor="login-username">Username</label>
                <input
                    value={username}
                    id="login-username"
                    onChange={handleUpdate(setUsername)}
                />
            </div>
            {
                registering ?
                <div>
                    {listErrors('email')}
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="email"
                        value={email}
                        id="login-email"
                        onChange={handleUpdate(setEmail)}
                    />
                </div> : ''
            }
            <div>
                {listErrors('password')}
                <label htmlFor="login-password">Password</label>
                <input
                    type="password"
                    value={password}
                    id="login-password"
                    onChange={handleUpdate(setPassword)}
                />
            </div>
            {
                registering ?
                <div>
                    {listErrors('re_password')}
                    <label htmlFor="login-confirm">Confirm Password</label>
                    <input
                        type="password"
                        value={confirm}
                        id="confirm-password"
                        onChange={handleUpdate(setConfirm)}
                    />
                </div> : ''
            }
            {listErrors('non_field_errors')}
            <button
                className="btn btn-primary"
                onClick={clickHandler}
            >{registering ? 'Register' : 'Log In'}</button>
        </form>
    )
}

export default Login;
