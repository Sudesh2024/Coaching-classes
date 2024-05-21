import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL if different

export const registerStudent = async (data) => {
    return axios.post(`${API_URL}/students/register`, data);
};

export const loginStudent = async (data) => {
    return axios.post(`${API_URL}/students/login`, data);
};

export const getCourses = async () => {
    return axios.get(`${API_URL}/courses`);
};

export const registerCourse = async (data, token) => {
    return axios.post(`${API_URL}/students/register-course`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const adminLogin = async (data) => {
    return axios.post(`${API_URL}/admin/login`, data);
};

export const createCourse = async (data, token) => {
    return axios.post(`${API_URL}/admin/course`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
