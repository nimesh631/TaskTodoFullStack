import  { useState } from 'react';
import { register } from '../services/authService';
import {useNavigate} from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try{
            await register(email,password);
            navigate("/login");
        }catch(err){
            setError("Registration failed. try another email.");
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-2xl font-bold mb-4'>Register</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <input 
            className='border w-full p-2 mb-2'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             />

              <input 
               className='border w-full p-2 mb-2'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             />
             <button onClick={handleRegister}
             className='bg-blue-500 text-white px-4 py-2 rounded w-full'>
                Register
             </button>

        </div>
    </div>
  )
}

export default Register