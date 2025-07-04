'use strict';

const bcrypt = require('bcryptjs');

const encryptPassword = async (password, saltRounds = 10) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw new Error('Password encryption failed');
    }
};

/**
 * @description this function for encrypt password
 */
const comparePassword = async (string, hash) => {
    try {
        return await bcrypt.compare(string, hash);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};

module.exports = {
    encryptPassword,
    comparePassword
};