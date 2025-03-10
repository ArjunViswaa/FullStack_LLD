import { useState } from "react";

const AdvancedForm = () => {
    const [formData, setFormData] = useState({name: "", email: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name : ${formData.name} and Email : ${formData.email}`);

        setFormData({name: "", email: ""});
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({...prevData, [id]: value}));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <button type="submit">Submit Form</button>
        </form>
    )
}

export default AdvancedForm;