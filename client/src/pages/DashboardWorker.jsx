import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaPlus, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const DashboardWorker = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', deadlineDate: '', deadlineTime: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/api/tasks');
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, currentStatus) => {
        let newStatus = currentStatus === 'Pending' ? 'Ongoing' : 'Completed';
        if (currentStatus === 'Completed') return; // Can't revert? Maybe Allow revert to Ongoing if needed.

        try {
            await axios.put(`/api/tasks/${id}/status`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleProofUpload = async (id, file) => {
        const formData = new FormData();
        formData.append('proof', file);
        try {
            await axios.post(`/api/tasks/${id}/proof`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchTasks(); // Refresh to show completed or proof url
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tasks', { ...newTask, priority: 'Med' });
            setShowModal(false);
            setNewTask({ title: '', description: '', deadlineDate: '', deadlineTime: '' });
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to add task');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">My Tasks</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add New Task
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <div key={task._id} className={`bg-white p-4 rounded shadow border-l-4 ${task.status === 'Completed' ? 'border-green-500' :
                        task.status === 'Ongoing' ? 'border-yellow-500' : 'border-gray-500'
                        }`}>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{task.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                task.priority === 'Med' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                }`}>
                                {task.priority}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                            <span><FaClock className="inline mr-1" /> {new Date(task.deadlineDate).toLocaleDateString()} {task.deadlineTime}</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-sm font-semibold ${task.status === 'Completed' ? 'text-green-600' :
                                task.status === 'Ongoing' ? 'text-yellow-600' : 'text-gray-600'
                                }`}>
                                {task.status}
                            </span>

                            {task.status !== 'Completed' && (
                                <button
                                    onClick={() => updateStatus(task._id, task.status)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
                                >
                                    {task.status === 'Pending' ? 'Start' : 'Complete'}
                                </button>
                            )}
                        </div>

                        {/* Proof Upload */}
                        {task.status === 'Ongoing' && (
                            <div className="mt-4">
                                <label className="block text-xs text-gray-500 mb-1">Upload Proof (to complete):</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleProofUpload(task._id, e.target.files[0])}
                                    className="text-xs w-full text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        )}
                        {task.proofImageURL && (
                            <div className="mt-2 text-xs text-green-600">
                                <a href={`${axios.defaults.baseURL}${task.proofImageURL}`} target="_blank" rel="noopener noreferrer" className="underline">View Proof</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
                        <form onSubmit={addTask}>
                            <input
                                type="text" placeholder="Task Title" className="w-full border p-2 mb-2 rounded"
                                value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} required
                            />
                            <textarea
                                placeholder="Description" className="w-full border p-2 mb-2 rounded"
                                value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            ></textarea>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="date" className="w-1/2 border p-2 rounded"
                                    value={newTask.deadlineDate} onChange={e => setNewTask({ ...newTask, deadlineDate: e.target.value })} required
                                />
                                <input
                                    type="time" className="w-1/2 border p-2 rounded"
                                    value={newTask.deadlineTime} onChange={e => setNewTask({ ...newTask, deadlineTime: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardWorker;
