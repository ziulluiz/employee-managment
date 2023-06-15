import Customer from "./Customer";
// export function searchCustomers (){

//     fetch('/api/customers, {
//         "method": 'GET',
//         "headers": {
//             "Content-Type": 'application/json'
//         }
//     }').then(respose => response.json() )

//     if(!localStorage['customers']){
//         localStorage['customers'] = '[]';
//     }
//     let customers = localStorage['customers'];
//     customers = JSON.parse(customers);
//     return customers;
// }

export async function searchCustomers() {
    let url = 'http://localhost:8080/api/'+ 'customers'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
    // let response =await fetch('http://localhost:8080/api/customers', {
    //     "method": "GET",
    //     "headers": {
    //         "Content-Type": 'application/json'
    //     }
    // })
    // return await response.json();
  }

export async function removeCustomer(id: string){
    let customers = await searchCustomers();
    let index = customers.findIndex((customer: Customer) => customer.id == id)
    customers.splice(index, 1);
    localStorage['customers'] = JSON.stringify(customers)

}

export async function saveCustomer(customer: Customer){
    let customers = await searchCustomers();
    if(customer.id){
        let index = customers.findIndex((c: Customer) => c.id == customer.id);
        customers[index] = customer;
    } else {
        customer.id = String(Math.round(Math.random()* 100000));
        customers.push(customer);
    }
    localStorage['customers'] = JSON.stringify(customers)
}

export async function searchCustomerById(id: string) {
    let customers = await searchCustomers();
    return customers.find((customer: any) => customer.id == id)
}