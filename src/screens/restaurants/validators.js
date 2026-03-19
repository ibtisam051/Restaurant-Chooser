export const validateName = (name) => {
    if (!name.trim()) {
        return "Restaurant Name is required";
    }
    if (name.length < 2) {
        return "Restaurant Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z0-9\s,'-]+$/.test(name)) {
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

export const validateAddress = (address) => {
    if (!address.trim()) {
        return "Address is required";
    }
    if (!/\d+/.test(address) || !/[a-zA-Z]+/.test(address)) {
        return "Address must contain both numbers and letters";
    }
    if (address.length < 5) {
        return "Address must be at least 5 characters";
    }
    return null;
};

export const validateWebsite = (website) => {
    if (!website.trim()) {
        return "Website is required";
    }
    try {
        const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
        if (!urlRegex.test(website)) {
            return "Invalid website URL";
        }
        if (!website.startsWith("http://") && !website.startsWith("https://")) {
            return "Website must start with http:// or https://";
        }
    } catch (error) {
        return "Invalid website URL";
    }
    return null;
};