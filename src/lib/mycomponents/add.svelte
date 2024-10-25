<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';
	import { toast } from "svelte-sonner";
	

    import { Plus } from 'lucide-svelte'


    export let positionId: number;

	//take parent funtion to refresh the page after adding position
	export let onAction: ()=> void;
    let newPositionData: NewPosition = {name:"", description:"", parent_id:0}; 

	//for the dialog
	let open = false;
    

    async function handleAddPosition(newPositionData: NewPosition){
        newPositionData.parent_id = positionId;
        try {
            const response = await fetch("http://localhost:3000/api/positions/", {
                method: 'POST',
                body: JSON.stringify(newPositionData),
                headers: {
                    'Content-Type': 'application/json' 
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

			open = false
			toast('✅ Position added')
			if(onAction){
				onAction()
			}
       
        } catch (error) {
			toast('⚠️ failed to add!')
        }
    }
</script>
<div>

<Dialog.Root bind:open>
	<Dialog.Trigger><Button variant="outline"><Plus color="#4CAF50" /></Button></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Position</Dialog.Title>
			<Dialog.Description>
				Add the Position here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={newPositionData.name} class="col-span-3" required/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Description</Label>
				<Input id="description" bind:value={newPositionData.description} class="col-span-3" required/>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={()=>handleAddPosition(newPositionData)}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
</div>
