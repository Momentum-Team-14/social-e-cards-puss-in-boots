import axios from "axios";
import { useState } from "react";
import { handleUpdate } from "./utils";
import { urls } from "./endpoints";

const Login = ({registering, onSuccess}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState({})

    const clickHandler = event => {
        event.preventDefault()
        if (registering) {
            axios.post(urls.register(), {
                username, email, password,
                re_password: confirm,
            }).then(() => axios.post(urls.login(), { username, password }))
                .then(console.log)   // TODO: store token
                .catch(err => setErrors(err.response.data || {}))
        } else {
            axios.post(urls.login(), { username, password })
                .then(console.log)   // TODO: store token
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
