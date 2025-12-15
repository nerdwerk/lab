<script>
	import { onMount } from 'svelte';

	// Canvas output size (default social preview 1200x630)
	const OUTPUT_WIDTH = 1200;
	const OUTPUT_HEIGHT = 630;

	// Define gradients here. Each gradient has a name, angle (deg) and an array of colors.
	// You can edit or extend this array to add more presets.
	const gradients = [
		{ name: 'Sunset', angle: 45, colors: ['#ff7e5f', '#feb47b'] },
		{ name: 'Sea', angle: 120, colors: ['#2BC0E4', '#EAECC6'] },
		{ name: 'Purple Dream', angle: 200, colors: ['#a18cd1', '#fbc2eb'] },
		{ name: 'Blue Ocean', angle: 180, colors: ['#2193b0', '#6dd5ed'] },
		{ name: 'Green Sea', angle: 90, colors: ['#43cea2', '#185a9d'] }
	];

	let selectedIndex = 0;
	let text = 'Your headline here';
	let previewScale = 0.4; // preview scale relative to output
	let previewWidth = Math.round(OUTPUT_WIDTH * previewScale);
	let previewHeight = Math.round(OUTPUT_HEIGHT * previewScale);

	let canvasEl;
	let offscreenCanvas;
	let previewTextEl;

	onMount(() => {
		// Create an offscreen canvas used for exports
		offscreenCanvas = document.createElement('canvas');
		offscreenCanvas.width = OUTPUT_WIDTH;
		offscreenCanvas.height = OUTPUT_HEIGHT;
	});

	function degToRad(deg) {
		return (deg * Math.PI) / 180;
	}

	function createLinearGradientFor(ctx, width, height, g) {
		// CSS angles: 0deg = top, 90deg = right (clockwise).
		// Canvas trig: 0 rad = right, positive = counter-clockwise.
		// Convert CSS angle to canvas angle: canvas = (90deg - cssAngle).
		const angle = degToRad((90 - (g.angle % 360) + 360) % 360);
		// direction vector
		const dx = Math.cos(angle);
		const dy = Math.sin(angle);
		// center points
		const cx = width / 2;
		const cy = height / 2;
		// length scaled to cover the canvas diagonal
		const l = Math.sqrt(width * width + height * height) / 2;
		const x0 = cx - dx * l;
		const y0 = cy - dy * l;
		const x1 = cx + dx * l;
		const y1 = cy + dy * l;

		const grad = ctx.createLinearGradient(x0, y0, x1, y1);
		const stops = g.colors.length;
		for (let i = 0; i < stops; i++) {
			grad.addColorStop(i / (stops - 1 || 1), g.colors[i]);
		}
		return grad;
	}

	function drawToCanvas(width = OUTPUT_WIDTH, height = OUTPUT_HEIGHT) {
		const g = gradients[selectedIndex];
		const ctx = offscreenCanvas.getContext('2d');
		offscreenCanvas.width = width;
		offscreenCanvas.height = height;

		// fill gradient background
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = createLinearGradientFor(ctx, width, height, g);
		ctx.fillRect(0, 0, width, height);

		// draw optional subtle vignette or overlay for readability
		ctx.fillStyle = 'rgba(0,0,0,0.08)';
		ctx.fillRect(0, height - height * 0.12, width, height * 0.12);

		// draw text
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		// starting font size proportional to height
		let fontSize = Math.round(height / 8);
		ctx.fillStyle = 'white';
		ctx.shadowColor = 'rgba(0,0,0,0.35)';
		ctx.shadowBlur = Math.max(4, Math.round(height * 0.01));
		ctx.shadowOffsetY = Math.round(height * 0.008);

		// For now, do not support multi-line. Collapse newlines to spaces.
		const singleLine = text.replace(/\s*\n\s*/g, ' ').trim();
		const lines = singleLine ? [singleLine] : [];
		// reduce font size until the longest line fits within 90% width
		const maxWidth = width * 0.9;
		function fits(size) {
			let family = 'Inter, Roboto, sans-serif';
			try {
				if (previewTextEl) {
					const cs = getComputedStyle(previewTextEl);
					if (cs && cs.fontFamily) family = cs.fontFamily;
				}
			} catch (e) {
				// ignore
			}
			ctx.font = `bold ${size}px ${family}`;
			return lines.every((line) => ctx.measureText(line).width <= maxWidth);
		}

		while (fontSize > 10 && !fits(fontSize)) {
			fontSize -= 2;
		}

		// use the same font-family as the preview when possible
		try {
			let family = 'Inter, Roboto, sans-serif';
			if (previewTextEl) {
				const cs = getComputedStyle(previewTextEl);
				if (cs && cs.fontFamily) family = cs.fontFamily;
			}
			ctx.font = `bold ${fontSize}px ${family}`;
		} catch (e) {
			ctx.font = `bold ${fontSize}px Inter, Roboto, sans-serif`;
		}
		// compute vertical start so text is centered
		const lineHeight = fontSize * 1.05;
		const totalHeight = lineHeight * lines.length;
		let startY = height / 2 - totalHeight / 2 + lineHeight / 2;

		for (let i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
		}

		return offscreenCanvas;
	}

	async function downloadImage() {
		// Ensure fonts are loaded so canvas text matches the preview
		if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
			try {
				await document.fonts.ready;
			} catch (e) {
				// ignore
			}
		}

		const c = drawToCanvas();
		c.toBlob((blob) => {
			const a = document.createElement('a');
			const url = URL.createObjectURL(blob);
			a.href = url;
			a.download = `nerdwerk-lab-${gradients[selectedIndex].name.replace(/\s+/g, '-').toLowerCase()}.png`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		}, 'image/png');
	}

	// helper to generate CSS gradient for preview from gradient object
	function cssGradient(g) {
		return `linear-gradient(${g.angle}deg, ${g.colors.join(', ')})`;
	}
