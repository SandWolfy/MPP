import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AddMagicItem from './AddMagicItem'
import ChartMagicItem from './ChartMagicItem'
import EditMagicItem from './EditMagicItem'
import './Home.css'
import { IMagicItem } from './MagicItem'
import MagicItemList from './MagicItemList'
import NetworkStatusChecker from './NetworkStatusChecker'
import { MagicItemContext } from '../main'

function Home() {
    const context = useContext(MagicItemContext)

    if (!context) {
        throw Error("useMagicItemContext can only be used inside a MagicItemProvider")
    }

    const { itemList, addMagicItemHnd, deleteMagicItemHnd, updateMagicItemHnd, getMagicItemHnd } = context;

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showChart, setShowChart] = useState(false)

    const [editData, setEditData] = useState({} as IMagicItem)
    const [filterData, setFilterData] = useState('')

    useEffect(() => {
        const socket = io('//localhost:3000')

        socket.on('entityAdded', () => {
            getMagicItemHnd();
        })

        return () => {
            socket.disconnect()
        }
    })

    const changeAddVisiblity = () => {
        setShowAdd(!showAdd)
    }

    const changeEditVisiblity = () => {
        setShowEdit(!showEdit)
    }

    const changeChartVisibility = () => {
        setShowChart(!showChart)
    }

    const editMagicItemHnd = (data: IMagicItem) => {
        changeEditVisiblity()
        setEditData(data)
    }
    const onFilterChangeHnd = (e: any) => {
        setFilterData(e.target.value)
    }

    return (
        <>
            {showAdd && <AddMagicItem onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addMagicItemHnd} />}
            {showEdit && <EditMagicItem data={editData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateMagicItemHnd} />}
            {showChart && <ChartMagicItem list={itemList} onCloseBtnClickHnd={changeChartVisibility} />}
            <NetworkStatusChecker />

            <header className='page-header'>
                <h1>Magic Items</h1>
            </header>

            <section className='content'>
                <span className='info-text'>Name Filter:</span>
                <input type='text' onChange={onFilterChangeHnd} />
                <input className='input-button input-outside float-right' type='button' value='Add Magic Item' onClick={changeAddVisiblity} />
                <MagicItemList list={itemList} filter={filterData} onDeleteClickHnd={deleteMagicItemHnd} onEditClickHnd={editMagicItemHnd} />
                <input className='input-button input-outside float-right' type='button' value='Show Charts' onClick={changeChartVisibility}></input>
            </section>
        </>
    )
}

export default Home
