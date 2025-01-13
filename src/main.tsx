import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<ThemeProvider>
					<App />
					<Toaster position='bottom-right' />
				</ThemeProvider>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>
)
