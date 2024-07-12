// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { server } from '../main'

// const Profile = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const auth = getAuth();
//             onAuthStateChanged(auth, async (user) => {
//                 if (user) {
//                     try {
//                         const token = await user.getIdToken();
//                         // console.log(token)
//                         const response = await axios.get(`${server}/api/auth/getUserProfile`, {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`
//                             }
//                         });
//                         // console.log("profile response",response);
//                         setProfile(response.data);
//                     } catch (err) {
//                         setError('Error fetching profile');
//                     } finally {
//                         setLoading(false);
//                     }
//                 } else {
//                     setLoading(false);
//                     setError('No user is signed in');
//                 }
//             });
//         };

//         fetchUserProfile();
//     }, []);

//     if (loading) {
//         return <div className="flex items-center justify-center h-screen">Loading...</div>;
//     }

//     if (error) {
//         return <div className="flex items-center justify-center h-screen">{error}</div>;
//     }

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
//             <div className="mb-4">
//                 <span className="font-bold">Email: </span>
//                 <span>{profile.email}</span>
//             </div>
//             <div className="mb-4">
//                 <span className="font-bold">Role: </span>
//                 <span>{profile.roleName}</span>
//             </div>
//             <div className="mb-4">
//                 <span className="font-bold">Company Name: </span>
//                 <span>{profile.companyName}</span>
//             </div>
//         </div>
//     );
// };

// export default Profile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { server } from '../main';
import Sidebar from '../components/Sidebar';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

//   const [claims, setClaims] = useState({});

// //   useEffect(() => {
// //     const fetchUserClaims = async () => {
// //       const user = auth.currentUser;
// //       if (user) {
// //         const idTokenResult = await user.getIdTokenResult();
// //         setClaims(idTokenResult.claims);
// //       }
// //     };

// //     fetchUserClaims();
// //   }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        // console.log("user: " + user)
                        const token = await user.getIdToken();
                        const response = await axios.get(`${server}/api/auth/getUserProfile`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        // console.log("response",response.data)
                        setProfile(response.data);
                    } catch (err) {
                        setError('Error fetching profile');
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setError('No user is signed in');
                }
            });
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500 font-bold">{error}</div>;
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className="w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Profile</h2>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">Name: </span>
                    <span className="text-gray-600">{profile.name}</span>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">Email: </span>
                    <span className="text-gray-600">{profile.email}</span>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">Role: </span>
                    <span className="text-gray-600">{profile.roleName}</span>
                </div>

            </div>
        </div>
    );
};

export default Profile;
