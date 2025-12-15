"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"



const ArticlesPage = () => {

    const router = useRouter()

    useEffect(() => {
        router.push("/news-blogs")
    }, [router])

    return <></>
}

export default ArticlesPage