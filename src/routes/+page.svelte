<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ produks } = data);
</script>

<div class="grid">
	<div>
		<h2>Produk:</h2>
		{#each produks as produk}
			<article>
				<header>{produk.nama_produk}</header>
				<p><strong>Keterangan: <br /></strong>{produk.keterangan}</p>
				<p><strong>Harga: </strong>{produk.harga}</p>
				<p><strong>Jumlah: </strong>{produk.jumlah}</p>
				<form action="?/deleteProduk&id={produk.id}" method="POST">
					<button type="submit" class="outline secondary">Delete Produk</button>
				</form>
				<a href="/{produk.id}" role="button" class="outline constrast" style="width: 100%;"
					>Edit Produk</a
				>
			</article>
		{/each}
	</div>
	<form action="?/createProduk" method="POST">
		<h3>Produk Baru</h3>
		<label for="title"> Nama produk </label>
		<input type="text" id="title" name="nama_produk" />
		<label for="content"> Keterangan </label>
		<textarea id="content" name="keterangan" rows={5} />
		<label for="harga"> Harga </label>
		<input type="number" id="harga" name="harga" />
		<label for="jumlah"> Jumlah </label>
		<input type="number" id="jumlah" name="jumlah" />
		<button type="submit">Add Produk</button>
	</form>
</div>
