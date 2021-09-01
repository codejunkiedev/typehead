export const fetchSearchText = async (searchText:string,)=>{
    const endpoint = `https://api.github.com/search/users?q=${searchText}`;
    const data = await (await fetch(endpoint)).json();
    return data.items;
}