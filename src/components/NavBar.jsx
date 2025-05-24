import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
    const location = useLocation()
    return (
        <nav className="w-full bg-green-700 py-3 px-6 flex items-center shadow-md rounded-b-xl z-10">
            <div className="flex items-center gap-8 w-full">
                <span className="text-white text-2xl font-extrabold tracking-tight mr-8 select-none"> GreenThumb</span>
                <Link
                    to="/plants"
                    className={`px-2 py-1 rounded transition-colors font-semibold ${location.pathname.startsWith('/plants')
                            ? 'bg-green-900 text-green-100'
                            : 'text-white hover:bg-green-600 hover:text-green-100'
                        }`}
                >
                    Plants
                </Link>
                <Link
                    to="/growthlogs"
                    className={`px-2 py-1 rounded transition-colors font-semibold ${location.pathname.startsWith('/growthlogs')
                            ? 'bg-green-900 text-green-100'
                            : 'text-white hover:bg-green-600 hover:text-green-100'
                        }`}
                >
                    Growth Logs
                </Link>
            </div>
        </nav>
    )
}
