import { IMagicItem } from './MagicItem'

type Props = {
    list: IMagicItem[]
    onDeleteClickHnd: (data: IMagicItem) => void
    onEditClickHnd: (data: IMagicItem) => void
}

function MagicItemListContents(props: Props) {
    const { list, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            {list.map(magicItem => {
                return (
                    <tr key={magicItem.id}>
                        <td>{magicItem.name}</td>
                        <td>{magicItem.location}</td>
                        <td>{magicItem.usableClass}</td>
                        <td>{magicItem.price}</td>
                        <td>
                            <div>
                                <input className='input-button input-table float-right' type='button' value='Delete' onClick={() => onDeleteClickHnd(magicItem)} />
                                <input className='input-button input-table float-right' type='button' value='Edit' onClick={() => onEditClickHnd(magicItem)} />
                            </div>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

export default MagicItemListContents
