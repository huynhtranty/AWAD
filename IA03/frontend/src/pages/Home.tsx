import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to User Registration System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A complete authentication system built with NestJS and React
        </p>
        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block w-full bg-white text-indigo-600 py-3 px-6 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
