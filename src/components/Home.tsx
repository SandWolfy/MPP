import { useEffect, useState } from 'react'
import AddMagicItem from './AddMagicItem'
import EditMagicItem from './EditMagicItem'
import './Home.css'
import { IMagicItem } from './MagicItem'
import MagicItemList from './MagicItemList'

function Home() {
    const [itemList, setItemList] = useState([] as IMagicItem[])
    const [nextID, setNextID] = useState(0)

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const [editData, setEditData] = useState({} as IMagicItem)

    useEffect(() => {
        const listInString = window.localStorage.getItem('ItemList')
        if (listInString) {
            setItemList(JSON.parse(listInString))
            const nextIDInString = window.localStorage.getItem('NextID')
            if (nextIDInString) setNextID(JSON.parse(nextIDInString))
        }
    }, [])

    const _setItemList = (list: IMagicItem[]) => {
        setItemList(list)
        window.localStorage.setItem('ItemList', JSON.stringify(list))
        window.localStorage.setItem('NextID', JSON.stringify(nextID + 1))
    }

    const changeAddVisiblity = () => {
        setShowAdd(!showAdd)
    }

    const changeEditVisiblity = () => {
        setShowEdit(!showEdit)
    }

    const addMagicItemHnd = (data: IMagicItem) => {
        _setItemList([...itemList, data])
        setNextID(nextID + 1)
    }

    const deleteMagicItemHnd = (data: IMagicItem) => {
        const indexToDelete = itemList.indexOf(data)
        const tempList = [...itemList]

        tempList.splice(indexToDelete, 1)
        _setItemList(tempList)
    }

    const editMagicItemHnd = (data: IMagicItem) => {
        changeEditVisiblity()
        setEditData(data)
    }

    const updateMagicItemHnd = (data: IMagicItem) => {
        const filteredData = itemList.filter(x => x.id == data.id)[0]
        const indexToUpdate = itemList.indexOf(filteredData)

        const tempData = [...itemList]
        tempData[indexToUpdate] = data

        _setItemList(tempData)
    }

    return (
        <>
            {showAdd && <AddMagicItem onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addMagicItemHnd} newID={nextID} />}
            {showEdit && <EditMagicItem data={editData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateMagicItemHnd} />}

            <header className='page-header'>
                <h1>Magic Items</h1>
            </header>

            <section className='content'>
                <input className='input-button input-outside' type='button' value='Add Magic Item' onClick={changeAddVisiblity} />
                <MagicItemList list={itemList} onDeleteClickHnd={deleteMagicItemHnd} onEditClickHnd={editMagicItemHnd} />
            </section>
        </>
    )
}

export default Home
