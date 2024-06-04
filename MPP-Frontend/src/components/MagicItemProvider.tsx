// // MagicItemContext.js
// import axios from 'axios'
// import { createContext, useContext, useEffect, useState } from 'react'
// import { IMagicItem } from './MagicItem'

// export const MagicItemContext = createContext()

// export const MagicItemProvider = ({ children }) => {
//     const [itemList, setItemList] = useState([])

//     useEffect(() => {
//         axios.get('https://localhost:4000').then(res => {
//             setItemList(res.data)
//         })
//     }, [])

//     const addMagicItem = (data: IMagicItem) => {
//         setItemList([...itemList, data])
//     }

//     const deleteMagicItem = (data: IMagicItem) => {
//         axios.delete(`https://localhost:4000/` + data.id).then(res => {
//             setItemList(res.data)
//         })
//     }

//     const updateMagicItem = (data: IMagicItem) => {
//         axios.put(`https://localhost:4000/'` + data.id, data).then(res => {
//             setItemList(res.data)
//         })
//     }

//     return <MagicItemContext.Provider value={{ itemList, addMagicItem, deleteMagicItem, updateMagicItem }}>{children}</MagicItemContext.Provider>
// }

// export const useMagicItemContext = () => useContext(MagicItemContext)
