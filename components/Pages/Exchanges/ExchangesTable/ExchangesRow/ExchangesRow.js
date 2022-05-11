import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import scss from './ExchangesRow.module.scss'

export default function ExchangesRow(props) {

  const ex = props.exchange

  const year = ex.year_established == null ? 2020 : ex.year_established
  const volume = ex.trade_volume_24h_btc.toFixed(0)
  const url = ex.url.substring(8).replace(/\/$/, '').split('/')[0]

  const { hideable, button, name } = scss

  return (
    <TableRow key={ex.trust_score_rank} onClick={() => window.open(ex.url, "_blank", "norreferer")}>
      <TableCell align="center" className={hideable}>{ex.trust_score_rank}</TableCell>
      <TableCell align="left">
        <div className={name} style={{ whiteSpace: 'pre-line' }}>
          <img src={ex.image} width={40} height={40} alt={ex.name} />
          {ex.name}
        </div>
      </TableCell>
      <TableCell align="center">
        <Rating precision={0.5} name="read-only" value={ex.trust_score / 2} readOnly />
      </TableCell>
      <TableCell align="right" ><b>$ {volume} M</b></TableCell>
      <TableCell align="center" style={{ whiteSpace: 'pre-line' }} className={hideable}>{ex.country}</TableCell>
      <TableCell align="center" className={hideable}>{year}</TableCell>
      <TableCell align="right" className={hideable}>
        <Button className={button}>{url}</Button>
      </TableCell>
    </TableRow>
  )
}