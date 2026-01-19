import useDateBaseFiltering from "../hooks/useDateBaseFiltering";

const DateBaseFiltering = ({ officeId }) => {
    const { list, loading, hasErrors } = useDateBaseFiltering(officeId);

    if (loading) return <div>Loading...</div>
    if (hasErrors) return <div>{hasErrors}</div>
    if (!list) return <div>No queues for today</div>

    const { waiting = [], completed = [], expired = [] } = list;

    return (
        <section>
            <h2 className="text-2xl font-bold tracking-wide">Queue Counts for Today</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--table-color)]">
                    <p>Total: {waiting.length + completed.length + expired.length}</p>
                </div>

                <div className="bg-[var(--table-color)] grid grid-cols-3 gap-2">
                    <div>Waiting: {waiting.length}</div>
                    <div>Completed: {completed.length}</div>
                    <div>Expired: {expired.length}</div>    
                </div>
            </div>

        </section>
    )
}

export default DateBaseFiltering;
