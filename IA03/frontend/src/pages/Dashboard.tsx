import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/api';

const Dashboard = () => {
  const { logout } = useAuth();

  // Fetch user profile using React Query
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    retry: 1,
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome to Your Dashboard
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error loading profile: {error.message}
            </div>
          )}

          {userProfile && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-lg font-medium text-gray-900">
                      {userProfile.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Created</p>
                    <p className="text-lg font-medium text-gray-900">
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Authentication Status
                </h3>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-gray-700">
                    You are successfully authenticated with JWT tokens
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Protected Route
                </h4>
                <p className="text-sm text-blue-800">
                  This page is protected and can only be accessed with a valid access
                  token. The token is automatically refreshed when it expires using
                  your refresh token.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
