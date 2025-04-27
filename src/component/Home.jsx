import { useEffect, useState } from "react";
import supaBase from "../config/supabaseClient";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await supaBase.from('users').select();

                if (error) {
                    throw error;
                }
                console.log(data);
                setUsers(data);
                setFetchError(null);
            } catch (error) {
                console.error("Error fetching users:", error.message);
                setFetchError("Could not fetch users data. Please try again later.");
                setUsers(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>

            {fetchError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {fetchError}
                </div>
            )}

            {loading && (
                <div className="flex justify-center">
                    <p className="text-gray-500">Loading users data...</p>
                </div>
            )}

            {users && users.length === 0 && !loading && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    No users found in the database.
                </div>
            )}
        </div>
    );
};

export default Home;