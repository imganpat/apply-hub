import React from 'react'

function PageHeader({ title, subtitle }) {
    return (
        <div className='flex gap-1 flex-col'>
            <h3 className='text-2xl font-bold'>
                {title}
            </h3>
            <p className='text-muted-foreground'>{subtitle}</p>
        </div>
    )
}

export default PageHeader