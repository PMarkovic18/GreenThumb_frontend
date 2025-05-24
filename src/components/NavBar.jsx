import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
    const location = useLocation()
    return (
        <nav className="w-full bg-green-700 py-3 px-6 flex items-center shadow-md">
            <div className="flex gap-6">
                <Link
                    to="/plants"
                    className={`text-white font-semibold hover:text-green-200 transition-colors ${location.pathname.startsWith('/plants') ? 'underline' : ''
                        }`}
                >
                    Plants
                </Link>
                <Link
                    to="/growthlogs"
                    className={`text-white font-semibold hover:text-green-200 transition-colors ${location.pathname.startsWith('/growthlogs') ? 'underline' : ''
                        }`}
                >
                    Growth Logs
                </Link>
            </div>
        </nav>
    )
}
