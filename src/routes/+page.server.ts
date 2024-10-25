export const load =async ({fetch})=>{
    const response = await fetch("http://localhost:3000/api/positions/hierarchy/1");
    const data = await response.json();
    return {data};
}


