import crypto from 'crypto';

export const generateHash = () => {
    // Generate a random string
    const randomString = Math.random().toString(36).substring(2);

    // Create a hash of the random string using SHA-256
    return crypto.createHash('sha256').update(randomString).digest('hex');
}