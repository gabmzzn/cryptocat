import scss from './LinkButton.module.scss'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CleaningServices } from '@mui/icons-material'

export default function LinkButton(props) {

    const { pathname } = useRouter()
    const { href, activeOn } = props
    const { button, buttonActive } = scss

    const pathLink = activeOn ? activeOn : href

    return (
        <Link href={href} passHref>
            <Button className={pathname.startsWith(pathLink) ? buttonActive : button}>
                {props.children}
            </Button>
        </Link>
    )
}