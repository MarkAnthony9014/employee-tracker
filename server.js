const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');


const openApp = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'open',
            message: 'Please select what you would like to do (Note: If this is your first time, please select add',
            choices: ['Add', 'Update', 'View', 'Quit']
        }
    ])
    .then (function(res) {
        switch (res.open) { case 'Add': add(); break; 
                               case 'Update': updateEmp(); break;
                               case 'View': view(); break;
                               case 'Quit': console.log('Until next time!'); break;
                               default: console.log('');
     }
    });
}



const add = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'add',
            message: 'Please select what you would like to add',
            choices: ['Department', 'Role', 'Employee', 'Quit']
        }
    ])
    .then (function(res) {
        switch (res.add) { case 'Department': addDept(); break; 
                               case 'Role': addRole(); break;
                               case 'Employee': addEmp(); break;
                               case 'Quit': console.log('Until next time!'); break;
                               default: console.log('');
     }
    });
}

const addDept = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'Please input the name of this department',
        }
    ])
    .then (function(answer){
        db.query( `INSERT INTO departments (name) VALUES (?)`, [answer.department],
        function (err) {
            if (err) throw err;
            console.log('/n');
            console.log(`The ${answer.department} department has been made!`);

            openApp();
        });
    });
}


const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'role',
            message: 'Please input a name for this role',
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter the id number of the department this role belongs to',
            validate: function(value) { if (!isNaN(value)){return true;}
            return false;
            }
        }, 
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter the yearly salary of this role',
            validate: function(value) { if (!isNaN(value)){return true;}
            return false;
            }
        },
    ])
    .then (function(answer){
        db.query( `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
        [
            answer.role,
            answer.salary,
            answer.department_id
        ],
        function (err) {
            if (err) throw err;

            console.log('/n');

            console.log(`The ${answer.role} role has been made!`);

            openApp();
        });
    });
}

const view = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'view',
            message: 'Please select what you would like to view',
            choices: ['Department', 'Role', 'Employee', 'Quit']
        }
    ])
    .then (function(res) {
        switch (res.view) { case 'Department': viewDept(); break; 
                               case 'Role': viewRole(); break;
                               case 'Employee': viewEmp(); break;
                               case 'Quit': console.log('Until next time!'); break;
                               default: console.log('');
     }
    });
}



const viewDept = () => {
    db.query(`SELECT * FROM departments`, function(err, result) {
     console.table(result);

     openApp();
    })
}



const viewRole = () => {
    db.query(`SELECT * FROM roles`, function(err, result) {
     console.table(result);

     openApp();
    })
}



const viewEmp = () => {
    db.query(`SELECT * FROM employees`, function(err, result) {
     console.table(result);

     openApp();
    })
}



const addEmp = () => {
    db.query(`SELECT * FROM roles`, function(err, results1) {
        db.query(`SELECT * FROM employees`, function(err, results2) {
        if (err) throw (err);

        inquirer.prompt ([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please input a name for this employee',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please input a last name for this employee',
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role would you like to assign for this employee?',
                choices: results1.map( function (res) {
                    return {
                        name: res.title,
                        value: res.id
                    }
                })
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Which employee would you like to assign as a manager for this employee?',
                choices: results2.map( function (res) {
                    return {
                        name: `${res.first_name} ${res.last_name}`,
                        value: res.id
                    }
                })
            }
        ]) .then (function(answer){
            db.query( `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
            [
                answer.firstName,
                answer.lastName,
                answer.role_id,
                answer.manager_id
            ],
            function (err) {
                if (err) throw err;
    
                console.log('/n');
    
                console.log(`${answer.firstName} ${answer.lastName} has been added!`);
    
                openApp();
            });
        });
        
   });
});

} 


// const updateEmp = () => {
//     db.query('SELECT * FROM employees', (err, result) {

//     })
// }



openApp();