export const validateName = (name) => {
    if (!name.trim()) {
        return "Name is required";
    }
    if (name.length < 2) {
        return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return "Name contains invalid characters";
    }
    return null;
};

export const validatePhone = (phone) => {
    if (!phone.trim()) {
        return "Phone Number is required";
    }
    const phoneRegex = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
        return "Invalid phone number format";
    }
    return null;
};

export const validateEmail = (email) => {
    if (!email.trim()) {
        return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }
    return null;
};