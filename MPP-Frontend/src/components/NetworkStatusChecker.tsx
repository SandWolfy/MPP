import axios from 'axios'
import { useEffect, useState } from 'react'

function NetworkStatusChecker() {
    const [internetStatus, setInternetStatus] = useState(navigator.onLine)
    const [serverStatus, setServerStatus] = useState(true)

    useEffect(() => {
        const handleOnlineStatus = () => {
            setInternetStatus(navigator.onLine)
        }

        window.addEventListener('online', handleOnlineStatus)
        window.addEventListener('offline', handleOnlineStatus)

        return () => {
            window.removeEventListener('online', handleOnlineStatus)
            window.removeEventListener('offline', handleOnlineStatus)
        }
    }, [])

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                await axios.get('//localhost:3000')
                setServerStatus(true)
            } catch (e) {
                setServerStatus(false)
            }
        }

        checkServerStatus()

        const interval = setInterval(checkServerStatus, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {!internetStatus && (
                <div>
                    <div className='modal-background' />
                    <div className='modal-content'>
                        <h2>INTERNET IS DOWN!</h2>
                    </div>
                </div>
            )}
            {!serverStatus && (
                <div>
                    <div className='modal-background' />
                    <div className='modal-content'>
                        <h2>SERVER IS DOWN!</h2>
                    </div>
                </div>
            )}
        </>
    )
}

export default NetworkStatusChecker
