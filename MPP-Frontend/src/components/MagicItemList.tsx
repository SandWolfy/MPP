import { useState } from 'react'
import { IMagicItem, IUser } from './Interfaces'
import './MagicItemList.css'
import MagicItemListContents from './MagicItemListContents'

type Props = {
    list: IMagicItem[]
    filter: string
    userdata: IUser
    onDeleteClickHnd: (data: IMagicItem) => void
    onEditClickHnd: (data: IMagicItem) => void
}

function MagicItemList(props: Props) {
    const { list, filter, userdata, onDeleteClickHnd, onEditClickHnd } = props

    const [currentPage, setCurrentPage] = useState(1)

    const contentLength = filter == '' ? list.length : list.filter(x => x.name.includes(filter)).length
    const recordsPerPage = 10
    const firstIndex = (currentPage - 1) * recordsPerPage
    const records = filter == '' ? list.slice(firstIndex, firstIndex + recordsPerPage) : list.filter(x => x.name.includes(filter)).slice(firstIndex, firstIndex + recordsPerPage)
    const pageCount = Math.ceil(contentLength / recordsPerPage)

    let numbers
    if (pageCount > 2) {
        if (currentPage == 1) numbers = [1, 2, 3]
        else if (currentPage == pageCount) numbers = [pageCount - 2, pageCount - 1, pageCount]
        else numbers = [currentPage - 1, currentPage, currentPage + 1]
    } else if (pageCount > 1) {
        numbers = [1, 2]
    } else numbers = [1]

    const prevPage = () => {
        const newPage = Math.max(currentPage - 1, 1)
        setCurrentPage(newPage)
    }

    const nextPage = () => {
        const newPage = Math.min(currentPage + 1, pageCount)
        setCurrentPage(newPage)
    }

    const changePage = (n: number) => {
        const maxPage = Math.min(n, pageCount)
        const newPage = Math.max(maxPage, 1)
        setCurrentPage(newPage)
    }

    return (
        <>
            <table>
                <tr>
                    <td>Name</td>
                    <td>Location</td>
                    <td>Usable Classes</td>
                    <td>Price</td>
                    {userdata.role != 0 && <td>Actions</td>}
                </tr>
                <MagicItemListContents list={records} userdata={userdata} onDeleteClickHnd={onDeleteClickHnd} onEditClickHnd={onEditClickHnd} />
            </table>
            <div>
                <input className='input-button' type='button' value='<' onClick={prevPage} />
                {numbers.map(n => (
                    <input className={`input-button ${currentPage == n ? 'selected-button' : ''}`} type='button' value={n} onClick={() => changePage(n)} />
                ))}
                <input className='input-button' type='button' value='>' onClick={nextPage} />
            </div>
        </>
    )
}

export default MagicItemList
