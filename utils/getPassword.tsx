export const checkPasswordStrength = (password: string): string => {
    // Define regex patterns to match uppercase, lowercase, numbers, and special characters
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharacterPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check for password length
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    // Check for presence of uppercase letters
    if (!uppercasePattern.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }

    // Check for presence of lowercase letters
    if (!lowercasePattern.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }

    // Check for presence of numbers
    if (!numberPattern.test(password)) {
        return 'Password must contain at least one number';
    }

    // Check for presence of special characters
    if (!specialCharacterPattern.test(password)) {
        return 'Password must contain at least one special character';
    }

    // Password meets all criteria, return an empty string indicating strong password
    return '';
};