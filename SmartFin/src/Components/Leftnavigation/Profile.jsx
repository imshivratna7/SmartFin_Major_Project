// src/components/Profile.jsx
import React from 'react';
import { useUser } from '../../UserContext';
import Dashboard from '../Maincontent/Dashboard';

const Profile = () => {
    const { user } = useUser();

    return (
        <Dashboard>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className='flex justify-between'>
            
            {/* Avatar Section */}

            <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Email:</label>
                <p className="text-gray-900">{user?.email}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">User ID:</label>
                <p className="text-gray-900">{user?.username}</p>
            </div>
            </div>
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">user?.username[0]</span> 
                    {/* You can replace 'A' with any icon or letter */}
                </div>
                {/* <div>
                    <p className="text-gray-900 font-semibold">{user.name || 'User'}</p>
                </div> */}
            </div>
        </div>
        </div>
        </Dashboard>
    );
};

export default Profile;
