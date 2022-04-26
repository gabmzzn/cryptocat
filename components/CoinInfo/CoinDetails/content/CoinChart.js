import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'

export default function CoinChart(props) {

    const data = props.data
        .map(r => Object.values({ time: r.time * 1000, close: r.close }))

    const chartOptions = {
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
            splitNumber: 4,
            splitLine: {
                lineStyle: {
                    color: 'rgb(150, 150, 150, 0.1)'
                }
            }
        },
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
        series: [
            {
                data: data,
                name: props.name,
                type: 'line',
                smooth: false,
                showSymbol: false,
                symbolSize: 9,
                sampling: 'lttb',
                animationEasing: 'sinusoidalOut',
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
        ],
        dataZoom: [
            {
                type: 'inside',
                start: 70,
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
                fillerColor: 'rgb(219 197 0 / 18%)',
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
    }

    return (
        <ReactECharts
            style={{ height: '375px', width: '100%', minWidth: '100%' }}
            option={chartOptions}
        />)
}