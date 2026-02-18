import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import DashboardAdmin from './DashboardAdmin';
import DashboardWorker from './DashboardWorker';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return <div>Loading user...</div>;

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>

            {user.role === 'Admin' ? <DashboardAdmin /> : <DashboardWorker />}
        </div>
    );
};

export default Dashboard;
