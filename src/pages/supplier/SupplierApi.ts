import Supplier from "./Supplier";

export function searchSuppliers (){
    if(!localStorage['suppliers']){
        localStorage['suppliers'] = '[]';
    }
    let suppliers = localStorage['suppliers'];
    suppliers = JSON.parse(suppliers);
    return suppliers;
}

export function removeSupplier(id: string){
    let suppliers = searchSuppliers();
    let index = suppliers.findIndex((supplier: Supplier) => supplier.supplier_id == id)
    suppliers.splice(index, 1);
    localStorage['suppliers'] = JSON.stringify(suppliers)

}

export function saveSupplier(supplier: Supplier){
    let suppliers = searchSuppliers();
    if(supplier.supplier_id){
        let index = suppliers.findIndex((c: Supplier) => c.supplier_id == supplier.supplier_id);
        suppliers[index] = supplier;
    } else {
        supplier.supplier_id = String(Math.round(Math.random()* 100000));
        suppliers.push(supplier);
    }
    localStorage['suppliers'] = JSON.stringify(suppliers)
}

export function searchSupplierById(id: string) {
    let suppliers = searchSuppliers();
    return suppliers.find((supplier: any) => supplier.id == id)
}