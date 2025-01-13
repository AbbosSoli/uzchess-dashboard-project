import { Check, Plus, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AddNewCourseModalProps {
	isOpen: boolean
	onClose: () => void
	onAddCourse: (newCourse: Course) => void
	editCourse: Course | null
	onEditCourse: (updatedCourse: Course) => void
}

interface Course {
	id: number
	courseName: string
	description: string
	lessons: number
	duration: number
}

const AddNewCourseModal: React.FC<AddNewCourseModalProps> = ({
	isOpen,
	onClose,
	onAddCourse,
	editCourse,
	onEditCourse,
}) => {
	const [newCourse, setNewCourse] = useState<Course>({
		id: 0,
		courseName: '',
		description: '',
		lessons: 0,
		duration: 0,
	})

	useEffect(() => {
		if (editCourse) {
			setNewCourse(editCourse) // Pre-fill form if editing
		} else {
			setNewCourse({
				id: 0,
				courseName: '',
				description: '',
				lessons: 0,
				duration: 0,
			}) // Clear fields for new course
		}
	}, [editCourse])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (editCourse) {
			onEditCourse(newCourse) // If editing, update the course
		} else {
			onAddCourse(newCourse) // If adding, create a new course
		}
		onClose()
	}

	return (
		<div
			className={`fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className='p-6 bg-white rounded-md w-[450px]'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='courseName' className='block'>
						Kurs nomi
					</label>
					<input
						type='text'
						id='courseName'
						placeholder='Kurs nomi'
						value={newCourse.courseName}
						onChange={e =>
							setNewCourse({ ...newCourse, courseName: e.target.value })
						}
						className='w-full px-4 py-2 mb-4 border rounded-md'
						required
					/>

					<label htmlFor='description' className='block'>
						Tavsifi
					</label>
					<input
						type='text'
						id='description'
						placeholder='Tavsifi'
						value={newCourse.description}
						onChange={e =>
							setNewCourse({ ...newCourse, description: e.target.value })
						}
						className='w-full px-4 py-2 mb-4 border rounded-md'
						required
					/>

					<label htmlFor='lessons' className='block'>
						Darslar soni
					</label>
					<input
						type='number'
						id='lessons'
						placeholder='Darslar soni'
						value={newCourse.lessons}
						onChange={e =>
							setNewCourse({
								...newCourse,
								lessons: Number(e.target.value),
							})
						}
						className='w-full px-4 py-2 mb-4 border rounded-md'
						required
					/>

					<label htmlFor='duration' className='block'>
						Davomiyligi (minut)
					</label>
					<input
						type='number'
						id='duration'
						placeholder='Davomiyligi'
						value={newCourse.duration}
						onChange={e =>
							setNewCourse({
								...newCourse,
								duration: Number(e.target.value),
							})
						}
						className='w-full px-4 py-2 mb-4 border rounded-md'
						required
					/>

					<div className='flex justify-end gap-4'>
						<button
							className='p-2 text-white bg-red-600 rounded-md'
							onClick={onClose}
						>
							<X />
						</button>
						<button
							type='submit'
							className='p-2 text-white bg-black rounded-md '
						>
							{editCourse ? <Check /> : <Plus />}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddNewCourseModal
