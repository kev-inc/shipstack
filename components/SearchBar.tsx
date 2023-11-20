type SearchBarProps = {
    initialValue: string
}

const SearchBar = ({initialValue}: SearchBarProps) => {
    return (
        <form className='m-4 border rounded'>
            <input name='q' defaultValue={initialValue} type="text" placeholder="Search" className='w-full px-4 py-2 outline-none border-none' />
        </form>
    )
}

export default SearchBar