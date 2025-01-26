import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/Login'
import HomePage from './pages/Home/HomePage'
import Layout from './layouts/Layout'
import CoursesPage from './pages/Home/CoursesPage'
import BooksPage from './pages/Home/BooksPage'
import NewsPage from './pages/Home/NewsPage'
import GrandMastersPage from './pages/Home/GrandMastersPage'
import Afisha from './pages/Home/Afisha'
import Tournaments from './pages/Home/Tournaments'
import Lessons from './pages/Home/Lessons'
import Quiz from './pages/Home/Quiz'
import LiveStreams from './pages/Home/LiveStreams'
import Puzzles from './pages/Home/Puzzles'
import Teachers from './pages/Home/Teachers'
import Notifications from './pages/Home/Notifications'
import Modules from './pages/Home/Modules'

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Layout>
							<HomePage />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/courses'
				element={
					<ProtectedRoute>
						<Layout>
							<CoursesPage />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/books'
				element={
					<ProtectedRoute>
						<Layout>
							<BooksPage />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/news'
				element={
					<ProtectedRoute>
						<Layout>
							<NewsPage />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/grand-masters'
				element={
					<ProtectedRoute>
						<Layout>
							<GrandMastersPage />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/afisha'
				element={
					<ProtectedRoute>
						<Layout>
							<Afisha />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/tournaments'
				element={
					<ProtectedRoute>
						<Layout>
							<Tournaments />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/modules'
				element={
					<ProtectedRoute>
						<Layout>
							<Modules />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/lessons'
				element={
					<ProtectedRoute>
						<Layout>
							<Lessons />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/quiz'
				element={
					<ProtectedRoute>
						<Layout>
							<Quiz />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/live-streams'
				element={
					<ProtectedRoute>
						<Layout>
							<LiveStreams />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/puzzles'
				element={
					<ProtectedRoute>
						<Layout>
							<Puzzles />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/teachers'
				element={
					<ProtectedRoute>
						<Layout>
							<Teachers />
						</Layout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/notifications'
				element={
					<ProtectedRoute>
						<Layout>
							<Notifications />
						</Layout>
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
