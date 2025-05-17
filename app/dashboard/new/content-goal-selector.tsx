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
    disabled?: boolean;
}

export function ContentGoalSelector({
    selected,
    onSelect,
    disabled = false,
}: ContentGoalSelectorProps) {
    const goals = [
        { value: 'inform', label: 'Inform', icon: InfoCircle },
        { value: 'sell', label: 'Sell', icon: ShoppingCart },
        { value: 'rank-on-google', label: 'Rank on Google', icon: Search },
        { value: 'educate', label: 'Educate', icon: GraduationCap },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-auto gap-2 sm:gap-3">
            {goals.map((goal) => (
                <Button
                    key={goal.value}
                    variant={selected === goal.value ? 'default' : 'outline'}
                    onClick={() => onSelect(goal.value)}
                    disabled={disabled}
                    className={`flex items-center justify-start gap-1 h-12 px-4 ${
                        selected === goal.value
                            ? 'bg-[var(--color-theme)] hover:bg-[var(--color-theme)]/90'
                            : ''
                    } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    <goal.icon className="h-5 w-5" />
                    <span>{goal.label}</span>
                </Button>
            ))}
        </div>
    );
}
