import scss from './LinkButton.module.scss'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LinkButton(props) {

    const router = useRouter()
    const rp = router.pathname
    const { button, buttonActive } = scss
    console.log(props.href)
    return (
        <Link href={props.href} passHref>
            <Button className={rp.startsWith(props.href) ? buttonActive : button}>
                {props.children}
            </Button>
        </Link>
    )
}