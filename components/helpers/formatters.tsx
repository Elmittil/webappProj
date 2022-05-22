export function zeroPad(number: number): string {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
};

export function formatDate(time): string {
    let dateObj = new Date(time);
    return `${zeroPad(dateObj.getHours())}:${zeroPad(dateObj.getMinutes())}`;
};
