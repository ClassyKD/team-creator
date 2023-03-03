class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = "";
        this.github = "";
        this.school = "";
    }
    getName() { return this.name }
    getId() { return this.id }
    getEmail() { return this.email }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = `https://github.com/${github}/`;
        this.role = "Engineer";
    }
    getRole() { return this.role }
    getGithub() { return this.github }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school;
        this.role = "Intern";
    }
    getSchool() { return this.school }
    getRole() { return this.role }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }
    getOfficeNumber() { return this.officeNumber }
    getRole() { return this.role }
}

module.exports.Employee = Employee
module.exports.Engineer = Engineer
module.exports.Intern = Intern
module.exports.Manager = Manager