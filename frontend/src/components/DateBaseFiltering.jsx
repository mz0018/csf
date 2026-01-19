import useDateBaseFiltering from "../hooks/useDateBaseFiltering";

const DateBaseFiltering = ({ officeId }) => {

    const { list, loading, hasErrors } = useDateBaseFiltering(officeId);

    if (loading) return <div>Loading...</div>
    if (hasErrors) return <div>{hasErrors}</div>

    return (
        <section>
            {(list || []).map((item) => (
                <ul key={item._id}>
                    <li>{item.queueNumber}</li>
                </ul>
            ))}
        </section>
    )
}

export default DateBaseFiltering;