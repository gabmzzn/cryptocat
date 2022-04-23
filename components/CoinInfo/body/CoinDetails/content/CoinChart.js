import ReactECharts from 'echarts-for-react'
import { useState, useEffect } from 'react'
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
            top: 30,
            right: 30,
            bottom: 30
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
                    color: 'rgb(230, 230, 230)'
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
                    color: '#20c689'
                },
                // areaStyle: {
                //     color: new echarts.LinearGradient(0, 0, 0, 1, [
                //         {
                //             offset: 1,
                //             color: 'transparent'
                //         },
                //         {
                //             offset: 0,
                //             color: '#20c689'
                //         }
                //     ])
                // },
            }
        ]
    }

    return <ReactECharts
        option={chartOptions}
    />
}