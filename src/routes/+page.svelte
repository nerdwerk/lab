<script>
	import Line from '$lib/ui/Line.svelte';
	import IconContent from '$lib/ui/IconContent.svelte';
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Welcome | Nerdwerk</title>
	<meta name="description" content="Nerdwerk is happening." />
</svelte:head>

<div in:fly={{ y: 80, duration: 500, delay: 100 }} out:fly={{ y: 80, duration: 200, delay: 0 }}>
	<IconContent icon="intro">
		<p>
			Hi, I’m <strong>Roman</strong>. And this is <strong>Nerdwerk</strong>. The thing I wanted to
			create for over a decade. This is a start, and will evolve over time. 🤞
		</p>
		<p>
			I'm merging product and tech understanding with leadership experience to build stuff that
			people actually want. <br />Read more <a href="/about">here</a>.
		</p>
		<p>
			For now, I'm focused on getting this whole thing off the ground. I'm continuing to create
			content and explore ideas and concepts under this new umbrella. On, and building my <span
				class="highlight">first SaaS product</span
			>.
			<br />More on that soon.
		</p>
	</IconContent>
</div>

<Line />

<IconContent icon="write">
	<p class="mb-8">
		I'm writing content about technology, product thinking, and the messy, fascinating parts of
		building things. Including using AI and all that cool jazz.
	</p>
	<p>
		Currently you find my writing over on <a href="https://romankuba.substack.com/" target="_blank"
			>Substack</a
		> but will move things over soonish. I also believe in us owning more of our content again.
	</p>
</IconContent>

<Line />

<IconContent icon="contact">
	<p>
		I'm on some socials. Find me actively on <a
			href="https://www.linkedin.com/in/romankuba/"
			target="_blank">LinkedIn</a
		>
		or check out the <a href="/contact">Contact</a> page, to get in touch. Especially if you are building
		stuff in Europe and want to say Hi.
	</p>
</IconContent>
