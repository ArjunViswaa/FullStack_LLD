const ConditionalRendering = ({ isLoggedIn, username }) => {
    return (
        <>
            {isLoggedIn ? (
                <h1>Welcome, {username}!</h1>
            ) : (
                <h1>Please log in ...   </h1>
            )}
        </>
    );
}

export default ConditionalRendering;