</script>

<div class="mx-auto max-w-4xl p-6">
	<h2 class="mb-4 text-2xl font-bold">Gradient image generator</h2>

	<div class="controls mb-4 flex flex-col items-start sm:flex-row sm:items-end">
		<div class="mb-2 flex-1 sm:mb-0">
			<label class="mb-1 block text-sm font-medium">Gradient</label>
			<select bind:value={selectedIndex} class="w-full rounded border p-2">
				{#each gradients as g, i}
					<option value={i}>{g.name}</option>
				{/each}
			</select>
		</div>

		<div class="ml-0 w-full flex-1 sm:ml-4">
			<label class="mb-1 block text-sm font-medium">Text</label>
			<input bind:value={text} class="w-full rounded border p-2" />
		</div>

		<div class="mt-3 ml-0 sm:mt-0 sm:ml-4">
			<button on:click={downloadImage} class="rounded bg-black px-4 py-2 text-white"
				>Download</button
			>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-4">
		<div>
			<p class="mb-2 text-sm text-gray-600">Preview</p>
			<div
				class="preview w-full"
				style="width: {previewWidth}px; height: {previewHeight}px; background: {cssGradient(
					gradients[selectedIndex]
				)};"
			>
				<div class="overlay">
					<div
						bind:this={previewTextEl}
						style="color:white; font-weight:700; font-size: {Math.round(previewHeight / 6)}px; text-shadow: 0 6px 12px rgba(0,0,0,0.35); white-space: normal;"
					>
						{text}
					</div>
				</div>
			</div>
		</div>

		<div>
			<p class="mb-2 text-sm text-gray-600">Options</p>
			<div class="rounded border p-3">
				<div class="mb-2 text-sm"><strong>Size:</strong> {OUTPUT_WIDTH} × {OUTPUT_HEIGHT} (px)</div>
				<div class="mb-2 text-sm"><strong>Selected:</strong> {gradients[selectedIndex].name}</div>
				<div class="text-sm">
					Tip: Line breaks are disabled for exports; use a single line of text.
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.preview {
		border-radius: 8px;
		overflow: hidden;
		position: relative;
		display: block;
	}

	.preview .overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		pointer-events: none;
	}

	.controls {
		gap: 0.5rem;
	}
</style>
