import { useState } from 'react'
import { IBuff } from './Interfaces'
import './ModalStyle.css'

type Props = {
    data: IBuff
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: IBuff) => void
}

function EditBuff(props: Props) {
    const { data, onBackBtnClickHnd, onSubmitHnd } = props

    const [itemID, setItemID] = useState(data.mid)
    const [name, setName] = useState(data.name)
    const [intensity, setIntensity] = useState(data.intensity)

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
        const newBuff: IBuff = {
            bid: data.bid,
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
                <h3>Edit Buff Form</h3>
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
                        <input className='modal-button-input' type='submit' value='Update Buff' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditBuff
