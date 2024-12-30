
export const Footer = () => {
    const getFullYear = () => {
        return new Date().getFullYear()
    }
    return (
        <footer className='flex items-center justify-around h-16 bg-blue-600 text-white'>
                <span className="flex text-sm text-white sm:text-center ">Copyright @{getFullYear()} 
                    <p className="ml-2">Service Coffre Fort</p>. Tous droits réservés.
                </span>
        </footer>
    )
}
