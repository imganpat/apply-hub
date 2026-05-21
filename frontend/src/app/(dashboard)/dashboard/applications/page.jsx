"use client"

import React from 'react'
import DataTable from '@/components/DataTable'
import ApplicationModal from '@/components/ApplicationModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useApplicationModel } from '@/hooks/useApplicationModel'
import PageHeader from '@/components/PageHeader'

export default function Page() {
    const { open, application, handleAdd, handleEdit, handleOpenChange } = useApplicationModel();
    return (
        <div className='flex flex-col'>

            <div className='flex justify-between items-center'>
                <PageHeader title="Applications" subtitle="Manage and track all your job applications" />

                <div>
                    <Button onClick={handleAdd}>
                        <Plus />
                        Add application
                    </Button>
                </div>
            </div>

            <div>
                <DataTable onEdit={handleEdit} />
            </div>

            <ApplicationModal open={open} onOpenChange={handleOpenChange} application={application} />
        </div>
    )
}
