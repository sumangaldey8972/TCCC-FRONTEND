"use client"

import { usePathname } from "next/navigation"


const NewsByCategoryPage = () => {

    const path = usePathname()


    const pathName = path.split("/")

    const page = pathName[pathName.length - 1]

    return (
        <div>
            <h1 className="text-xl capitalize" >{page}</h1>
        </div>
    )
}

export default NewsByCategoryPage

