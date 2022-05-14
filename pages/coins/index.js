import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function CoinsIndex({ data }) {
  console.log('b')
  console.log(data)
  const router = useRouter()
  useEffect(() => {
    router.push('/coins/btc')
  }, [])
}