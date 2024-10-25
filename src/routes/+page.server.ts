import type { Actions } from "@sveltejs/kit";

export const load =async ({fetch})=>{
    const response = await fetch("http://localhost:3000/api/positions/hierarchy/1");
    const data = await response.json();
    return {data};
}

export const actions: Actions = {
    addPosition: async ({request, fetch})=>{
        const formData = await request.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const parent_id = formData.get("parent_id");
        const response = await fetch("http://localhost:3000/api/positions", {
            method: "POST",
            body: JSON.stringify({name: "CEO"}),
        });
    },
    getPosition: async ({request, fetch})=>{
        const id = await ( await request.formData()).get("id");
        const response = await fetch(`http://localhost:3000/api/positions/hierarchy/${id}`);
        const data = await response.json();
        console.log(data)
        return {data};
    },
    updatePosition: async ({request, fetch})=>{
        const formData = await request.formData();
        const id = formData.get("id");
        const name = formData.get("name");
        const description = formData.get("description");
        const parent_id = formData.get("parent_id");
    },
    deletePosition: async ({request, fetch})=>{
        const id = await (await request.formData()).get("id");
        const response = await fetch(`http://localhost:3000/api/positions/${id}`, {
            method: "DELETE",
        });
    }

};


