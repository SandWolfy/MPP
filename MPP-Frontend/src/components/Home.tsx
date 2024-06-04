import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Context } from '../main'
import AddBuff from './AddBuff'
import AddMagicItem from './AddMagicItem'
import AddUser from './AddUser'
import BuffList from './BuffList'
import ChartBuff from './ChartBuff'
import ChartMagicItem from './ChartMagicItem'
import EditBuff from './EditBuff'
import EditMagicItem from './EditMagicItem'
import EditUser from './EditUser'
import './Home.css'
import { IBuff, IMagicItem, IUser } from './Interfaces'
import LoginComponent from './LoginComponent'
import MagicItemList from './MagicItemList'
import UserList from './UserList'

function Home() {
    const context = useContext(Context)

    if (!context) {
        throw Error('useMagicItemContext can only be used inside a MagicItemProvider')
    }

    const { itemList, buffList, userList, userData, addMagicItemHnd, addBuffHnd, addUserHnd, deleteMagicItemHnd, deleteBuffHnd, deleteUserHnd, updateMagicItemHnd, updateBuffHnd, updateUserHnd, getMagicItemHnd, getBuffHnd, getUserHnd, setLoginData } = context

    const [loggedIn, setLoggedIn] = useState(false)

    const [currentScreen, setCurrentScreen] = useState('items')
    const changeScreen = (change: string) => {
        setCurrentScreen(change)

        setShowAdd(false)
        setShowEdit(false)
        setShowChart(false)
        setEditItemData({} as IMagicItem)
        setEditBuffData({} as IBuff)
        setEditUserData({} as IUser)
        setFilterData('')
    }

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showChart, setShowChart] = useState(false)

    const [editItemData, setEditItemData] = useState({} as IMagicItem)
    const [editBuffData, setEditBuffData] = useState({} as IBuff)
    const [editUserData, setEditUserData] = useState({} as IUser)
    const [filterData, setFilterData] = useState('')

    useEffect(() => {
        const socket = io('https://localhost:3000')

        socket.on('entityAdded', () => {
            getMagicItemHnd()
            getBuffHnd()
            getUserHnd()
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

    const editUserHnd = (data: IUser) => {
        changeEditVisiblity()
        setEditUserData(data)
    }

    const onFilterChangeHnd = (e: any) => {
        setFilterData(e.target.value)
    }

    const authentificate = (user: IUser) => {
        setLoginData(user)
        setLoggedIn(true)
    }

    return (
        <>
            {!loggedIn && <LoginComponent authentificate={authentificate} />}
            {loggedIn && (
                <>
                    {currentScreen == 'items' && (
                        <>
                            {showAdd && <AddMagicItem onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addMagicItemHnd} />}
                            {showEdit && <EditMagicItem data={editItemData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateMagicItemHnd} />}
                            {showChart && <ChartMagicItem list={itemList} onCloseBtnClickHnd={changeChartVisibility} />}

                            <header className='page-header'>
                                <h1>Magic Items</h1>
                                {/* <img src='person.png' className='person-picture' onClick={changeLoginVisiblity} /> */}
                            </header>

                            <section className='content'>
                                <span className='info-text'>Name Filter:</span>
                                <input type='text' onChange={onFilterChangeHnd} />
                                {userData.role != 0 && <input data-cy='addButton' className='input-button input-outside float-right' type='button' value='Add Magic Item' onClick={changeAddVisiblity} />}
                                {userData.role == 2 && <input data-cy='userSwitch' className='input-button input-outside float-right mr-10' type='button' value='Change to Users' onClick={() => changeScreen('users')} />}
                                <input data-cy='buffSwitch' className='input-button input-outside float-right mr-10' type='button' value='Change to Buff' onClick={() => changeScreen('buffs')} />
                                <MagicItemList list={itemList} userdata={userData} filter={filterData} onDeleteClickHnd={deleteMagicItemHnd} onEditClickHnd={editMagicItemHnd} />
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
                                {/* <img src='person.png' className='person-picture' onClick={changeLoginVisiblity} /> */}
                            </header>

                            <section className='content'>
                                <span className='info-text'>Name Filter:</span>
                                <input type='text' onChange={onFilterChangeHnd} />
                                {userData.role != 0 && <input data-cy='addButton' className='input-button input-outside float-right' type='button' value='Add Buff' onClick={changeAddVisiblity} />}
                                {userData.role == 2 && <input data-cy='userSwitch' className='input-button input-outside float-right mr-10' type='button' value='Change to Users' onClick={() => changeScreen('users')} />}
                                <input className='input-button input-outside float-right mr-10' type='button' value='Change to Magic Items' onClick={() => changeScreen('items')} />
                                <BuffList list={buffList} filter={filterData} userdata={userData} onDeleteClickHnd={deleteBuffHnd} onEditClickHnd={editBuffHnd} />
                                <input className='input-button input-outside float-right' type='button' value='Show Charts' onClick={changeChartVisibility} />
                            </section>
                        </>
                    )}
                    {currentScreen == 'users' && (
                        <>
                            {showAdd && <AddUser onBackBtnClickHnd={changeAddVisiblity} onSubmitHnd={addUserHnd} />}
                            {showEdit && <EditUser data={editUserData} onBackBtnClickHnd={changeEditVisiblity} onSubmitHnd={updateUserHnd} />}

                            <header className='page-header'>
                                <h1>Users</h1>
                                {/* <img src='person.png' className='person-picture' onClick={changeLoginVisiblity} /> */}
                            </header>

                            <section className='content'>
                                <span className='info-text'>Username Filter:</span>
                                <input type='text' onChange={onFilterChangeHnd} />
                                <input className='input-button input-outside float-right' type='button' value='Add User' onClick={changeAddVisiblity} />
                                <input className='input-button input-outside float-right mr-10' type='button' value='Change to Magic Items' onClick={() => changeScreen('items')} />
                                <UserList list={userList} filter={filterData} onDeleteClickHnd={deleteUserHnd} onEditClickHnd={editUserHnd} />
                            </section>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Home
