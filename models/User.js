const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' }, // role-based access control
});


//note : we can also use 'bcrypt' and aes-256 algo for enhance sequrity 

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);  // Hash the password with a salt rounds of 10
  next(); // Proceed to save
});


// Method to compare provided password with hashed password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);  
};



module.exports = mongoose.model('User', userSchema);
