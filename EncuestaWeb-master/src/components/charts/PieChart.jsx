import React from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)
const PieChart = ({resultadoUnitario}) => {

const data = {
    labels: resultadoUnitario.map( (la) => la.nombre ),
    datasets: [{
        label: '# of Votes',
        data: resultadoUnitario.map( (val) => val.cant ),
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}
const options = {
    
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

    return (
        <>
            <Pie
                data={ data }
                height={ 200 }
                options={ options }
            />
        </>
    )
}

export default PieChart
