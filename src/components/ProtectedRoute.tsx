import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
	children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />
	}

	return children
}

export default ProtectedRoute
