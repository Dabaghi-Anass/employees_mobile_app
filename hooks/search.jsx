export default function search(query, {data , key} ){
    if(query != "" && data != null) {
        return data.filter(e => e[key].toLowerCase().includes(query.toLowerCase()));
    }
    return data;
}