import React, { Suspense, lazy } from "react";
const AdminQueueTable = lazy(() => import('../../components/AdminComponents/AdminQueueTable'));

const QueueingSection = () => {

    return (
        <>
            <Suspense fallback={null}>
                <AdminQueueTable />
            </Suspense>
        </>
    );
};

export default QueueingSection;
