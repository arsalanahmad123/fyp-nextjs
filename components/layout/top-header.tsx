import Link from "next/link";

export const TopHeader = () => {
    return (
        <div className="w-full text-center bg-black text-sm p-2">
            <span className="text-white">Checkout our new ai tools features:</span>
            <Link href={'#'} className="text-theme ml-1">Upgrade Now</Link>
        </div>
    );
}