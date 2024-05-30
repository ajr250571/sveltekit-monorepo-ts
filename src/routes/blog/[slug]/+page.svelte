<script>
	export let data;
</script>

<p class="text-3xl text-primary font-bold mb-4">{data.post?.title}</p>
<div>{@html data.post?.content}</div>
