import Link from 'next/link';

export const MenuItems = () => {
    return (
        <div className="flex justify-between items-center space-x-16">
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#hero__main'}
            >
                Home
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#services__main'}
            >
                Services
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'#pricing__main'}
            >
                Pricing
            </Link>
            <Link
                className="text-gray-600 hover:text-black font-medium"
                href={'mailto:thepeacedevelopers@gmail.com'}
            >
                Contact
            </Link>
        </div>
    );
};
