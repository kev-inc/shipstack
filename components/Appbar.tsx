'use client'

import { useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar"
import { CogIcon } from "./Icons";
import { useState } from "react";

const Appbar = () => {

    const [showSettings, setShowSettings] = useState(false)

    const searchParams = useSearchParams();
    const queryString = searchParams.get("q")

    const toggleShowSettings = () => setShowSettings(!showSettings)

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div className="flex items-center py-2 px-4 bg-white shadow-sm">
            <div className='font-semibold text-gray-700 w-64'>
                ShipStack
            </div>
            <div className='flex-1'>
                <SearchBar initialValue={queryString || ""} />
            </div>
            <div className='ml-2 relative'>
                <button className='bg-[#F0F2F5] p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200' onClick={toggleShowSettings}>
                    <CogIcon />
                </button>
                <div id="dropdown" className={`z-10 ${showSettings ? "": "hidden"} absolute right-0 bg-white rounded-lg shadow w-44`}>
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={logout}>Log out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Appbar