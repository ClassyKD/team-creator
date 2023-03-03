const fs = require('fs');
const inquirer = require('inquirer');

//Requires Employee, Engineer, Intern, Manager
const { Employee } = require('./roles.js');
const { Engineer } = require('./roles.js');
const { Intern } = require('./roles.js');
const { Manager } = require('./roles.js');

//here to create the HTML
const { htmlbeginning } = require('./htmlcreate');
const { htmlend } = require('./htmlcreate');
const { htmldivider } = require('./htmlcreate');

//holders for employee 
var employeeGit = ""
var employeeArray = []
var employee = {
    name: "",
    id: "",
    email: "",
    github: "",
    school: "",
    officeNumber: "",
}

//Shows initial menu to add employee, view team, or finish
function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'choice',
                choices: ['Add Employee to team',  'View team', 'Finalize team']
            },
        ])
        .then((answer) => {
            if (answer.choice == "Add Employee to team") {
                getEmployee()
            } else if (answer.choice == "View team") {
                console.log(employeeArray)
                init()
            } else {
                 end() 
                }
        });
}

//Immediately ask about employee so that you can loop through and add employees
function getEmployee() {
inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the Employee's name?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the Employee's id number?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the Employee's email?",
            name: 'email',
        },
        {
            type: 'list',
            message: "What is the Employee's role within the project?",
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern']
        },
    ])
    .then((answer) => {
        employee.name = answer.name;
        employee.id = answer.id;
        employee.email = answer.email;
        switch (answer.role) {
            case "Intern":
                getIntern()
                break;
            case "Engineer":
                getEngineer()
                break;
            case "Manager":
                getManager()
                break;
        }
    });
}

//Questions for Manager
function getManager() {
    inquirer
        .prompt([
        {
            type: 'input',
            message: "What is the Manager's office number?",
            name: 'officeNumber',
        }
    ])
        .then((answer) => {
            employee.officeNumber = answer.officeNumber;
            let current = new Manager(
                employee.name, 
                employee.id, employee.email, 
                employee.officeNumber
                );
            employeeArray.push(current);
            init()
        });
}

//Questions for Engineer
function getEngineer() {
    inquirer
        .prompt([
        {
            type: 'input',
            message: "What is the Engineer's github username?",
            name: 'github',
        }
    ])
        .then((answer) => {
            employee.github = answer.github;
            let current = new Engineer(
                employee.name, 
                employee.id, 
                employee.email, 
                employee.github
                );
            employeeArray.push(current);
            init()
        });
}

//Questions for Intern
function getIntern() {
    inquirer
        .prompt([
        {
            type: 'input',
            message: "What school does the Intern go to?",
            name: 'school',
        }
    ])
    .then((answer) => {
        employee.school = answer.school;
        let current = new Intern(
            employee.name, 
            employee.id, 
            employee.email, 
            employee.school
            );
        employeeArray.push(current);
        init()
    });
}

//Finalize with team name then add everything into HTML
function end() {
    inquirer
        .prompt([
        {
            type: 'input',
            message: "What is your project team's name?",
            name: "teamName"
        }
    ])
    //appends html boiler plate
    .then((answer) => {
         if (answer.teamName) {
            fs.writeFile(`./output/employee-tracker.html`, htmlbeginning,
                (error) =>
                     error
                        ? console.error(error) : console.info('updated team roster!')
            );

            //appends team name to header
            fs.appendFile(`./output/employee-tracker.html`, answer.teamName,
                (error) =>
                    error
                        ? console.error(error) : console.info('updated team roster!')
                );

                //adds divider between header and body
            setTimeout(function () {
                fs.appendFile(`./output/employee-tracker.html`, htmldivider,
                    (error) =>
                        error
                            ? console.error(error) : console.info('updated team roster!')
                );
                }, 
                100);

                //adds each employee card to body
            setTimeout(function () {
                employeeArray.forEach(item => {
                    if (item.github.length > 0) { 
                        employeeGit = `<a href ="${item.github}">${item.github}</a>` 
                    } else {
                        employeeGit = "" 
                    }

                    fs.appendFile(`./output/employee-tracker.html`, `
                        <div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${item.role} ${item.id}</h6>
                          <a href ="mailto:${item.email}">${item.email}</a>
                          <div class="col-12">${employeeGit}${item.officeNumber}${item.school}</div>
                        </div>
                      </div>`,
                            (error) =>
                                error
                                    ? console.error(error) : console.info('Building roster...'))
                    });
                }, 
                100);

                //adds boiler plate ender to HTML
            setTimeout(function () {
                fs.appendFile(`./output/employee-tracker.html`, htmlend,
                    (error) =>
                        error
                            ? console.error(error) : console.info('updated team roster!')
                );
            }, 
            300);
        } else {
            console.log("Team name is required!")
            end()
        }
    })
    return
}

//starts the process of collecting the employees information
init()