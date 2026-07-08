import { useState } from 'react';
import { summarizeContent } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useSummarize = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const summarize = async (file, text) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            if (file) {
                formData.append("file", file);
            } else {
                formData.append("text", text);
            }

            const data = await summarizeContent(formData);

            // =============================
            // SIMPAN KE LOCAL STORAGE
            // =============================

            const history =
                JSON.parse(localStorage.getItem("summary_history")) || [];

            history.unshift({
                id: Date.now(),
                date: new Date().toLocaleString("id-ID"),
                ...data
            });

            localStorage.setItem(
                "summary_history",
                JSON.stringify(history)
            );

            navigate("/hasil", {
                state: {
                    result: data
                }
            });

        } catch (err) {
            setError(err.response?.data?.detail || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return {
        summarize,
        loading,
        error
    };
};