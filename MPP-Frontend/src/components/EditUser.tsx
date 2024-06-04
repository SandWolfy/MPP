import { useState } from 'react'
import { IUser } from './Interfaces'
import './ModalStyle.css'

type Props = {
    data: IUser
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: IUser) => void
}

function EditUser(props: Props) {
    const { data, onBackBtnClickHnd, onSubmitHnd } = props

    const [username, setUsername] = useState(data.username)
    const [role, setRole] = useState(data.role)
    const [description, setDescription] = useState(data.description)

    const onUsernameChangeHnd = (e: any) => {
        setUsername(e.target.value)
    }

    const onRoleChangeHnd = (e: any) => {
        var roleId = 0
        if (e.target.value == 'manager') roleId = 1
        else if (e.target.value == 'admin') roleId = 2

        setRole(roleId)
    }

    const onDescriptionChangeHnd = (e: any) => {
        setDescription(e.target.value)
    }

    const onSubmitClickHnd = (e: any) => {
        e.preventDefault()
        const newUser: IUser = {
            id: data.id,
            username: username,
            password: data.password,
            role: role,
            description: description,
        }

        onSubmitHnd(newUser)
        onBackBtnClickHnd()
    }

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-small'>
                <h3>Edit User Form</h3>
                <form onSubmit={onSubmitClickHnd}>
                    <div>
                        <label>Username: </label>
                        <input className='modal-text-input' type='text' value={username} onChange={onUsernameChangeHnd} />
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
                        <label>Description: </label>
                        <input className='modal-text-input' type='text' value={description} onChange={onDescriptionChangeHnd} />
                    </div>
                    <div>
                        <input className='modal-button-input' type='button' value='Back' onClick={onBackBtnClickHnd} />
                        <input className='modal-button-input' type='submit' value='Update User' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditUser
