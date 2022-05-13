import Image from 'next/image'
import scss from './CoinTitle.module.scss'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'

export default function CoinTitle(props) {

    const { name, symbol, logo, price } = props

    const [progress, setProgress] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
        }, 800)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width={50} height={50} src={`https://www.cryptocompare.com/${logo}`} alt='' />
                <span className={scss.currency}>{name}</span>
                <span className={scss.symbol}>{symbol}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>{price}</h1>
                <Box sx={{ width: '300px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(
                                progress,
                            )}%`}</Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>)
}