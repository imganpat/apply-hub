import React from 'react'
import ApplicationsOverTimeChart from '@/components/ApplicationsOverTimeChart'
import StatusDistributionChart from '@/components/StatusDistributionChart'
import ApplicationFunnelChart from '@/components/ApplicationFunnelChart'

export default function Page() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 flex-col'>
                    <h3 className='text-2xl font-bold'>
                        Analytics
                    </h3>
                    <p className='text-muted-foreground'>Track you job application performance and insights</p>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className="flex-1">
                    <ApplicationsOverTimeChart />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <StatusDistributionChart />
                    </div>

                    <div className="flex-1">
                        <ApplicationFunnelChart />
                    </div>
                </div>

            </div>
        </div>

    )
}
