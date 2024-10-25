<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Trash, ChevronRight, ChevronLeft } from 'lucide-svelte';

	import Add from '$lib/mycomponents/add.svelte';
	import Edit from '$lib/mycomponents/edit.svelte';
	import Delete from '$lib/mycomponents/delete.svelte';
	import Display from '$lib/mycomponents/displayPosition.svelte';

	export let data;
	let positionData: Positions = data.data; // Variable to hold the fetched position data
	console.log("before",positionData)
	async function handleGetPosition(event: Event, positionId: number) {
		event.preventDefault();
		if (typeof positionId !== 'number') {
			return;
		}
		try {
			const response = await fetch(`http://localhost:3000/api/positions/hierarchy/${positionId}`, {
				method: 'GET'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch position data');
			}
			positionData = await response.json();
			console.log("after",positionData)
		} catch (error) {
			console.error('Error fetching position data:', error);
		}
	}
</script>

<div class="container mx-auto px-4">
	<h1
		class="sm:lg-text-xl m-5 scroll-m-20 text-4xl font-extrabold tracking-tight text-green-600 md:lg:text-3xl"
	>
		Perago Positions
	</h1>
	<div class="flex min-h-screen flex-col items-center justify-center gap-10">
		<div class="w-full md:w-1/4">
			<Card.Root>
				<Card.Header>
					<Card.Title>{positionData.name}</Card.Title>
					<Card.Description>{positionData.description}</Card.Description>
				</Card.Header>
			</Card.Root>
		</div>

		<div class="w-full md:w-3/4">
			<form on:submit={(event) => handleGetPosition(event, positionData.parent_id)}>
				<Button variant="link" type="submit"><ChevronLeft />Back</Button>
			</form>
			{#if positionData.children.length > 0}
				<Table.Root>
					<Table.Caption>A list of Positions under {positionData.name}.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">
								<div class="flex items-center gap-5">
									<p>Position</p>
									<Add
										positionId={positionData.id}
										onAction={() => handleGetPosition(new Event('click'), positionData.id)}
									/>
								</div>
							</Table.Head>
							<Table.Head class="text-right"></Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each positionData.children as position}
							<Table.Row>
								<Table.Cell class="font-medium">
									<div class="flex items-center justify-center">
										<p>
											<Display
												position={{
													id: position.id,
													name: position.name,
													description: position.description,
													parent_id: position.parent_id
												}}
											/>
										</p>
										<form on:submit={(event) => handleGetPosition(event, position.id)}>
											<Button variant="link" type="submit"><ChevronRight /></Button>
										</form>
									</div>
								</Table.Cell>
								<Table.Cell class="text-right">
									<div>
										<Edit
										position={{
											id: position.id,
											name: position.name,
											description: position.description,
											parent_id: position.parent_id
										}}
											onAction={() => handleGetPosition(new Event('click'), positionData.id)}
										/>
										<Delete
											PositionToDelete={{ id: position.id, name: position.name }}
											onAction={() => handleGetPosition(new Event('click'), positionData.id)}
										/>
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{:else}
				<Table.Root>
					<Table.Caption>No positions avalable under {positionData.name}.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">
								<div class="flex items-center gap-5">
									<p>Position</p>
									<Add
										positionId={positionData.id}
										onAction={() => handleGetPosition(new Event('click'), positionData.id)}
									/>
								</div>
							</Table.Head>
							<Table.Head class="text-right"></Table.Head>
						</Table.Row>
					</Table.Header>
				</Table.Root>
			{/if}
		</div>
	</div>
	<Toaster />
</div>
