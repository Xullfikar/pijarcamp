// @ts-nocheck
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
    const getProduk = async () => {
        const produk = await prisma.produk.findUnique({
            where: {
                id: Number(params.produkId)
            }
        })
        if (!produk) {
            throw error(404, "Produk Not Found");
        }
        return produk
    }

    return {
        produk: getProduk()
    }
};

export const actions = {
    updateProduk: async ({ request, params }: import('./$types').RequestEvent) => {
        const { nama_produk, keterangan, harga, jumlah } = Object.fromEntries(await request.formData()) as Record<string, string>;

        const numberHarga = Number(harga);
        const numberJumlah = Number(jumlah);

        try {
            await prisma.produk.update({
                where: {
                    id: Number(params.produkId)
                },
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
        throw redirect(302, "/");
    },
};;null as any as Actions;