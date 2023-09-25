import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function SkeletonStructure() {
    const isDark = document.documentElement.classList.contains('dark')? true : false

  return (


    <div className="p-4 md:w-1/3 w-full">
          <div className="h-full rounded-lg overflow-hidden">
            <div className="lg:h-48 md:h-36 w-full object-cover object-center h-60">
            <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
            </div>
            <div className="px-1 py-6">
              <div className="w-[40%]"><Skeleton variant="text" sx={{ fontSize: '1rem',bgcolor: isDark? '#1c1c4d': 'gray.900' }}/></div>
              <div className="h-8 my-2"><Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ bgcolor: isDark? '#1c1c4d': 'gray.900' }}/></div>
              <div className="mb-3 -space-y-1">
              <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
              <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
              <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
              <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/></div>
              <div className="flex items-center flex-wrap justify-between">
                <div className="w-1/2">
                <Skeleton variant="text" sx={{ fontSize: '1.2rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
                </div>
                <span className="inline w-1/3">
                <Skeleton variant="text" sx={{ fontSize: '1.2rem', bgcolor: isDark? '#1c1c4d': 'gray.900' }}/>
                </span>
                
              </div>
            </div>
          </div>
        </div>
  )
}

export default SkeletonStructure
