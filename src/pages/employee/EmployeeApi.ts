import { ExceptionCode } from "@capacitor/core";
import Employee from "./Employee";

export async function searchEmployees (){
    let url = 'http://localhost:8080/api/'+ 'employees'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
    return await response.json();
}

export async function removeEmployee(id: string){
    let url = 'http://localhost:8080/api/'+ 'employees/' + id
    let response = await fetch(url, {
      "method": 'DELETE',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
    return await response.json();

}

export async function saveEmployee(employee: Employee) {
    let url = 'http://localhost:8080/api/'+ 'employee'
    await fetch(url, {
      "method": 'POST',
      "body": JSON.stringify(employee),
      "headers": {
        "Content-Type": 'application/json'
      }
    })
}

export async function searchEmployeeById(id: string) {
    let url = 'http://localhost:8080/api/'+ 'employees/' + id
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}