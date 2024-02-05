export const API_DOMAIN = "http://192.168.1.111:9000/api/employees";
export const getEmployeesEndpoint = (offset , limit) =>`${API_DOMAIN}?offset=${offset}&limit=${limit}`;
export const getCitiesEndpoint = () =>  API_DOMAIN + "/cities";
export const getEmployeesByCityEndpoint = (city) => `${API_DOMAIN}?city=${city}`;
export const getEmployeeByNameEndpoint = (name) => `${API_DOMAIN}?name=${name}`;
export const getEmployeeByIdEndpoint = (id) => `${API_DOMAIN}/${id}`;