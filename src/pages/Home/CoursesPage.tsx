import { useEffect, useState } from 'react'
import axios from 'axios'
import { Plus } from 'lucide-react'
import {
	useReactTable,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
} from '@tanstack/react-table'
import { Play, Eye, Pencil, Trash2 } from 'lucide-react'
import AddNewCourseModal from '../../components/AddNewCourseModal'

interface Course {
	id: number
	courseName: string
	description: string
	lessons: number
	duration: number
	edit?: React.ReactNode
}

const columnHelper = createColumnHelper<Course>()

const CoursesPage = () => {
	const [data, setData] = useState<Course[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editCourse, setEditCourse] = useState<Course | null>(null) // State for editing

	useEffect(() => {
		axios
			.get('http://localhost:5000/courses')
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				console.error('Error fetching data:', error)
			})
	}, [])

	const handleAddCourse = (newCourse: Course) => {
		axios
			.post('http://localhost:5000/courses', newCourse)
			.then(response => {
				setData(prevData => [...prevData, response.data])
			})
			.catch(error => {
				console.error('Error adding course:', error)
			})
	}

	const handleEditCourse = (updatedCourse: Course) => {
		axios
			.put(`http://localhost:5000/courses/${updatedCourse.id}`, updatedCourse)
			.then(() => {
				setData(prevData =>
					prevData.map(course =>
						course.id === updatedCourse.id ? updatedCourse : course
					)
				)
			})
			.catch(error => {
				console.error('Error updating course:', error)
			})
	}

	const handleDelete = (courseId: number) => {
		if (window.confirm('Are you sure you want to delete this course?')) {
			axios
				.delete(`http://localhost:5000/courses/${courseId}`)
				.then(() => {
					const updatedCourses = data.filter(course => course.id !== courseId)
					setData(updatedCourses)
				})
				.catch(error => {
					console.error('Error deleting course:', error)
				})
		}
	}

	const handleEdit = (course: Course) => {
		setEditCourse(course)
		setIsModalOpen(true)
	}

	const handleAddNew = () => {
		setEditCourse(null)
		setIsModalOpen(true)
	}

	const columns = [
		columnHelper.accessor('courseName', {
			header: 'Kurs Nomi',
		}),
		columnHelper.accessor('description', {
			header: 'Tavsifi',
		}),
		columnHelper.accessor('lessons', {
			header: 'Darslar',
			cell: info => (
				<div className='flex items-center'>
					<Play className='w-3 mr-1' />
					{info.getValue()}
				</div>
			),
		}),
		columnHelper.accessor('duration', {
			header: 'Davomiyligi',
		}),
		columnHelper.accessor('edit', {
			header: 'Tahrirlash',
			cell: info => (
				<div className='flex gap-1'>
					<span className='p-2 text-white bg-black border rounded-md dark:bg-white dark:text-black'>
						<Eye className='flex items-center justify-center w-4 h-4 cursor-pointer' />
					</span>
					<span
						className='p-2 text-white bg-black border rounded-md dark:bg-white dark:text-black'
						onClick={() => handleEdit(info.row.original)} // Edit function
					>
						<Pencil className='flex items-center justify-center w-4 h-4 cursor-pointer' />
					</span>
					<span
						className='p-2 text-white bg-red-700 border rounded-md cursor-pointer'
						onClick={() => handleDelete(info.row.original.id)}
					>
						<Trash2 className='flex items-center justify-center w-4 h-4' />
					</span>
				</div>
			),
		}),
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='p-4'>
			<h2 className='mb-4 text-2xl font-bold'>Kurslar</h2>

			<div className='mb-4'>
				<button
					className='p-2 mb-4 text-white bg-black rounded-md hover:bg-gray-800'
					onClick={handleAddNew}
				>
					<Plus className='w-4 h-4 ' />
				</button>
				<span className='ml-2 text-xl font-medium'>Yangi Kurs qo'shish</span>
			</div>
			<AddNewCourseModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddCourse={handleAddCourse}
				editCourse={editCourse}
				onEditCourse={handleEditCourse} // Handle course edit
			/>

			<table className='border border-collapse border-gray-300'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									className='px-4 py-2 text-left border-b w-[200px]'
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className='px-4 py-2 border-b w-[200px]'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CoursesPage
