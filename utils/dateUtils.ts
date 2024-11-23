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

