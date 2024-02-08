import axios from "axios";
import { createEmployeeEndpoint, deleteEmployeeByIdEndPoint, getMediaUploadEndPoint, putEmployeeByIdEndpoint } from "./endpoints";

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
async function uploadToServer(uri){
    try {
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        const endpoint = getMediaUploadEndPoint()
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.message)
        return null;
    }
}

const api = { saveEmployee, deleteEmployee , uploadToServer };
export default api;