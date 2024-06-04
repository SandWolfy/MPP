import { IBuff, IUser } from './Interfaces'

type Props = {
    list: IBuff[]
    userdata: IUser
    onDeleteClickHnd: (data: IBuff) => void
    onEditClickHnd: (data: IBuff) => void
}

function BuffListContents(props: Props) {
    const { list, userdata, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            {list.map(magicItem => {
                return (
                    <tr key={magicItem.bid}>
                        <td>{magicItem.mid}</td>
                        <td data-cy='buffName'>{magicItem.name}</td>
                        <td>{magicItem.intensity}</td>
                        {userdata.role != 0 && (
                            <td>
                                <div>
                                    <input data-cy='buffDeleteButton' className='input-button input-table float-right' type='button' value='Delete' onClick={() => onDeleteClickHnd(magicItem)} />
                                    <input className='input-button input-table float-right' type='button' value='Edit' onClick={() => onEditClickHnd(magicItem)} />
                                </div>
                            </td>
                        )}
                    </tr>
                )
            })}
        </>
    )
}

export default BuffListContents
