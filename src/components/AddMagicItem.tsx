import { useState } from 'react'
import './AddMagicItem.css'
import { IMagicItem } from './MagicItem'

type Props = {
    onBackBtnClickHnd: () => void
    onSubmitHnd: (data: IMagicItem) => void
    newID: number
}

function AddMagicItem(props: Props) {
    const { onBackBtnClickHnd, onSubmitHnd, newID } = props

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [classes, setClasses] = useState('')

    const onNameChangeHnd = (e: any) => {
        setName(e.target.value)
    }

    const onLocationChangeHnd = (e: any) => {
        setLocation(e.target.value)
    }

    const onClassChangeHnd = (e: any) => {
        setClasses(e.target.value)
    }

    const onSubmitClickHnd = (e: any) => {
        e.preventDefault()
        const newMagicItem: IMagicItem = {
            id: newID,
            name: name,
            location: location,
            usableClass: classes,
        }

        onSubmitHnd(newMagicItem)
        onBackBtnClickHnd()
    }

    return (
        <>
            <div className='add-background'></div>
            <div className='add-form'>
                <h3>Add Magic Item Form</h3>
                <form onSubmit={onSubmitClickHnd}>
                    <div>
                        <label>Name: </label>
                        <input className='form-text-input' type='text' value={name} onChange={onNameChangeHnd} />
                    </div>
                    <div>
                        <label>Location: </label>
                        <input className='form-text-input' type='text' value={location} onChange={onLocationChangeHnd} />
                    </div>
                    <div>
                        <label>Usable Classes: </label>
                        <input className='form-text-input' type='text' value={classes} onChange={onClassChangeHnd} />
                    </div>
                    <div>
                        <input className='form-button-input' type='button' value='Back' onClick={onBackBtnClickHnd} />
                        <input className='form-button-input' type='submit' value='Add Magic Item' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddMagicItem
