import axios from 'axios'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AddMagicItem from './AddMagicItem'
import ChartMagicItem from './ChartMagicItem'
import EditMagicItem from './EditMagicItem'
import './Home.css'
import { IMagicItem } from './MagicItem'
import MagicItemList from './MagicItemList'
import NetworkStatusChecker from './NetworkStatusChecker'

function Home() {
    const [itemList, setItemList] = useState([] as IMagicItem[])

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showChart, setShowChart] = useState(false)

    const [editData, setEditData] = useState({} as IMagicItem)
    const [filterData, setFilterData] = useState('')

    useEffect(() => {
        axios.get('//localhost:3000/').then(res => {
            setItemList(res.data)
        })
    }, [])

    useEffect(() => {
        const socket = io('//localhost:3000')

        socket.on('entityAdded', () => {
            axios.get('//localhost:3000/').then(res => {
                setItemList(res.data)
            })
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

    const addMagicItemHnd = (data: IMagicItem) => {
        setItemList([...itemList, data])
    }

    const deleteMagicItemHnd = (data: IMagicItem) => {
        axios.delete('//localhost:3000/' + data.id).then(res => {
            setItemList(res.data)
        })
    }

    const editMagicItemHnd = (data: IMagicItem) => {
        changeEditVisiblity()
        setEditData(data)
    }

    const updateMagicItemHnd = (data: IMagicItem) => {
        axios.put('//localhost:3000/' + data.id, data).then(res => {
            setItemList(res.data)
        })
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
