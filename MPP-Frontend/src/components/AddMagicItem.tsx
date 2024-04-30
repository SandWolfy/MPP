import { useState } from 'react'
import './ModalStyle.css'

type Props = {
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: any) => void
}

function AddMagicItem(props: Props) {
    const { onBackBtnClickHnd, onSubmitHnd } = props

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [classes, setClasses] = useState('')
    const [price, setPrice] = useState(0)

    const onNameChangeHnd = (e: any) => {
        setName(e.target.value)
    }

    const onLocationChangeHnd = (e: any) => {
        setLocation(e.target.value)
    }

    const onClassChangeHnd = (e: any) => {
        setClasses(e.target.value)
    }

    const onPriceChangeHnd = (e: any) => {
        setPrice(e.target.value)
    }

    const onSubmitClickHnd = (e: any) => {
        e.preventDefault()
        const newMagicItem = {
            name: name,
            location: location,
            usableClass: classes,
            price: price,
        }

        onSubmitHnd(newMagicItem)
        onBackBtnClickHnd()
    }

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-small'>
                <h3>Add Magic Item Form</h3>
                <form onSubmit={onSubmitClickHnd}>
                    <div>
                        <label>Name: </label>
                        <input className='modal-text-input' type='text' value={name} onChange={onNameChangeHnd} />
                    </div>
                    <div>
                        <label>Location: </label>
                        <input className='modal-text-input' type='text' value={location} onChange={onLocationChangeHnd} />
                    </div>
                    <div>
                        <label>Usable Classes: </label>
                        <input className='modal-text-input' type='text' value={classes} onChange={onClassChangeHnd} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input className='modal-text-input' type='text' value={price} onChange={onPriceChangeHnd} />
                    </div>
                    <div>
                        <input className='modal-button-input' type='button' value='Back' onClick={onBackBtnClickHnd} />
                        <input className='modal-button-input' type='submit' value='Add Magic Item' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddMagicItem
