import { IUser } from './Interfaces'

type Props = {
    list: IUser[]
    onDeleteClickHnd: (data: IUser) => void
    onEditClickHnd: (data: IUser) => void
}

function UserListContents(props: Props) {
    const { list, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            {list.map(user => {
                return (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.description}</td>
                        <td>
                            <div>
                                <input className='input-button input-table float-right' type='button' value='Delete' onClick={() => onDeleteClickHnd(user)} />
                                <input className='input-button input-table float-right' type='button' value='Edit' onClick={() => onEditClickHnd(user)} />
                            </div>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

export default UserListContents
