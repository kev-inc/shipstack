'use client'

type SearchBarProps = {
    initialValue: string
}

const SearchBar = ({ initialValue }: SearchBarProps) => {
    
    return (
        <form className='flex flex-row-reverse'>
            <input 
                name='q' 
                defaultValue={initialValue} 
                type="text" 
                placeholder="Search" 
                className={`bg-[#F0F2F5] rounded-full shadow-sm ${initialValue ? 'w-full' : 'w-64'} focus:w-full transition-all duration-300 px-4 py-2 outline-none border-none`} />
        </form>

    )
}

export default SearchBar