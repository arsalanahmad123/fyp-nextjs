import Link from 'next/link';

export const MenuItems = () => {
    return (
        <div className="flex justify-between items-center space-x-16">
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'/'}
            >
                Home
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#'}
            >
                Features
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#'}
            >
                Pricing
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#'}
            >
                Contact
            </Link>
        </div>
    );
};
