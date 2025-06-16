//src/utils/api.js


const API_URL = "http://localhost:2000/api/auth";
const API_URL2 = "http://localhost:2000/api";

export const signupUser = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log("Debugging api.js",formData)   
        return await response.json();
    } catch (error) {
        console.error("Signup Error:", error);
        return { message: "Server Error" };
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        console.log("Login ___Debugging api.js ",formData)   

        return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        return { message: "Server Error" };
    }
};


export const fetchRecordings = async () => {
    try {
        const response = await fetch(`${API_URL2}/recordings`); // Assuming this endpoint returns saved recordings
        if (!response.ok) {
            throw new Error("Failed to fetch recordings");
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch Recordings Error:", error);
        return [];
    }
};