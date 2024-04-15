import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { IMagicItem } from './MagicItem'
import './ModalStyle.css'

ChartJS.register()

type Props = {
    list: IMagicItem[]
    onCloseBtnClickHnd: () => void
}

function ChartMagicItem(props: Props) {
    const { list, onCloseBtnClickHnd } = props

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-big'>
                <h3>Bar Chart</h3>
                <Bar
                    data={{
                        labels: list.map(magicItem => magicItem.name),
                        datasets: [
                            {
                                label: 'Price',
                                data: list.map(magicItem => magicItem.price),
                            },
                        ],
                    }}
                    className='chart-stuff'
                />
                <input className='modal-button-input' type='button' value='Close' onClick={onCloseBtnClickHnd} />
            </div>
        </>
    )
}

export default ChartMagicItem
