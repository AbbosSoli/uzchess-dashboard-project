import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormInputs } from '../validation/loginSchema'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

const Login = () => {
	const { login } = useAuth()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	})

	const mockLoginApi = async (data: LoginFormInputs) => {
		try {
			const response = await axios.get(`${apiUrl}/users`)

			console.log('Response:', response)

			if (response.data && Array.isArray(response.data)) {
				const user = response.data.find(
					(user: { email: string; password: string }) =>
						user.email === data.email && user.password === data.password
				)

				if (user) {
					return Promise.resolve({ data: { success: true } })
				} else {
					return Promise.reject(new Error('Invalid email or password'))
				}
			} else {
				return Promise.reject(new Error('Invalid response structure'))
			}
		} catch (error) {
			console.error('Login Failed', error)
			return Promise.reject(new Error('Network error'))
		}
	}

	const onSubmit = async (data: LoginFormInputs) => {
		try {
			await mockLoginApi(data)
			login()
			navigate('/')
		} catch (error) {
			console.error(error)
			alert('Invalid credentials. Please try again.')
		}
	}

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='flex flex-col items-center justify-center w-full bg-gray-100'>
				<div className='bg-white rounded-lg shadow-lg'>
					<h1 className='px-6 pt-6 text-2xl font-bold text-black'>
						Welcome to UzChess <br /> Dashboard
					</h1>
					<form onSubmit={handleSubmit(onSubmit)} className='p-6 w-80'>
						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Email
							</label>
							<input
								id='email'
								type='email'
								{...register('email')}
								className='block w-full p-2 mt-1 text-black border border-gray-300 rounded-md bg-slate-50'
							/>
							{errors.email && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div className='mb-4'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Password
							</label>
							<input
								id='password'
								type='password'
								{...register('password')}
								className='block w-full p-2 mt-1 text-black border border-gray-300 rounded-md bg-slate-50'
							/>
							{errors.password && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type='submit'
							className='w-full py-2 text-white bg-black rounded-md hover:bg-gray-900'
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
