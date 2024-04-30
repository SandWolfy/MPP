import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Context } from '../main'
import AddBuff from './AddBuff'
import AddMagicItem from './AddMagicItem'
import BuffList from './BuffList'
import ChartBuff from './ChartBuff'
import ChartMagicItem from './ChartMagicItem'
import EditBuff from './EditBuff'
import EditMagicItem from './EditMagicItem'
import './Home.css'
import { IBuff, IMagicItem } from './Interfaces'
import MagicItemList from './MagicItemList'

function Home() {
    const context = useContext(Context)

    if (!context) {
        throw Error('useMagicItemContext can only be used inside a MagicItemProvider')
    }

    const { itemList, buffList, addMagicItemHnd, addBuffHnd, deleteMagicItemHnd, deleteBuffHnd, updateMagicItemHnd, updateBuffHnd, getMagicItemHnd, getBuffHnd } = context

    const [currentScreen, setCurrentScreen] = useState('items')
    const changeScreen = () => {
        setCurrentScreen(currentScreen == 'items' ? 'buffs' : 'items')

        setShowAdd(false)
        setShowEdit(false)
        setShowChart(false)
        setEditItemData({} as IMagicItem)
        setEditBuffData({} as IBuff)
        setFilterData('')
    }

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showChart, setShowChart] = useState(false)

    const [editItemData, setEditItemData] = useState({} as IMagicItem)
    const [editBuffData, setEditBuffData] = useState({} as IBuff)
    const [filterData, setFilterData] = useState('')

    useEffect(() => {
        const socket = io('//localhost:3000')

        socket.on('entityAdded', () => {
            getMagicItemHnd()
            getBuffHnd()
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
        setEditItemData(data)
    }

    const editBuffHnd = (data: IBuff) => {
        changeEditVisiblity()
        setEditBuffData(data)
    }

    const onFilterChangeHnd = (e: any) => {
        setFilterData(e.target.value)
    }

    return (
        <>
            {currentScreen == 'items' && (
                <>
                    {showAdd && <AddMagicItem onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addMagicItemHnd} />}
                    {showEdit && <EditMagicItem data={editItemData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateMagicItemHnd} />}
                    {showChart && <ChartMagicItem list={itemList} onCloseBtnClickHnd={changeChartVisibility} />}

                    <header className='page-header'>
                        <h1>Magic Items</h1>
                    </header>

                    <section className='content'>
                        <span className='info-text'>Name Filter:</span>
                        <input type='text' onChange={onFilterChangeHnd} />
                        <input className='input-button input-outside float-right' type='button' value='Add Magic Item' onClick={changeAddVisiblity} />
                        <input className='input-button input-outside float-right mr-10' type='button' value='Change to Buff' onClick={changeScreen} />
                        <MagicItemList list={itemList} filter={filterData} onDeleteClickHnd={deleteMagicItemHnd} onEditClickHnd={editMagicItemHnd} />
                        <input className='input-button input-outside float-right' type='button' value='Show Charts' onClick={changeChartVisibility}></input>
                    </section>
                </>
            )}
            {currentScreen == 'buffs' && (
                <>
                    {showAdd && <AddBuff onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addBuffHnd} />}
                    {showEdit && <EditBuff data={editBuffData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateBuffHnd} />}
                    {showChart && <ChartBuff list={buffList} onCloseBtnClickHnd={changeChartVisibility} />}

                    <header className='page-header'>
                        <h1>Buffs</h1>
                    </header>

                    <section className='content'>
                        <span className='info-text'>Name Filter:</span>
                        <input type='text' onChange={onFilterChangeHnd} />
                        <input className='input-button input-outside float-right' type='button' value='Add Buff' onClick={changeAddVisiblity} />
                        <input className='input-button input-outside float-right mr-10' type='button' value='Change to Magic Items' onClick={changeScreen} />
                        <BuffList list={buffList} filter={filterData} onDeleteClickHnd={deleteBuffHnd} onEditClickHnd={editBuffHnd} />
                        <input className='input-button input-outside float-right' type='button' value='Show Charts' onClick={changeChartVisibility} />
                    </section>
                </>
            )}
        </>
    )
}

export default Home
