<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';

    import { Edit } from 'lucide-svelte'
	import { toast } from 'svelte-sonner';

    export let editPosition: EditPosition;

   
	//for the dialog
	let open = false;

	export let onAction: ()=> void;

    async function handleUpdatePosition(position: EditPosition){
        try {
			const response = await fetch(`http://localhost:3000/api/positions/${position.id}`,{
            method:'PUT',
            body: JSON.stringify(position),
			headers: {
                    'Content-Type': 'application/json' 
                }
        })
		if(response.ok){
			toast('✅ successfully edited!')
		}
		} catch (error) {
			toast('⚠️ failed to edit!')
		}
		open = false
		if(onAction){
				onAction()
			}
    }

</script>

<Dialog.Root bind:open>
	<Dialog.Trigger><Button variant="outline"><Edit color="#2196F3" /></Button></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Position</Dialog.Title>
			<Dialog.Description>
				Make changes the Position here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" bind:value={editPosition.name} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Description</Label>
				<Input id="description" bind:value={editPosition.description} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={()=>handleUpdatePosition(editPosition)}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
