import { useState } from "react";

const SimpleForm = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault() // Prevents the default action of the form submission - page reload.
        console.log('Name: ', name)
        console.log('Email: ', email)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                {/* Controlled component - It is when the input field control is given to React alone 
                helping to avoid confusions from DOM and ReactDOM updating the same UI component */}
                <input type="text" id="name" value={name} onChange={
                    (event) => {
                        setName(event.target.value);
                    }
                } />
                <br />
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" value={email} onChange={
                    (event) => {
                        setEmail(event.target.value);
                    }
                } />

                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default SimpleForm