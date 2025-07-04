// controllers/employeeController.js

const employeeService = require('../services/employeeService');


// Controller to get all employees
const getEmployees = async (req, res) => {
    const { page = 1, limit = 10, name, sortBy, sortOrder } = req.query;

    console.log('Query Parameters:', { page, limit, name, sortBy, sortOrder });

    try {
        const employees = await employeeService.getEmployees(
            page,
            limit,
            name,
            sortBy,
            sortOrder
        );
        return res.json({ code: 200, message: " Data found sucessfully", employees: employees });
    } catch (err) {
        console.error('Error in getEmployees:', err);
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
};

// Controller to get a single employee by ID
const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ code: 404, message: 'Employee not found' });
        }
        return res.json({ code: 200, message: " Data found sucessfully", employee: employee });
    } catch (err) {
        res.status(500).json({ code: 500, message: 'Failed to retrieve employee' });
    }
};

// Controller to create a new employee
const addEmployee = async (req, res) => {
    console.log('Received request to add a new employee:', req.body);  // Log incoming request body

    const { name, age, class: className, subjects, attendance } = req.body;

    try {
        const newEmployee = await employeeService.createEmployee(
            name,
            age,
            className,
            subjects,
            attendance
        );
        return res.status(201).json({ code: 201, newEmployee });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ code: 500, error: 'Failed to add employee' });
    }
};


// Controller to update an existing employee
const updateEmployee = async (req, res) => {
    const { id } = req.params; // Extract employee ID from the URL
    let { name, age, class: className, subjects, attendance } = req.body; // Extract data to update

    // Convert attendance to number if it's a percentage string
    if (typeof attendance === 'string' && attendance.includes('%')) {
        attendance = parseFloat(attendance.replace('%', '')); // Remove '%' and convert to number
    }

    try {
        // Log the incoming data for debugging purposes
        console.log(`Updating employee with ID: ${id}`);
        console.log(`New data:`, req.body);

        // Call the service function to update the employee
        const updatedEmployee = await employeeService.updateEmployee(
            id,
            name,
            age,
            className,
            subjects,
            attendance
        );

        // If no employee was found and updated, return a 404 error
        if (!updatedEmployee) {
            console.log(`Employee with ID ${id} not found.`);
            return res.status(404).json({ code: 404, message: 'Employee not found' });
        }

        // Success: Return the updated employee data
        return res.status(200).json({ code: 200, message: "Data updated successfully", updatedEmployee });
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error while updating employee:', err);
        return res.status(500).json({ code: 500, error: 'Failed to update employee', details: err.message });
    }
};



module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    updateEmployee,
};
