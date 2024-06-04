import { IMagicItem, IUser } from './Interfaces'

type Props = {
    list: IMagicItem[]
    userdata: IUser
    onDeleteClickHnd: (data: IMagicItem) => void
    onEditClickHnd: (data: IMagicItem) => void
}

function MagicItemListContents(props: Props) {
    const { list, userdata, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            {list.map(magicItem => {
                return (
                    <tr key={magicItem.id}>
                        <td data-cy='itemName'>{magicItem.name}</td>
                        <td>{magicItem.location}</td>
                        <td>{magicItem.usableClass}</td>
                        <td>{magicItem.price}</td>
                        {userdata.role != 0 && (
                            <td>
                                <div>
                                    <input data-cy='itemDeleteButton' className='input-button input-table float-right' type='button' value='Delete' onClick={() => onDeleteClickHnd(magicItem)} />
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

export default MagicItemListContents
