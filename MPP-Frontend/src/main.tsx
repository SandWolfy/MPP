import axios from 'axios'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { v4 } from 'uuid'
import Home from './components/Home'
import { IBuff, IMagicItem } from './components/Interfaces'
import { NetworkContext, NetworkProvider } from './components/NetworkStatusChecker'
import './main.css'

interface IContext {
    itemList: any[]
    buffList: any[]
    addMagicItemHnd: (item: any) => void
    addBuffHnd: (item: any) => void
    deleteMagicItemHnd: (item: any) => void
    deleteBuffHnd: (item: any) => void
    updateMagicItemHnd: (item: any) => void
    updateBuffHnd: (item: any) => void
    getMagicItemHnd: () => void
    getBuffHnd: () => void
}

const Context = createContext<IContext | undefined>(undefined)

interface ProviderProps {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    const context = useContext(NetworkContext)

    if (!context) {
        throw Error('useNetworkContext can only be used inside a NetworkProvider')
    }

    const { storageLocation } = context

    const [itemList, setItemList] = useState([] as IMagicItem[])
    const [buffList, setBuffList] = useState([] as IBuff[])
    const [oldStorage, setOldStorage] = useState('local')

    useEffect(() => {
        getMagicItemHnd()
        getBuffHnd()
    }, [])

    useEffect(() => {
        const intervalStorageChanges = () => {
            if (oldStorage != storageLocation) {
                if (storageLocation === 'server') {
                    isOnline()
                }
            }
            setOldStorage(storageLocation)
            getMagicItemHnd()
            getBuffHnd()
        }

        const isOnline = () => {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key) {
                    const value = localStorage.getItem(key)
                    if (value) {
                        if (key?.includes('addItem_')) {
                            addMagicItemHnd(JSON.parse(value))
                        } else if (key?.includes('addBuff_')) {
                            addBuffHnd(JSON.parse(value))
                        } else if (key?.includes('deleteItem_')) {
                            deleteMagicItemHnd(JSON.parse(value))
                        } else if (key?.includes('deleteBuff_')) {
                            deleteBuffHnd(JSON.parse(value))
                        } else if (key?.includes('updateItem_')) {
                            updateMagicItemHnd(JSON.parse(value))
                        } else if (key?.includes('updateBuff_')) {
                            updateBuffHnd(JSON.parse(value))
                        }
                    }
                    localStorage.removeItem(key)
                }
            }
        }

        const interval = setInterval(intervalStorageChanges, 1000)

        return () => clearInterval(interval)
    }, [storageLocation, oldStorage])

    const addMagicItemHnd = (data: any) => {
        if (storageLocation === 'server') {
            axios.post('//localhost:3000/items', data).then(res => {
                setItemList([...itemList, res.data])
            })
        } else {
            localStorage.setItem('addItem_' + v4(), JSON.stringify(data))
        }
    }

    const addBuffHnd = (data: any) => {
        if (storageLocation === 'server') {
            axios.post('//localhost:3000/buffs', data).then(res => {
                setBuffList([...buffList, res.data])
            })
        } else {
            localStorage.setItem('addBuff_' + v4(), JSON.stringify(data))
        }
    }

    const deleteMagicItemHnd = (data: IMagicItem) => {
        if (storageLocation === 'server') {
            axios.delete('//localhost:3000/items/' + data.id).then(res => {
                setItemList(res.data)
            })
        } else {
            localStorage.setItem('deleteItem_' + data.id, JSON.stringify(data))
        }
    }

    const deleteBuffHnd = (data: IBuff) => {
        if (storageLocation === 'server') {
            axios.delete('//localhost:3000/buffs/' + data.bid).then(res => {
                setBuffList(res.data)
            })
        } else {
            localStorage.setItem('deleteBuff_' + data.bid, JSON.stringify(data))
        }
    }

    const updateMagicItemHnd = (data: IMagicItem) => {
        if (storageLocation === 'server') {
            axios.put('//localhost:3000/items/' + data.id, data).then(res => {
                setItemList(res.data)
            })
        } else {
            localStorage.setItem('updateItem_' + data.id, JSON.stringify(data))
        }
    }

    const updateBuffHnd = (data: IBuff) => {
        if (storageLocation === 'server') {
            axios.put('//localhost:3000/buffs/' + data.bid, data).then(res => {
                setBuffList(res.data)
            })
        } else {
            localStorage.setItem('updateBuff_' + data.bid, JSON.stringify(data))
        }
    }

    const getMagicItemHnd = () => {
        if (storageLocation === 'server') {
            axios.get('//localhost:3000/items').then(res => {
                setItemList(res.data)
                localStorage.setItem('items', JSON.stringify(res.data))
            })
        } else {
            var items = localStorage.getItem('items')
            if (items) setItemList(JSON.parse(items))
        }
    }

    const getBuffHnd = () => {
        if (storageLocation === 'server') {
            axios.get('//localhost:3000/buffs').then(res => {
                setBuffList(res.data)
                localStorage.setItem('buffs', JSON.stringify(res.data))
            })
        } else {
            var buffs = localStorage.getItem('buffs')
            if (buffs) setBuffList(JSON.parse(buffs))
        }
    }

    return <Context.Provider value={{ itemList, buffList, addMagicItemHnd, addBuffHnd, deleteMagicItemHnd, deleteBuffHnd, updateMagicItemHnd, updateBuffHnd, getMagicItemHnd, getBuffHnd }}>{children}</Context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NetworkProvider>
            <Provider>
                <Home />
            </Provider>
        </NetworkProvider>
    </React.StrictMode>,
)

export { Context }
