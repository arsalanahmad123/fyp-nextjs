import { Button } from "../ui/button"

export const AuthButtons = () => {
    return (
        <div className="flex justify-between items-center space-x-4">
            <Button
                variant={'outline'}
                className="font-semibold cursor-pointer hover:bg-accent-foreground hover:text-white transition duration-300 "
            >
                Login
            </Button>
            <Button
                className="font-semibold cursor-pointer hover:bg-theme hover:text-white transition duration-300 "
            >
                Signup
            </Button>
        </div>
    );
}