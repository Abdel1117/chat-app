import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    const Links = [
        { name: "Accueil", anchor: "/" },
        { name: "Service", anchor: "/service" },
        { name: "A propos", anchor: "/about" },
        { name: "Contact", anchor: "/contact" },
    ];

    return (

        <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6 relative">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Logo</span>
            </div>
            
            <div className="hidden lg:flex justify-between items-center mr-[200px] ">
                    <ul>
                        {Links.map((link, index) => (
                            <li key={index} className="block mt-4 md:inline-block md:mt-0 md:ml-6">
                                <a href={link.anchor} className="text-white hover:text-gray-200">{link.name}</a>
                            </li>
                        ))}
                    </ul>
            </div>
                    <button className="block lg:hidden" onClick={() => setOpen(!open)}>
                        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>

                    <div className="absolute top-[76px] left-0 bg-blue-600 w-full px-4 py-8" style={{ display: open ? "block" : "none" }}>
                            <div className="flex flex-col items-center">
                                {Links.map((link, index) => (
                                        <a key={index} className="w-full block mt-4 rounded-s-3xl md:inline-block md:mt-0 md:ml-6 cursor-pointer text-white hover:bg-white hover:text-blue-600 px-4 py-2 " onClick={()=>{navigate(link.anchor)}} >{link.name}</a>
                                ))}
                            </div>
                    </div>
        </nav>
    )
};

export default Header;

