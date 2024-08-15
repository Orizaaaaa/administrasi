
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

export const statusChange = (value: string) => {
    if (value === 'Diproses') {
        return ('bg-[#FF7F0A]')
    } else if (value === 'Menunggu') {
        return ('bg-primary')
    } else if (value === 'Selesai') {
        return ('bg-lime-700')
    }
}

export const statusText = (value: string) => {
    if (value === 'Belum Dibayar') {
        return ('text-[#FF7F0A]')
    } else if (value === 'Dibayar') {
        return ('text-[#FF7F0A]')
    } else if (value === 'Diproses') {
        return ('text-[#FF7F0A]')
    } else if (value === 'Dikirim') {
        return ('text-primary')
    } else if (value === 'Selesai') {
        return ('text-green-500')
    }
}

export function formatRupiah(amount: number | undefined): string {
    if (amount === undefined) {
        return 'Rp 0';
    }
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


export function capitalizeWords(str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}
