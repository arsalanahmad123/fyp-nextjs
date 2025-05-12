'use client';

import { Button } from '@/components/ui/button';
import {
    InfoIcon as InfoCircle,
    ShoppingCart,
    Search,
    GraduationCap,
} from 'lucide-react';

interface ContentGoalSelectorProps {
    selected: string;
    onSelect: (value: string) => void;
}

export function ContentGoalSelector({
    selected,
    onSelect,
}: ContentGoalSelectorProps) {
    const goals = [
        { value: 'inform', label: 'Inform', icon: InfoCircle },
        { value: 'sell', label: 'Sell', icon: ShoppingCart },
        { value: 'rank-on-google', label: 'Rank on Google', icon: Search },
        { value: 'educate', label: 'Educate', icon: GraduationCap },
    ];

    return (
        <div className="grid grid-cols-1 gap-3">
            {goals.map((goal) => (
                <Button
                    key={goal.value}
                    variant={selected === goal.value ? 'default' : 'outline'}
                    onClick={() => onSelect(goal.value)}
                    className={`flex items-center justify-start gap-3 h-12 px-4 ${
                        selected === goal.value
                            ? 'bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90'
                            : ''
                    }`}
                >
                    <goal.icon className="h-5 w-5" />
                    <span>{goal.label}</span>
                </Button>
            ))}
        </div>
    );
}
