import React from 'react'
import ApplicationsOverTimeChart from '@/components/ApplicationsOverTimeChart'
import StatusDistributionChart from '@/components/StatusDistributionChart'
import ApplicationFunnelChart from '@/components/ApplicationFunnelChart'
import PageHeader from '@/components/PageHeader'

export default function Page() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <PageHeader title="Analytics" subtitle="Track you job application performance and insights" />
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
