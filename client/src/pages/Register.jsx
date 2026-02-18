import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Worker' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const { success, msg } = await register(formData.name, formData.email, formData.password, formData.role);
        if (success) {
            alert('Registration Successful. Please Login.');
            navigate('/login');
        } else {
            alert(msg);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register User</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text" name="name" value={formData.name} onChange={onChange}
                            className="w-full px-3 py-2 border rounded" required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email" name="email" value={formData.email} onChange={onChange}
                            className="w-full px-3 py-2 border rounded" required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password" name="password" value={formData.password} onChange={onChange}
                            className="w-full px-3 py-2 border rounded" required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role" value={formData.role} onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="Worker">Worker</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Register
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
