import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { SidebarTrigger } from './ui/sidebar'
import { CircleUserRound, User, LogOut, Sun, Moon, Monitor } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Navbar = () => {
	const { logout } = useAuth()
	const { theme, toggleTheme } = useTheme()

	const handleThemeChange = (mode: string) => {
		if (theme !== mode) {
			toggleTheme()
		}
	}

	return (
		<header>
			<div className='flex items-center justify-between p-3 bg-gray-1000 dark:bg-neutral-800 dark:text-neutral-200'>
				<SidebarTrigger />
				<div className='flex items-center gap-1'>
					<DropdownMenu>
						<DropdownMenuTrigger className='focus:border-0 focus:outline-none'>
							{theme === 'light' && <Sun className='p-1 mr-2 border w-7 h-7' />}
							{theme === 'dark' && <Moon className='p-1 mr-2 border w-7 h-7' />}
							{theme === 'system' && (
								<Monitor className='p-1 mr-2 border w-7 h-7' />
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={`bg-white dark:bg-neutral-800 border dark:border-neutral-600 shadow-lg`}
						>
							<DropdownMenuItem
								className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'
								onClick={() => handleThemeChange('light')}
							>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem
								className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'
								onClick={() => handleThemeChange('dark')}
							>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem
								className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'
								onClick={() => handleThemeChange('system')}
							>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger className='focus:border-0 focus:outline-none'>
							<CircleUserRound className='p-1 mr-2 border w-7 h-7' />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={`bg-white dark:bg-neutral-800 border dark:border-neutral-600 shadow-lg`}
						>
							<DropdownMenuItem className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'>
								<User className='mr-2' />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'>
								<LogOut className='mr-2' />
								<button onClick={logout} className=''>
									Logout
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}

export default Navbar
