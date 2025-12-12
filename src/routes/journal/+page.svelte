<script lang="ts">
	export let data;

	const { posts } = data;

	const formatDate = (iso: string) =>
		new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
</script>

<svelte:head>
	<title>Journal | Nerdwerk</title>
	<meta
		name="description"
		content="Thoughts, notes, and updates from the Nerdwerk journal."
	/>
</svelte:head>

<section class="page">
	<h1>Journal</h1>
	<p class="intro">
		Notes on the things we're building, the ideas we're exploring, and the lessons we learn
		along the way.
	</p>

	{#if posts.length === 0}
		<p>No journal entries yet — check back soon.</p>
	{:else}
		<ul class="post-list">
			{#each posts as post}
				<li>
					<a href={`/journal/${post.slug}`}>
						<h2>{post.title}</h2>
						<p class="summary">{post.summary}</p>
						<time datetime={post.date}>{formatDate(post.date)}</time>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.page {
		max-width: 60ch;
		margin: 4rem auto;
		padding: 0 1.5rem;
		line-height: 1.6;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 1.5rem;
	}

	.intro {
		margin-bottom: 3rem;
	}

	.post-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 2rem;
	}

	.post-list a {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: 1.5rem;
		border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
		border-radius: 1rem;
		transition: transform 120ms ease, box-shadow 120ms ease;
	}

	.post-list a:hover,
	.post-list a:focus-visible {
		transform: translateY(-4px);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.08);
	}

	h2 {
		margin: 0 0 0.75rem;
	}

	.summary {
		margin: 0 0 1rem;
		color: rgba(0, 0, 0, 0.65);
	}

	time {
		font-size: 0.9rem;
		color: rgba(0, 0, 0, 0.55);
	}
</style>
