<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from '$lib/components/ui/label';
    import { Button } from '$lib/components/ui/button';

    import { Trash } from 'lucide-svelte'
	import { toast } from 'svelte-sonner';

    export let PositionToDelete: DeletePosition;
    let deleteChildren = false
  
	//for the dialog
	let open = false;

	export let onAction: ()=> void;

    async function handleDeletePosition(){
        try {
			const response = await fetch(`http://localhost:3000/api/positions/${PositionToDelete.id}?deleteChildren=${deleteChildren}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
		if(response.ok){
			toast('✅ successfully deleted!')
		}
		} catch (error) {
			toast('⚠️ failed to delete!')
		}
		open = false
		if(onAction){
				onAction()
			}
    }

</script>

<Dialog.Root bind:open>
	<Dialog.Trigger><Button variant="outline"><Trash color="#F44336" /></Button></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Delete Position</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to delte {PositionToDelete.name}
			</Dialog.Description>
		</Dialog.Header>
			
<div class="flex items-center space-x-2">
				
				<Checkbox id="terms" bind:checked={deleteChildren} />
                <Label
    for="terms"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >Tick the box if you want to delete {PositionToDelete.name} with its child Positions. </Label>
			</div>
		
		<Dialog.Footer>
			<Button type="submit" on:click={()=>handleDeletePosition()}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
