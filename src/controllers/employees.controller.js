import { pool } from '../connection.js'

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * from employees')
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            messege: 'Error getting employees'
        })
    }
}

export const getEmployee = async (req, res) => {
    try {
        const [row] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        if (row.length <= 0) return res.status(404).json({ messege: `Employee with ID ${req.params.id} was not found.` })
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({
            messege: 'Error getting the employee'
        })
    }

}

export const createEmployees = async (req, res) => {
    try {
        const { name, salary } = req.body
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary]);
        console.log(req.body)
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        return res.status(500).json({
            messege: 'Something goes wrong'
        })
    }

}

export const deleteEmployees = async (req, res) => {
    const { id } = req.params;
    const [row] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

    try {
        if (row.affectedRows <= 0)
            return res.status(404).json({
                messege: `Employee ID ${req.params.id} not found`
            })
        res.send(`Employee ID #${id} deleted succesfully`);

    } catch (error) {
        return res.status(500).json({
            messege: 'Something goes wrong'
        })
    }

}


export const updateEmployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    try {
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id]);
        console.log(result)

        if (result.affectedRows === 0) return res.status(404).json({
            messege: 'Employee #' + id +' not found :('
        })

        const [row] = await pool.query('SELECT * FROM employees where id = ?', [id]);
        res.json(row[0])

    } catch (error) {
        return res.status(500).json({
            messege: 'Something goes wrong'
        })
    }


}