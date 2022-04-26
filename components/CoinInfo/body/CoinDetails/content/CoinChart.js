// import ReactECharts from 'echarts-for-react'
// import * as echarts from 'echarts'

// export default function CoinChart(props) {

//     const data = props.data
//         .map(r => Object.values({ time: r.time * 1000, close: r.close }))

//     const chartOptions = {
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'cross',
//                 animation: true,
//                 label: {
//                     backgroundColor: '#505765'
//                 }
//             }
//         },
//         grid: {
//             left: 45,
//             top: 15,
//             right: 5,
//             bottom: 25
//         },
//         // title: {
//         //     left: 'center',
//         //     text: `${props.symbol} to USD`
//         // },
//         xAxis: {
//             type: 'time',
//         },
//         yAxis: {
//             type: 'value',
//             // min: 'dataMin',
//             scale: true,
//             splitNumber: 6,
//             splitLine: {
//                 show: true,
//                 lineStyle: {
//                     color: 'rgb(150, 150, 150, 0.1)'
//                 }
//             }
//         },
//         dataZoom: [
//             {
//                 type: 'inside',
//                 start: 72,
//                 end: 100,
//                 zoomOnMouseWheel: false,
//             }
//         ],
//         series: [
//             {
//                 data: data,
//                 name: props.name,
//                 type: 'line',
//                 smooth: false,
//                 // animationThreshold: 5000,
//                 showSymbol: false,
//                 symbolSize: 9,
//                 sampling: 'lttb',
//                 itemStyle: {
//                     color: '#dbc500'
//                 },
//                 areaStyle: {
//                     opacity: 0.8,
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                         {
//                             offset: 0,
//                             color: '#dbc500'
//                         },
//                         {
//                             offset: 1,
//                             color: 'white'
//                         }
//                     ])
//                 },
//             }
//         ]
//     }

//     return (
//         <ReactECharts
//             style={{ height: '375px', width: '100%' }}
//             option={chartOptions}
//         />)
// }
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

export default function CoinChart(props) {
    const open = props.data.map(c => c.open)
    const time = props.data.map(c => c.time)

    const labels = []
    time.forEach(time => {
        const date = new Date(time * 1000)
        labels.push(date.getDate())
    })
    const data = {
        labels,
        datasets: [
            {
                tension: 0.1,
                data: open,
                borderColor: '#dbc500'
            },
        ],
    }
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        elements: {
            point: {
                radius: 0
            }
        },
    }
    return <Line options={options} data={data} />
}