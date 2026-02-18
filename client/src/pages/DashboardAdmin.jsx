import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaPlus, FaFilter, FaSearch, FaUser } from 'react-icons/fa';

const DashboardAdmin = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ worker: '', status: '' });
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '', description: '', assignedTo: '',
        priority: 'Med', deadlineDate: '', deadlineTime: ''
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [tasks, filter]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/api/tasks');
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const applyFilters = () => {
        let temp = [...tasks];
        if (filter.worker) {
            temp = temp.filter(t => t.assignedTo.includes(filter.worker));
        }
        if (filter.status) {
            temp = temp.filter(t => t.status === filter.status);
        }
        setFilteredTasks(temp);
    };

    const addTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/tasks', newTask);
            setShowModal(false);
            setNewTask({ title: '', description: '', assignedTo: '', priority: 'Med', deadlineDate: '', deadlineTime: '' });
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to assign task');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="flex items-center border rounded px-3 py-2 bg-white w-full">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text" placeholder="Filter by Worker Email"
                            className="outline-none text-sm w-full"
                            value={filter.worker} onChange={e => setFilter({ ...filter, worker: e.target.value })}
                        />
                    </div>
                    <select
                        className="border rounded px-3 py-2 bg-white text-sm"
                        value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => window.location.href = '/register'}
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
                    >
                        <FaUser /> Register User
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition flex items-center gap-2 whitespace-nowrap"
                    >
                        <FaPlus /> Assign Task
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b text-gray-600 text-sm uppercase">
                            <th className="p-4">Title</th>
                            <th className="p-4">Assigned To</th>
                            <th className="p-4">Priority</th>
                            <th className="p-4">Deadline</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.length === 0 ? (
                            <tr><td colSpan="6" className="p-4 text-center text-gray-500">No tasks found.</td></tr>
                        ) : (
                            filteredTasks.map(task => (
                                <tr key={task._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{task.title}</td>
                                    <td className="p-4 text-sm text-gray-600">{task.assignedTo}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                            task.priority === 'Med' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {new Date(task.deadlineDate).toLocaleDateString()} {task.deadlineTime}
                                        {new Date(task.deadlineDate) < new Date() && task.status !== 'Completed' && (
                                            <span className="text-red-500 ml-2 text-xs font-bold">(Overdue)</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${task.status === 'Completed' ? 'text-green-600 bg-green-50' :
                                            task.status === 'Ongoing' ? 'text-yellow-600 bg-yellow-50' : 'text-gray-600 bg-gray-50'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {task.proofImageURL ? (
                                            <a href={`${axios.defaults.baseURL}${task.proofImageURL}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">View</a>
                                        ) : (
                                            <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">Assign New Task</h3>
                        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text" className="w-full border p-2 rounded mt-1"
                                    value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full border p-2 rounded mt-1" rows="3"
                                    value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Assign To (Email)</label>
                                <input
                                    type="email" className="w-full border p-2 rounded mt-1" placeholder="worker@company.com"
                                    value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    className="w-full border p-2 rounded mt-1"
                                    value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Med">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline Date</label>
                                <input
                                    type="date" className="w-full border p-2 rounded mt-1"
                                    value={newTask.deadlineDate} onChange={e => setNewTask({ ...newTask, deadlineDate: e.target.value })} required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline Time</label>
                                <input
                                    type="time" className="w-full border p-2 rounded mt-1"
                                    value={newTask.deadlineTime} onChange={e => setNewTask({ ...newTask, deadlineTime: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Assign Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardAdmin;
