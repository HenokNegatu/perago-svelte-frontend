interface Positions {
    id: number;
    name: string;
    description: string;
    parent_id:number;
    children: Positions[]
}

type EditPosition = {
    id: number;
    name: string;
    description: string;
    parent_id: number;
}

type NewPosition = {
    name: string;
    description: string;
    parent_id: number;
}

type DeletePosition = {
    id: number;
    name: string;
    
}