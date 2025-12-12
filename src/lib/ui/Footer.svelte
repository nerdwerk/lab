<script lang="ts">
	import Line from '$lib/ui/Line.svelte';
	import establishedImage from '$lib/assets/established.png';
</script>

<footer class="w-full">
	<Line />
	<div class="grid grid-cols-3">
		<div class="pt-8">
			<ul>
				<li>Socials</li>
				<li><a href="https://www.linkedin.com/in/romankuba/" target="_blank">LinkedIn</a></li>
				<li><a href="https://bsky.app/profile/nerdwerk" target="_blank">Bluesky</a></li>
			</ul>
		</div>
		<div class="text-center">
			<figure class="mb-8">
				<img src={establishedImage} alt="Established since 2025" class="m-auto" />
			</figure>
			<p>&copy; {new Date().getFullYear()} Nerdwerk. All rights reserved.</p>
		</div>
		<div class="pt-8 text-right">
			<ul>
				<li>Content</li>
				<li><a href="https://romankuba.substack.com/" target="_blank">Substack</a></li>
				<li><a href="https://github.com/nerdwerk" target="_blank">GitHub</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	@reference "../../app.css";

	footer a {
		@apply font-bold text-nerd-blue hover:underline;
	}
</style>
