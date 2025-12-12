<div class="line-curve my-16"></div>

<style>
	.line-curve {
		display: block;
		background-image: url('$lib/assets/line-curve.svg');
		background-repeat: repeat-x;
		background-size: auto 100%;
		width: 100%;
		height: 8px;
		cursor: wait;

		&:hover {
			animation: slide 12s linear infinite;
		}
	}

	@keyframes slide {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 100% 0;
		}
	}
</style>
