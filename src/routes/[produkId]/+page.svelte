<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ produk } = data);
</script>

<form action="?/updateProduk" method="POST">
	<h3>Editing : {produk.nama_produk}</h3>
	<label for="title"> Nama produk </label>
	<input type="text" id="title" name="nama_produk" value={produk.nama_produk} />
	<label for="content"> Keterangan </label>
	<textarea id="content" name="keterangan" rows={5} value={produk.keterangan} />
	<label for="harga"> Harga </label>
	<input type="number" id="harga" name="harga" value={produk.harga} />
	<label for="jumlah"> Jumlah </label>
	<input type="number" id="jumlah" name="jumlah" value={produk.jumlah} />
	<button type="submit">Update Produk</button>
</form>
