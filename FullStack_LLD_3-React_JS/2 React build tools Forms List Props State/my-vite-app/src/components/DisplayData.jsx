const displayData = ({fruits, person}) => {
    return (
        <>
            <h2>Fruits list : </h2>
            <ol>
                {fruits.map((fruit, index) => {
                    return <li key={index}>{fruit}</li>
                })}
            </ol>

            <h2>Person details : </h2>
            <p>Name: {person.name}</p>
            <p>Age: {person.age}</p>
        </>
    );
}

export default displayData;