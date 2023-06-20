// @ts-nocheck
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load = async () => {
    return {
        produks: await prisma.produk.findMany()
    };
};

export const actions = {
    createProduk: async ({ request }: import('./$types').RequestEvent) => {
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

    deleteProduk: async ({ url }: import('./$types').RequestEvent) => {
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
};;null as any as PageServerLoad;;null as any as Actions;