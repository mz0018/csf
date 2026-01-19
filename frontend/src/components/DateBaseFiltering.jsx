import useDateBaseFiltering from "../hooks/useDateBaseFiltering";

const DateBaseFiltering = ({ officeId }) => {
    const { list, loading, hasErrors } = useDateBaseFiltering(officeId);

    if (loading) return <div>Loading...</div>
    if (hasErrors) return <div>{hasErrors}</div>
    if (!list) return <div>No queues for today</div>

    const { waiting = [], completed = [], expired = [] } = list;

    return (
        <section>
            <h2>Queue Counts for Today</h2>
            <p>Waiting: {waiting.length}</p>
            <p>Completed: {completed.length}</p>
            <p>Expired: {expired.length}</p>
            <p>Total: {waiting.length + completed.length + expired.length}</p>
        </section>
    )
}

export default DateBaseFiltering;
