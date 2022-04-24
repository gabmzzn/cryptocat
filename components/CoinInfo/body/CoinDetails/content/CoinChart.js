import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'

export default function CoinChart(props) {

    const data = props.data
        .map(r => Object.values({ time: r.time * 1000, close: r.close }))

    const chartOptions = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: true,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        grid: {
            left: 45,
            top: 15,
            right: 5,
            bottom: 70
        },
        // title: {
        //     left: 'center',
        //     text: `${props.symbol} to USD`
        // },
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value',
            // min: 'dataMin',
            scale: true,
            splitNumber: 6,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgb(240, 240, 240)'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 80,
                end: 100,
                zoomOnMouseWheel: false,
            },
            {
                start: 80,
                end: 100
            }
        ],
        series: [
            {
                data: data,
                name: props.name,
                type: 'line',
                smooth: false,
                // animationThreshold: 5000,
                showSymbol: false,
                symbolSize: 9,
                sampling: 'lttb',
                itemStyle: {
                    color: 'SlateGray'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'SlateGray'
                        },
                        {
                            offset: 1,
                            color: 'AliceBlue'
                        }
                    ])
                },
            }
        ]
    }

    return (
        <ReactECharts
            style={{ height: '400px', width: '100%' }}
            option={chartOptions}
        />)
}