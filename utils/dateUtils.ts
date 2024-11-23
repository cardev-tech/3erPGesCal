export function getOneMonthFromToday(): Date {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    return today;
}

export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatToExactDueDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const parts = date
        .toLocaleString('en-US', options)
        .replace(',', '')
        .split(' ');
    return `${parts[1]} ${parts[0]} ${parts[2]} ${parts[3]}`;
}
