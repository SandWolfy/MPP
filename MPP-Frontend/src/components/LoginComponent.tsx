import axios from 'axios'
import { useEffect, useState } from 'react'
import { IUser } from './Interfaces'

declare global {
    interface Window {
        timeoutId: null | undefined | ReturnType<typeof setTimeout>
    }
}

type Props = {
    authentificate: (user: IUser) => void
}

function LoginComponent(props: Props) {
    const { authentificate } = props

    const [registerVisible, setRegisterVisible] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')

            authWithToken(token)
        }

        fetchData()
    }, [])

    const authWithToken = async (token: any) => {
        if (token) {
            const response = await axios.get('https://localhost:3000/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            authentificate(response.data[0])
        }
    }

    const onUsernameChangeHnd = (e: any) => {
        setUsername(e.target.value)
    }

    const onPasswordChangeHnd = (e: any) => {
        setPassword(e.target.value)
    }

    const onRoleChangeHnd = (e: any) => {
        setRole(e.target.value)
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
        axios.post('https://localhost:3000/register', { username, password, role }).then(
            res => {
                const token = res.data
                localStorage.setItem('token', token)
                authWithToken(token)
            },
            err => {
                setErrorMessage(err.response.data)
            },
        )
    }

    const login = () => {
        axios.post('https://localhost:3000/login', { username, password, role }).then(
            res => {
                const token = res.data
                localStorage.setItem('token', token)
                authWithToken(token)
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
                {!registerVisible && <h2>Login</h2>}
                {registerVisible && <h2>Register</h2>}
                <div>
                    <label>Username: </label>
                    <input data-cy='usernameField' className='modal-text-input' type='text' value={username} onChange={onUsernameChangeHnd} />
                </div>
                <div>
                    <label>Password: </label>
                    <input data-cy='passwordField' className='modal-text-input' type='password' value={password} onChange={onPasswordChangeHnd} />
                </div>
                {registerVisible && (
                    <div>
                        <label>Role: </label>
                        <select onChange={onRoleChangeHnd}>
                            <option value='user'>User</option>
                            <option value='manager'>Manager</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                )}
                <div data-cy='loginSwitch' className='login-switch-text' onClick={switchMode}>
                    Switch to {registerVisible && 'Login'} {!registerVisible && 'Register'}
                </div>
                <div>
                    <input data-cy='authButton' className='modal-button-input' type='button' onClick={submitForm} value={registerVisible ? 'Register' : 'Login'} />
                </div>
                <div data-cy='errorMessage' className='error-msg'>
                    {errorMsg}
                </div>
            </div>
        </>
    )
}

export default LoginComponent
