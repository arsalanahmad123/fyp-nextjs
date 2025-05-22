'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';


interface ContentStatsProps {
    data: {
        name: string;
        content: number;
        score: number;
    }[];
}

export function ContentStats({data}: ContentStatsProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                    dataKey="name"
                    className="text-sm text-muted-foreground"
                />
                <YAxis
                    yAxisId="left"
                    className="text-sm text-muted-foreground"
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    className="text-sm text-muted-foreground"
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                Content
                                            </span>
                                            <span className="font-bold text-muted-foreground">
                                                {payload[0].value}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                Score
                                            </span>
                                            <span className="font-bold text-muted-foreground">
                                                {payload[1].value}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="content"
                    stroke="#2563eb"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="score"
                    stroke="#16a34a"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
