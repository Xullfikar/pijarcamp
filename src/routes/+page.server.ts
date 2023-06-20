import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async () => {
    return {
        produks: await prisma.produk.findMany()
    };
};

export const actions: Actions = {
    createProduk: async ({ request }) => {
        const { nama_produk, keterangan, harga, jumlah } = Object.fromEntries(await request.formData()) as Record<string, string>;

        const numberHarga = Number(harga);
        const numberJumlah = Number(jumlah);

        try {
            await prisma.produk.create({
                data: {
                    nama_produk,
                    keterangan,
                    harga: numberHarga,
                    jumlah: numberJumlah
                }
            })
        } catch (error) {
            console.log(error);
            return fail(500, { message: "Tidak dapat menambahkan Produk!" })
        }
    },

    deleteProduk: async ({ url }) => {
        const id = url.searchParams.get("id");

        if (!id) {
            return fail(400, { message: 'Invalid Request' });
        }

        try {
            await prisma.produk.delete({
                where: {
                    id: Number(id),
                }
            })
        } catch (error) {
            console.error(error);
            return fail(500, { message: 'Sesuatau masalah terjadi pada Server Kami!' });
        }

        return {
            status: 200
        };
    }
};