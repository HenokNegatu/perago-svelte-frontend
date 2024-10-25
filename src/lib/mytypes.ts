interface Positions {
    id: number;
    name: string;
    description: string;
    parent_id:number;
    children: Positions[]
}