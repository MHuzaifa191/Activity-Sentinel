import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const data = {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            admin: isAdmin,
        };

        try {
            const response = await axios.post("/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Success:", response.data);
            // Navigate to login page after successful registration
            navigate("/login");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            // Handle error
        }
    };

    return (
        <>
            <div className="form-wrapper">
                <div className="form-content">
                    <p className="title">Register Form</p>

                    <form className="App form-padding" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                        <label>
                            Admin
                            <input
                                type="checkbox"
                                name="isadmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </label>
                        <input
                            type="submit"
                            style={{ backgroundColor: "#a1eafb" }}
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
