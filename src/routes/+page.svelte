<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Plus, Edit, Trash, ChevronRight, ChevronLeft } from 'lucide-svelte';

	export let data;
	let positionData: Positions = data.data; // Variable to hold the fetched position data
	console.log(positionData);
	async function handleGetPosition(event: Event, positionId: number) {
		event.preventDefault();
    if(typeof(positionId) !== 'number'){
      return
    }
		try {
			const response = await fetch(`http://localhost:3000/api/positions/hierarchy/${positionId}`, {
				method: 'GET'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch position data');
			}
			positionData = await response.json();
			console.log(positionData);
		} catch (error) {
			console.error('Error fetching position data:', error);
		}
	}
</script>

<div class="container mx-auto px-4">

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
						<Table.Head class="w-[100px]">Position</Table.Head>
						<Table.Head class="text-right"></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					
						{#each positionData.children as position}
							<Table.Row>
								<Table.Cell class="font-medium">
									<div class="flex justify-center items-center">
                    <p>{position.name}</p>
									<form on:submit={(event) => handleGetPosition(event, position.id)}>
										<Button variant="link" type="submit"><ChevronRight /></Button>
									</form>
                  </div>
								</Table.Cell>
								<Table.Cell class="text-right">
									<div>
										<Button variant="outline"><Plus color="#4CAF50" /></Button>
										<Button variant="outline"><Edit color="#2196F3" /></Button>
										<Button variant="outline"><Trash color="#F44336" /></Button>
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
						<Table.Head class="w-[100px]">Position</Table.Head>
						<Table.Head class="text-right"></Table.Head>
					</Table.Row>
        </Table.Header>
      </Table.Root>
					{/if}
		</div>
	</div>
</div>
