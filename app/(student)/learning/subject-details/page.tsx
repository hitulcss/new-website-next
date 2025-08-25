import SubjectDetails from '@/components/learning/my-courses/SubjectDetails'
import React,{Suspense} from 'react'

function SubjectPage() {
    return (
        <Suspense fallback={<div>Loading lecture...</div>}>
            <SubjectDetails />
        </Suspense>
    )
}

export default SubjectPage