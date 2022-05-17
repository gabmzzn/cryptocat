import Home from '../components/Pages/Home/Home'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function HomePage() {
	const router = useRouter()
	useEffect(() => {
		router.push('/market')
	}, [])
	// return <Home />
}