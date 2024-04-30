import { useState } from 'react'
import './ModalStyle.css'

type Props = {
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: any) => void
}

function AddBuff(props: Props) {
    const { onBackBtnClickHnd, onSubmitHnd } = props

    const [itemID, setItemID] = useState(0)
    const [name, setName] = useState('')
    const [intensity, setIntensity] = useState(0)

    const onItemIDChangeHnd = (e: any) => {
        setItemID(e.target.value)
    }

    const onNameChangeHnd = (e: any) => {
        setName(e.target.value)
    }

    const onIntensityChangeHnd = (e: any) => {
        setIntensity(e.target.value)
    }

    const onSubmitClickHnd = (e: any) => {
        e.preventDefault()
        const newBuff = {
            mid: itemID,
            name: name,
            intensity: intensity,
        }

        onSubmitHnd(newBuff)
        onBackBtnClickHnd()
    }

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-small'>
                <h3>Add Buff Form</h3>
                <form onSubmit={onSubmitClickHnd}>
                    <div>
                        <label>ItemID: </label>
                        <input className='modal-text-input' type='text' value={itemID} onChange={onItemIDChangeHnd} />
                    </div>
                    <div>
                        <label>Name: </label>
                        <input className='modal-text-input' type='text' value={name} onChange={onNameChangeHnd} />
                    </div>
                    <div>
                        <label>Intensity: </label>
                        <input className='modal-text-input' type='text' value={intensity} onChange={onIntensityChangeHnd} />
                    </div>
                    <div>
                        <input className='modal-button-input' type='button' value='Back' onClick={onBackBtnClickHnd} />
                        <input className='modal-button-input' type='submit' value='Add Buff' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBuff
