<script>
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Contact | Nerdwerk</title>
	<meta name="description" content="Get in touch with the Nerdwerk team." />
</svelte:head>

<section
	class="page"
	in:fly={{ y: 80, duration: 500, delay: 100 }}
	out:fly={{ y: 80, duration: 200, delay: 0 }}
>
	<h1>Contact</h1>
	<div class="text-2xl *:mb-8">
		<p>Would love to hear from you — reach out and let us know what you're working on.</p>

		<ul class="contact-list">
			<li><strong>Email:</strong> <a href="mailto:hello@nerdwerk.com">hello@nerdwerk.com</a></li>
			<li>
				<strong>Social:</strong>
				<a href="https://bsky.app/profile/nerdwerk" target="_blank">Bsky</a>
				·
				<a href="https://www.linkedin.com/in/romankuba/" target="_blank">LinkedIn</a> ·
				<a href="https://github.com/nerdwerk" target="_blank">GitHub</a>
			</li>
		</ul>

		<p>
			If you're looking for feedback on your ideas, let's chat. I'm here to help you build something
			that works. Especially if you are building in Europe.
		</p>
	</div>
</section>
