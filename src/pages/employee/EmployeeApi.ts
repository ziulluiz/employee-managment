import Employee from "./Employee";

export function searchEmployees (){
    if(!localStorage['employees']){
        localStorage['employees'] = '[]';
    }
    let employees = localStorage['employees'];
    employees = JSON.parse(employees);
    return employees;
}

export function removeEmployee(id: string){
    let employees = searchEmployees();
    let index = employees.findIndex((employee: Employee) => employee.employee_id == id)
    employees.splice(index, 1);
    localStorage['employees'] = JSON.stringify(employees)

}

export function saveEmployee(employee: Employee){
    let employees = searchEmployees();
    if(employee.employee_id){
        let index = employees.findIndex((c: Employee) => c.employee_id == employee.employee_id);
        employees[index] = employee;
    } else {
        employee.employee_id = String(Math.round(Math.random()* 100000));
        employees.push(employee);
    }
    localStorage['employees'] = JSON.stringify(employees)
}

export function searchEmployeeById(id: string) {
    let employees = searchEmployees();
    return employees.find((employee: any) => employee.id == id)
}