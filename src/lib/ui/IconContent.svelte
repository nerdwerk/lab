<script context="module" lang="ts">
	export type IconName = 'intro' | 'contact' | 'write';
</script>

<script lang="ts">
	export let icon: IconName = 'intro';

	const icons: Record<IconName, string[]> = {
		intro: [
			'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
		],
		contact: [
			'M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
		],
		write: [
			'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
		]
	};

	let iconPaths = icons[icon] ?? icons.intro;
</script>

<div class="grid grid-cols-4 text-4xl">
	<div class="col-span-4 mb-8 justify-self-center sm:col-span-1 sm:mb-0">
		<span class="flex size-16 items-center justify-center rounded-full bg-nerd-brown p-3 sm:mr-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="white"
				class="size-6"
			>
				{#each iconPaths as path}
					<path stroke-linecap="round" stroke-linejoin="round" d={path} />
				{/each}
			</svg>
		</span>
	</div>

	<div class="col-span-4 *:mb-8 sm:col-span-3">
		<slot />
	</div>
</div>
