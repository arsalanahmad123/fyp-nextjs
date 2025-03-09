

type Props = {
    icon: React.ReactNode,
    title: string
    description: string 
    bullets: string[]
}

export const ServiceCard = ({icon,title,description,bullets}: Props) => {
    return (
        <div className="bg-white border rounded-md px-6 py-10 hover:bg-theme2 hover:border-theme transition duration-300 ease-in hover:text-white group">
            <div className="p-2.5 bg-theme inline-block text-white rounded-md mb-2">
                {icon}
            </div>
            <h4 className="font-bold group-hover:text-theme text-xl mb-2 transition duration-300 ease-linear">
                {title}
            </h4>
            <p className="text-muted-foreground group-hover:text-white text-[16px] mb-2">
                {description}
            </p>
            {bullets.map((bullet, i) => (
                <li key={i} className="ml-4 font-medium text-[15px]">
                    {bullet}
                </li>
            ))}
        </div>
    );
}