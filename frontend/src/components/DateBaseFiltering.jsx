import useDateBaseFiltering from "../hooks/useDateBaseFiltering";

const DateBaseFiltering = ({ officeId }) => {
    const { list, loading, hasErrors } = useDateBaseFiltering(officeId);

    if (loading) return <div>Loading...</div>
    if (hasErrors) return <div>{hasErrors}</div>
    if (!list) return <div>No queues for today</div>

    const { waiting = [], completed = [], expired = [] } = list;

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-wide">Queue Counts for Today</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[var(--table-color)] p-5">
                    <p>Total: {waiting.length + completed.length + expired.length}</p>
                </div>

                <div className="bg-[var(--table-color)] p-5">
                    <p className="font-semibold mb-2">Title</p>

                    <div className="grid grid-cols-3 text-sm font-medium text-center mb-1 space-x-3">
                        <span>Total waiting queue</span>
                        <span>Total expired queue</span>
                        <span>Completed</span>
                    </div>

                    <div className="grid grid-cols-3 text-start text-3xl">
                        <span>{waiting.length}</span>
                        <span>{expired.length}</span>
                        <span>{completed.length}</span>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default DateBaseFiltering;
