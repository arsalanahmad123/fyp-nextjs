import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-16 rounded-lg shadow-md text-center min-w-4xl">
                <AlertTriangle className="text-red-500 mx-auto" size={50} />
                <h2 className="text-2xl font-semibold mt-4 md:text-4xl">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 mt-2">
                    Oops! An unexpected error occurred.
                </p>

                <Link
                    href="/signin"
                    className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
