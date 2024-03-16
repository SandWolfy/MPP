import { IMagicItem } from './MagicItem'
import './MagicItemList.css'

type Props = {
    list: IMagicItem[]
    onDeleteClickHnd: (data: IMagicItem) => void
    onEditClickHnd: (data: IMagicItem) => void
}

function MagicItemList(props: Props) {
    const { list, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Location</td>
                    <td>Usable Classes</td>
                    <td>Actions</td>
                </tr>
                {list.map((magicItem) => {
                    return (
                        <tr key={magicItem.id}>
                            <td>{magicItem.id}</td>
                            <td>{magicItem.name}</td>
                            <td>{magicItem.location}</td>
                            <td>{magicItem.usableClass}</td>
                            <td>
                                <div>
                                    <input className='input-button input-table' type='button' value='Delete' onClick={() => onDeleteClickHnd(magicItem)} />
                                    <input className='input-button input-table' type='button' value='Edit' onClick={() => onEditClickHnd(magicItem)} />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

export default MagicItemList
