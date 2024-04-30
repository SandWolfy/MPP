import { useState } from 'react'
import { IMagicItem } from './Interfaces'
import './ModalStyle.css'

type Props = {
    data: IMagicItem
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: IMagicItem) => void
}

function EditMagicItem(props: Props) {
    const { data, onBackBtnClickHnd, onSubmitHnd } = props

    const [name, setName] = useState(data.name)
    const [location, setLocation] = useState(data.location)
    const [classes, setClasses] = useState(data.usableClass)
    const [price, setPrice] = useState(data.price)

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
        const newMagicItem: IMagicItem = {
            id: data.id,
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
                <h3>Edit Magic Item Form</h3>
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
                        <input className='modal-button-input' type='submit' value='Update Magic Item' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditMagicItem
