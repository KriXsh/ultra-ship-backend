const bcrypt = require('bcryptjs');

// Example of a stored bcrypt hash (this should come from your MongoDB record)
const storedHash = '$2b$10$BqQUzy.f7Hgzb7fFF3KScuXmfIcZLYLfcjyU6Z1cXX3DnJf38WIGK';

// The static password (plain-text) to compare
const enteredPassword = 'adminPassword123';  // This is the same as the one during sign-up

// Manually compare the entered password to the stored hash
bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    console.log('Password match:', isMatch);  // Should log true if the passwords match
  }
});
