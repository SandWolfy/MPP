import { useState } from 'react'
import AddMagicItem from './AddMagicItem'
import './Home.css'
import { dummyMagicItemList, IMagicItem } from './MagicItem'
import MagicItemList from './MagicItemList'

function Home() {
    const [itemList, setItemList] = useState(dummyMagicItemList as IMagicItem[])

    const [showAdd, setShowAdd] = useState(false)

    const [nextID, setNextID] = useState(itemList.length)

    const changeAddVisiblity = () => {
        setShowAdd(!showAdd)
    }

    const addMagicItemHnd = (data: IMagicItem) => {
        setItemList([...itemList, data])
        setNextID(nextID + 1)
    }

    const deleteMagicItemHnd = (data: IMagicItem) => {
        const indexToDelete = itemList.indexOf(data)
        const tempList = [...itemList]

        tempList.splice(indexToDelete, 1)
        setItemList(tempList)
    }

    return (
        <>
            {showAdd && <AddMagicItem onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addMagicItemHnd} newID={nextID} />}

            <header className='page-header'>
                <h1>Magic Items</h1>
            </header>

            <section className='content'>
                <input className='input-button input-outside' type='button' value='Add Magic Item' onClick={changeAddVisiblity} />
                <MagicItemList list={itemList} onDeleteClickHnd={deleteMagicItemHnd} />
            </section>
        </>
    )
}

export default Home
