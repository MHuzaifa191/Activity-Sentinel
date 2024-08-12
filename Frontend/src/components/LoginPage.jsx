import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const data = {
            username: username,
            password: password,
            admin: isAdmin,
        };

        try {
            const response = await axios.post("/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log("Success:", response.data);
                
                // Save the username in session storage
                sessionStorage.setItem('username', username);

                // Set the username in AuthContext
                login(username);

                // Redirect to home page
                navigate("/home");
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-content">
                <p className="title">Login Form</p>
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
    );
}

export default LoginPage;
