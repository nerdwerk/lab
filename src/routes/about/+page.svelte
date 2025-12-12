<script>
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>About | Nerdwerk</title>
	<meta name="description" content="Learn more about Nerdwerk and the team behind the work." />
</svelte:head>

<section
	class="page"
	in:fly={{ y: 80, duration: 500, delay: 100 }}
	out:fly={{ y: 80, duration: 200, delay: 0 }}
>
	<h1>About Nerdwerk</h1>
	<div class="text-2xl *:mb-8">
		<p>
			For now Nerdwerk is just me, Roman Kuba. My background blends deep technical understanding,
			practical engineering leadership, and a strong sense for user experience. I use modern AI
			tools as accelerators, not replacements—helping teams think better, build faster, and make
			smarter decisions.
		</p>
		<p>
			Where Nerdwerk will grow from here, will become clearer over time. There's many ideas, and I’m
			all excited for them.
		</p>
		<!-- <p>
			Nerdwerk will grow into a service company built around an embedded consultingapproach. For
			now, I’m focusing on launching my first SaaS product, applying the same principles I bring to
			consulting: clarity, usability, and thoughtful engineering.
		</p> -->
		<p>
			What I can share, I belive in a strong European tech ecosystem and I'm here to support it. If
			you are looking for feedback and input, don't hesitate to <a href="/contact">reach out</a>.
		</p>
		<p>
			This space will grow over time with more details about our Nerdwerk. For now, thanks for being
			even on this page. When you read this, and we meet, first drink is on me.
		</p>

		<h2>Tech</h2>

		<p>
			If you care about tech, this page is built with Sveltekit, Tailwindcss and hosted on fly.io.
			All of them are amazing tools that I highly recommend.
		</p>
	</div>
</section>
