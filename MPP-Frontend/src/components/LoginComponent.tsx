import axios from 'axios'
import { useEffect, useState } from 'react'
import { IUser } from './Interfaces'

declare global {
    interface Window {
        timeoutId: null | undefined | ReturnType<typeof setTimeout>
    }
}

type Props = {
    onBackBtnClickHnd: () => void
}

function LoginComponent(props: Props) {
    const { onBackBtnClickHnd } = props

    const [registerVisible, setRegisterVisible] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState({} as IUser)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')

            const response = await axios.get('//localhost:3000/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setUserData(response.data[0])

            if (token) {
                setLoggedIn(true)
            }
        }

        fetchData()
    }, [])

    const onUsernameChangeHnd = (e: any) => {
        setUsername(e.target.value)
    }

    const onPasswordChangeHnd = (e: any) => {
        setPassword(e.target.value)
    }

    const switchMode = () => {
        setRegisterVisible(!registerVisible)
    }

    const submitForm = () => {
        if (registerVisible) {
            register()
        } else {
            login()
        }
    }

    const register = () => {
        axios.post('//localhost:3000/register', { username, password }).then(
            res => {
                const token = res.data
                localStorage.setItem('token', token)
            },
            err => {
                setErrorMessage(err.response.data)
            },
        )
    }

    const login = () => {
        axios.post('//localhost:3000/login', { username, password }).then(
            res => {
                const token = res.data
                localStorage.setItem('token', token)
            },
            err => {
                setErrorMessage(err.response.data)
            },
        )
    }

    const setErrorMessage = (text: string) => {
        if (window.timeoutId) {
            clearTimeout(window.timeoutId)
        }

        setErrorMsg(text)
        if (text != '') {
            window.timeoutId = setTimeout(() => {
                setErrorMessage('')
            }, 5000)
        }
    }

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-small'>
                {!loggedIn && (
                    <>
                        {!registerVisible && <h2>Login</h2>}
                        {registerVisible && <h2>Register</h2>}
                        <div>
                            <label>Username: </label>
                            <input className='modal-text-input' type='text' value={username} onChange={onUsernameChangeHnd} />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input className='modal-text-input' type='password' value={password} onChange={onPasswordChangeHnd} />
                        </div>
                        <div className='login-switch-text' onClick={switchMode}>
                            Switch to {registerVisible && 'Login'} {!registerVisible && 'Register'}
                        </div>
                        <div>
                            <input className='modal-button-input' type='button' onClick={submitForm} value={registerVisible ? 'Register' : 'Login'} />
                            <input className='modal-button-input' type='button' value='Cancel' onClick={onBackBtnClickHnd} />
                        </div>
                        <div className='error-msg'>{errorMsg}</div>
                    </>
                )}
                {loggedIn && (
                    <>
                        <div>Welcome to your profile {userData.username}</div>
                        <div>Here is your bio:</div>
                        <div>{userData.description}</div>
                        <input className='modal-button-input' type='button' value='Close' onClick={onBackBtnClickHnd} />
                    </>
                )}
            </div>
        </>
    )
}

export default LoginComponent
