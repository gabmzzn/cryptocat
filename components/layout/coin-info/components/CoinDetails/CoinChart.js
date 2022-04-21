import * as echarts from 'echarts'

mergeOptions = {}
chartOption: EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            animation: false,
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
    //   left: 'center',
    //   text: this.selectedCurrency + ' to ' + this.selectedCurrencyToCompare
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
                color: 'rgb(50, 50, 65, 0.85)'
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
            name: this.selectedCurrencyToCompare,
            type: 'line',
            smooth: false,
            animationThreshold: 5000,
            showSymbol: false,
            symbolSize: 9,
            sampling: 'lttb',
            itemStyle: {
                color: '#20c689'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 1,
                        color: 'transparent'
                    },
                    {
                        offset: 0,
                        color: '#20c689'
                    }
                ])
            },
        }
    ]
}

export default function CoinChart() {
    return <div></div >
}