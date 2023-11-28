'use client'

import { useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar"

const Appbar = () => {

    const searchParams = useSearchParams();
    const queryString = searchParams.get("q")
    return (
        <div className="flex items-center py-2 px-4 bg-white shadow-sm">
            <div className='font-semibold text-gray-700 w-64'>
                ShipStack
            </div>
            <div className='flex-1'>
                <SearchBar initialValue={queryString || ""} />
            </div>
        </div>
    )
}

export default Appbar