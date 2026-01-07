import React, { Suspense, lazy } from "react";
const AdminQueueTable = lazy(() => import('../../components/AdminComponents/AdminQueueTable'));
import AdminQueueTableFallback from "../../fallbacks/AdminQueueTableFallback";

const QueueingSection = () => {

    return (
        <>
            <Suspense fallback={<AdminQueueTableFallback />}>
                <AdminQueueTable />
            </Suspense>
        </>
    );
};

export default QueueingSection;
