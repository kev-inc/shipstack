const Badge = ({ number }: { number: string | number | undefined }) => {
    if (number == 0 || number == "0" || number == null) {
        return
    }
    return (
        <span className='bg-red-500 py-0.5 px-1 rounded-full text-xs text-white font-semibold'>{number}</span>
    )
}


export default Badge