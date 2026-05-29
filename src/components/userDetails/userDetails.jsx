import React, { useState, useEffect } from "react";

const UserDetailsModal = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        gender: "",
        age: "",
        className: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const data = localStorage.getItem(
            "mental_health_user_details"
        );

        if (data) {
            setForm(JSON.parse(data));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            ...form,
            timestamp: new Date().toISOString(),
        };

        localStorage.setItem(
            "mental_health_user_details",
            JSON.stringify(payload)
        );

        onSubmit(payload);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!form.age) {
            newErrors.age = "Age is required";
        }

        if (!form.className) {
            newErrors.className = "Class is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4!">
            <div className="w-full max-w-md rounded-3xl bg-white p-6! shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-4!">
                    Tell Us About Yourself
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3!"
                    />

                    <select
                        name="gender"
                        required
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3!"
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        required
                        value={form.age}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3!"
                    />

                    <select
                        name="className"
                        required
                        value={form.className}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3!"
                    >
                        <option value="">Select Class</option>

                        {Array.from({ length: 9 }, (_, i) => i + 4).map((cls) => (
                            <option key={cls} value={`Class ${cls}`}>
                                Class {cls}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border p-3! font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-[#8D48BB] p-3! text-white font-medium"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetailsModal;