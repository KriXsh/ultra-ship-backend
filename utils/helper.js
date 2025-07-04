'use strict';

const { nanoid } = require('nanoid');

/**
 * @description - create unique userId for rook users 
 */ 
const createNanoUserId = async () => {
    const nanoIdString = nanoid(12);
    const nanoIdInteger = nanoIdString
        .split('')
        .map(char => char.charCodeAt(0))
        .join('')
        .slice(0, 12);

    return parseInt(nanoIdInteger, 10);
};


module.exports = {
    createNanoUserId,
};