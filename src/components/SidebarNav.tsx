import {
	BookText,
	Medal,
	LibraryBig,
	Newspaper,
	Dices,
	StickyNote,
	Swords,
	Package,
	BookOpenCheck,
	FileQuestion,
	Radio,
	Puzzle,
	Users,
	Bell,
} from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar'
import { NavLink } from 'react-router'

const data = {
	title: [
		{
			title: 'UzChess',
			url: '/',
			icon: Dices,
		},
	],
	links: [
		{ title: 'Courses', url: '/courses', icon: BookText },
		{ title: 'Grand Masters', url: '/grand-masters', icon: Medal },
		{ title: 'News', url: '/news', icon: Newspaper },
		{ title: 'Books', url: '/books', icon: LibraryBig },
		{ title: 'Afisha', url: '/afisha', icon: StickyNote },
		{ title: 'Tournaments', url: '/tournaments', icon: Swords },
		{ title: 'Modules', url: '/modules', icon: Package },
		{ title: 'Lessons', url: '/lessons', icon: BookOpenCheck },
		{ title: 'Quiz', url: '/quiz', icon: FileQuestion },
		{ title: 'Live Streams', url: '/live-streams', icon: Radio },
		{ title: 'Puzzles', url: '/puzzles', icon: Puzzle },
		{ title: 'Teachers', url: '/teachers', icon: Users },
		{ title: 'Notifications', url: '/notifications', icon: Bell },
	],
}

const SidebarNav = () => {
	return (
		<Sidebar collapsible='icon' className='dark:bg-neutral-700'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<NavLink to='/'>
								<div className='flex items-center gap-1 dark:text-white'>
									<Dices />
									<span className='text-xl font-medium'>
										{data.title[0].title}
									</span>
								</div>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.links.map(item => (
								<SidebarMenuItem
									key={item.title}
									className='dark:text-white hover:dark:bg-neutral-500 hover:text-black hover:bg-gray-200'
								>
									<SidebarMenuButton asChild>
										<NavLink
											to={item.url}
											className={({ isActive }) =>
												` font-medium p-2 rounded flex items-center gap-2 ${
													isActive
														? 'bg-gray-300 text-black  dark:text-white'
														: 'text-white'
												}`
											}
										>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}

export default SidebarNav
