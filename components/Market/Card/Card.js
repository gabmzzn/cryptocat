/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import style from './Card.module.css'

export default function Card(props) {
    return (
        <div>
            <div className={style.title}>
                <h1>{props.price}</h1>
                <img src={props.image} />
            </div>
            <div>
                <div>
                    {props.name}
                </div>
                <div>
                    {props.changepct}
                </div>
            </div>
            <div>
                {props.price}
            </div>
            <div>
                {props.chart}
            </div>
        </div>
    )
}