import Navbar from '../components/Navbar'
import SidebarNav from '../components/SidebarNav'
import { SidebarProvider } from '../components/ui/sidebar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<div className='flex w-full'>
				<SidebarNav />

				<div className='flex flex-col flex-1'>
					<Navbar />

					<main className='flex-1 p-6 bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200'>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}

export default Layout
