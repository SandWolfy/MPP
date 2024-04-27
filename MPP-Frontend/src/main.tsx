import axios from 'axios'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import { IMagicItem } from './components/MagicItem'
import './main.css'

interface IMagicItemContext {
    itemList: any[]
    addMagicItemHnd: (item: any) => void
    deleteMagicItemHnd: (item: any) => void
    updateMagicItemHnd: (item: any) => void
    getMagicItemHnd: () => void
}

const MagicItemContext = createContext<IMagicItemContext | undefined>(undefined)

interface MagicItemProviderProps {
    children: ReactNode
}

const MagicItemProvider = ({ children }: MagicItemProviderProps) => {
    const [itemList, setItemList] = useState([] as IMagicItem[])

    useEffect(() => {
        axios.get('//localhost:3000/').then(res => {
            setItemList(res.data)
        })
    }, [])

    const addMagicItemHnd = (data: IMagicItem) => {
        setItemList([...itemList, data])
    }

    const deleteMagicItemHnd = (data: IMagicItem) => {
        axios.delete('//localhost:3000/' + data.id).then(res => {
            setItemList(res.data)
        })
    }

    const updateMagicItemHnd = (data: IMagicItem) => {
        axios.put('//localhost:3000/' + data.id, data).then(res => {
            setItemList(res.data)
        })
    }

    const getMagicItemHnd = () => {
        axios.get('//localhost:3000/').then(res => {
            setItemList(res.data)
        })
    }

    return <MagicItemContext.Provider value={{ itemList, addMagicItemHnd, deleteMagicItemHnd, updateMagicItemHnd, getMagicItemHnd }}>{children}</MagicItemContext.Provider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MagicItemProvider>
            <Home />
        </MagicItemProvider>
    </React.StrictMode>,
)

export { MagicItemContext }
