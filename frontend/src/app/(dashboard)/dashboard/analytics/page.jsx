import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ApplicationsOverTimeChart from '@/components/ApplicationsOverTimeChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardTitle className={"font-semibold"}>
                        Applications Over Time
                    </CardTitle>
                    <Select defaultValue="daily">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ApplicationsOverTimeChart />
            </CardContent>
        </Card>

    )
}
