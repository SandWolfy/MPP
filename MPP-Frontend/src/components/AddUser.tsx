import { useState } from 'react'
import './ModalStyle.css'

type Props = {
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: any) => void
}

function AddUser(props: Props) {
    const { onBackBtnClickHnd, onSubmitHnd } = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')

    const onUsernameChangeHnd = (e: any) => {
        setUsername(e.target.value)
    }

    const onPasswordChangeHnd = (e: any) => {
        setPassword(e.target.value)
    }

    const onRoleChangeHnd = (e: any) => {
        setRole(e.target.value)
    }

    const onSubmitClickHnd = (e: any) => {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
            role: role,
        }

        onSubmitHnd(newUser)
        onBackBtnClickHnd()
    }

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-small'>
                <h3>Add User Form</h3>
                <form onSubmit={onSubmitClickHnd}>
                    <div>
                        <label>Username: </label>
                        <input className='modal-text-input' type='text' value={username} onChange={onUsernameChangeHnd} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input className='modal-text-input' type='password' value={password} onChange={onPasswordChangeHnd} />
                    </div>
                    <div>
                        <label>Role: </label>
                        <select onChange={onRoleChangeHnd}>
                            <option value='user'>User</option>
                            <option value='manager'>Manager</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    <div>
                        <input className='modal-button-input' type='button' value='Back' onClick={onBackBtnClickHnd} />
                        <input className='modal-button-input' type='submit' value='Add User' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddUser
