class DateTimeInterval {
    year = 0;
    month = 0;
    day = 0;
    hour = 0;
    minute = 0;
    second = 0;

    constructor(data: DateTimeInterval) {
        Object.assign(this, data);
    }

    public static part(data: Partial<DateTimeInterval>) {
        const fullData = Object.assign({
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        }, data);

        return new DateTimeInterval(fullData);
    }
}

export default DateTimeInterval;
