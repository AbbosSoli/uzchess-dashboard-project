import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
import toast from 'react-hot-toast'

interface AuthContextType {
	isAuthenticated: boolean
	login: () => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		return localStorage.getItem('isAuthenticated') === 'true'
	})

	const login = () => {
		setIsAuthenticated(true)
		localStorage.setItem('isAuthenticated', 'true')

		toast.success('Xush kelibsiz!', {
			position: 'bottom-right',
			duration: 3000,
		})
	}

	const logout = () => {
		setIsAuthenticated(false)
		localStorage.removeItem('isAuthenticated')

		toast.success('Siz tizimdan muvaffaqiyatli chiqdingiz!', {
			position: 'bottom-right',
			duration: 3000,
		})
	}

	useEffect(() => {
		const authStatus = localStorage.getItem('isAuthenticated')
		if (authStatus === 'true') {
			setIsAuthenticated(true)
		}
	}, [])

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
