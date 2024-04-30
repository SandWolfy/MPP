import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { IBuff } from './Interfaces'
import './ModalStyle.css'

ChartJS.register()

type Props = {
    list: IBuff[]
    onCloseBtnClickHnd: () => void
}

function ChartBuff(props: Props) {
    const { list, onCloseBtnClickHnd } = props

    return (
        <>
            <div className='modal-background'></div>
            <div className='modal-content modal-big'>
                <h3>Bar Chart</h3>
                <Bar
                    data={{
                        labels: list.map(buff => buff.name),
                        datasets: [
                            {
                                label: 'Intensity',
                                data: list.map(buff => buff.intensity),
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

export default ChartBuff
