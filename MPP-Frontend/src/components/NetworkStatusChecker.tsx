import axios from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface INetworkContext {
    storageLocation: string
}

const NetworkContext = createContext<INetworkContext | undefined>(undefined)

interface NetworkProviderProps {
    children: ReactNode
}

const NetworkProvider = ({ children }: NetworkProviderProps) => {
    const [internetStatus, setInternetStatus] = useState(false)
    const [serverStatus, setServerStatus] = useState(false)
    const [storageLocation, setStorageLocation] = useState('local')

    useEffect(() => {
        const checkOnlineStatus = async () => {
            try {
                const response = await fetch('https://www.example.com', { method: 'HEAD' })
                setInternetStatus(response.status >= 200 && response.status < 300)
            } catch (error) {
                setInternetStatus(false)
            }
        }

        checkOnlineStatus()

        const interval = setInterval(checkOnlineStatus, 2500)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await axios.get('https://localhost:3000/items')
                setServerStatus(true)
            } catch (e) {
                setServerStatus(false)
            }
        }

        checkServerStatus()

        const interval = setInterval(checkServerStatus, 2500)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const intervalStorageChanges = () => {
            setStorageLocation(internetStatus && serverStatus ? 'server' : 'local')
        }

        const interval = setInterval(intervalStorageChanges, 2500)

        return () => clearInterval(interval)
    }, [internetStatus, serverStatus])

    return <NetworkContext.Provider value={{ storageLocation }}>{children}</NetworkContext.Provider>
}

export { NetworkContext, NetworkProvider }
