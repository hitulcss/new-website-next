"use server"

import LiveLecture from '@/components/learning/lecture/liveLecture'
import React,{ Suspense } from 'react'

function LecturePage({ params }: {params:any}) {
  
  return (
    <Suspense fallback={<div>Loading lecture...</div>}>
      <LiveLecture params={params} />
    </Suspense>
  )
}

export default LecturePage