<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

    export let position: EditPosition;

</script>

<Dialog.Root>
	<Dialog.Trigger>{position.name}</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{position.name}</Dialog.Title>
			<Dialog.Description>
				{position.description}
			</Dialog.Description>
		</Dialog.Header>
	
	</Dialog.Content>
</Dialog.Root>
