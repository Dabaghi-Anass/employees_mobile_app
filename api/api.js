import axios from "axios";
import { createEmployeeEndpoint, deleteEmployeeByIdEndPoint, putEmployeeByIdEndpoint } from "./endpoints";

async function saveEmployee(employee){
    let response;
    if(employee.id){
        const endPoint = putEmployeeByIdEndpoint(employee.id);
        response = await axios.put(endPoint, employee);
    }
    else {
        const endPoint = createEmployeeEndpoint();
        response = await axios.post(endPoint, employee);
    }
    return response.data;
}
async function deleteEmployee(id){
    await axios.delete(deleteEmployeeByIdEndPoint(id));
}

const api = { saveEmployee, deleteEmployee };
export default api;