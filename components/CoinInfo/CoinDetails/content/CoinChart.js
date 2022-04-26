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
            bottom: 60
        },
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value',
            scale: true,
            splitNumber: 6,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgb(150, 150, 150, 0.1)'
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
                type: 'slider',
                start: 80,
                end: 100,
                top: 315,
                height: 50,
                borderColor: 'transparent',
                fillerColor: 'rgb(219 197 0 / 20%)',
                showDetail: false,
                brushSelect: false,
                handleSize: '60%',
                handleStyle: {
                    borderColor: 'rgb(150 150 0)',
                },
                emphasis: {
                    handleStyle: {
                        borderColor: 'rgb(100 100 0)',
                    }
                },
                dataBackground: {
                    lineStyle: {
                        color: '#dbc500',
                    },
                    areaStyle: {
                        color: '#dbc500'
                    }
                },
                selectedDataBackground: {
                    lineStyle: {
                        color: '#dbc500',
                    },
                    areaStyle: {
                        color: '#dbc500'
                    }
                },
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
                    color: '#dbc500'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#dbc500'
                        },
                        {
                            offset: 1,
                            color: 'white'
                        }
                    ])
                },
            }
        ]
    }

    return (
        <ReactECharts
            style={{ height: '375px', width: '100%', minWidth: '100%' }}
            option={chartOptions}
        />)
}