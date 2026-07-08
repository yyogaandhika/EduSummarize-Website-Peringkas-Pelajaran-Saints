import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const healthCheck = async () => {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
};

export const summarizeContent = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/summarize`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const downloadFile = async (summary, type) => {
    const formData = new FormData();
    formData.append('summary', summary);
    const response = await axios.post(`${API_BASE_URL}/download/${type}`, formData, {
        responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ringkasan.${type}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};
