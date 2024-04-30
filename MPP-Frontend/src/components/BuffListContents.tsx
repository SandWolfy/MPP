import { IBuff } from './Interfaces'

type Props = {
    list: IBuff[]
    onDeleteClickHnd: (data: IBuff) => void
    onEditClickHnd: (data: IBuff) => void
}

function BuffListContents(props: Props) {
    const { list, onDeleteClickHnd, onEditClickHnd } = props

    return (
        <>
            {list.map(magicItem => {
                return (
                    <tr key={magicItem.bid}>
                        <td>{magicItem.mid}</td>
                        <td>{magicItem.name}</td>
                        <td>{magicItem.intensity}</td>
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

export default BuffListContents
