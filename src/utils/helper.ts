
export function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // UTCMonth is zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

export function formatCatrgory(text: string, maxLength: number = 34): string {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

export function formatTitle(text: string, maxLength: number = 20): string {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}
export const changeTypeAccount = (type: number): string => {
    switch (type) {
        case 1:
            return 'Aset';
        case 2:
            return 'Kewajiban';
        case 3:
            return 'Ekuitas';
        case 4:
            return 'Pendapatan';
        case 5:
            return 'Biaya Penjualan';
        case 6:
            return 'Pengeluaran';
        case 7:
            return 'Pendapatan lain lain';
        case 8:
            return 'Biaya lain lain';
        default:
            return 'Tipe tidak dikenal'; // Mengembalikan nilai default jika tipe tidak ditemukan
    }
};


export function formatRupiah(amount: number | undefined): string {
    if (amount === undefined) {
        return 'Rp 0';
    }
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


export function capitalizeWords(str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
