const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route (accessible to everyone)
router.get('/', employeeController.getEmployees);

// Route accessible only to admins (requires authentication and admin role)
router.post('/create', authMiddleware(['admin']), employeeController.addEmployee);

// Route accessible only to admins (requires authentication and admin role)
router.put('/:id', authMiddleware(['admin']), employeeController.updateEmployee);

// Route to get a single employee (employees can only get their own data)
router.get('/:id', authMiddleware(['admin']), employeeController.getEmployee);



module.exports = router;