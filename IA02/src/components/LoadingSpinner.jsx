/**
 * LoadingSpinner component - Displays a loading indicator
 * @param {Object} props - Component props
 * @param {string} props.message - Optional loading message
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
