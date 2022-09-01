import DateTimeInterval from './DateTimeInterval';

const now = new Date();

class DateTime {
    static zoneOffset = now.getTimezoneOffset() * 60;
    static dayLength = 60 * 60 * 24;

    jsDate: Date;

    constructor(jsDate: Date) {
        this.jsDate = jsDate;
    }

    static UTC(year: number, monthIndex: number, day: number, hour: number, minute: number, second: number) {
        let jsDate = new Date(year, monthIndex, day, hour, minute, second + DateTime.zoneOffset);

        return new DateTime(jsDate);
    }

    static now() {
        return new DateTime(new Date());
    }

    static today() {
        let now = DateTime.now();

        return now.add(new DateTimeInterval({
            year: 0,
            month: 0,
            day: 0,
            hour: -now.getHour(),
            minute: -now.getMinute(),
            second: -now.getSecond(),
        }));
    }

    static fromTimestamp(timestamp: number) {
        return new DateTime(new Date(timestamp * 1000));
    }

    static fromFormat(format: string, dateString: string) {
        let _dateString = dateString;
        let jsNow = new Date();
        let date = {
            year: jsNow.getFullYear(),
            month: jsNow.getMonth(),
            day: jsNow.getDate(),
            hour: jsNow.getHours(),
            minute: jsNow.getMinutes(),
            second: jsNow.getSeconds(),
        };

        /* TODO: add format mismatch exception */

        for (let index = 0, char; index < format.length; index++) {
            char = format.charAt(index);
            switch (char) {
                case 'Y':
                    let yearString = _dateString.substring(0, 4);
                    _dateString = _dateString.substring(4);
                    date.year = parseInt(yearString);
                    break;
                case 'm':
                    let monthString = _dateString.substring(0, 2);
                    _dateString = _dateString.substring(2);
                    date.month = parseInt(monthString) - 1;
                    break;
                case 'd':
                    let dayString = _dateString.substring(0, 2);
                    _dateString = _dateString.substring(2);
                    date.day = parseInt(dayString);
                    break;
                case 'H':
                    let hourString = _dateString.substring(0, 2);
                    _dateString = _dateString.substring(2);
                    date.hour = parseInt(hourString);
                    break;
                case 'i':
                    let minuteString = _dateString.substring(0, 2);
                    _dateString = _dateString.substring(2);
                    date.minute = parseInt(minuteString);
                    break;
                case 's':
                    let secString = _dateString.substring(0, 2);
                    _dateString = _dateString.substring(2);
                    date.second = parseInt(secString);
                    break;
                default:
                    _dateString = _dateString.substring(1);
            }
        }

        return DateTime.UTC(date.year, date.month, date.day, date.hour, date.minute, date.second);
    }

    static fromString(dateString: string) {
        let date = new DateTime(new Date());
        let match = (/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/gi).exec(dateString);
        let value = [];

        if (match) {
            for (let index = 1; index <= 6; index++) {
                value[index - 1] = parseInt(match[index]);
            }
            date = new DateTime(new Date(value[0], value[1] - 1, value[2], value[3], value[4], value[5]));
        }

        return date;
    }

    clone() {
        return new DateTime(new Date(this.jsDate.getTime()));
    }

    format(formatStr: string) {
        let dateString = "";
        for (let index = 0, char; index < formatStr.length; index++) {
            char = formatStr.charAt(index);
            if (char === "Y") {
                dateString += this.jsDate.getFullYear();
            } else if (char === "m") {
                dateString += (this.jsDate.getMonth() + 1).toString().padStart(2, "0");
            } else if (char === "n") {
                dateString += (this.jsDate.getMonth() + 1).toString();
            } else if (char === "d") {
                dateString += this.jsDate.getDate().toString().padStart(2, "0");
            } else if (char === "H") {
                dateString += this.jsDate.getHours().toString().padStart(2, "0");
            } else if (char === "i") {
                dateString += this.jsDate.getMinutes().toString().padStart(2, "0");
            } else if (char === "s") {
                dateString += this.jsDate.getSeconds().toString().padStart(2, "0");
            } else if (char === "D") {
                dateString += this.jsDate.toLocaleString('default', { weekday: 'short' });
            } else if (char === "w") {
                let dayCode = this.jsDate.toLocaleString('en', { weekday: 'short' });
                dateString += ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(dayCode).toString();
            } else if (char === "F") {
                let monthName = this.jsDate.toLocaleString('default', { month: 'long' });
                dateString += monthName.charAt(0).toUpperCase() + monthName.substr(1, monthName.length - 1);
            } else {
                dateString += char;
            }
        }

        return dateString;
    }

    toString() {
        return this.format("Y-m-d H:i:s");
    }

    getTimestamp() {
        return Math.round(this.jsDate.getTime() / 1000 - DateTime.zoneOffset);
    }

    add(interval: DateTimeInterval) {
        let jsDate = new Date(
            this.jsDate.getFullYear() + interval.year,
            this.jsDate.getMonth() + interval.month,
            this.jsDate.getDate() + interval.day,
            this.jsDate.getHours() + interval.hour,
            this.jsDate.getMinutes() + interval.minute,
            this.jsDate.getSeconds() + interval.second,
        );

        return new DateTime(jsDate);
    }

    addDay(amount: number) {
        return this.add(new DateTimeInterval({
            year: 0,
            month: 0, day: amount,
            hour: 0,
            minute: 0,
            second: 0,
        }));
    }

    setDay(day: number) {
        let jsDate = new Date(this.jsDate);
        jsDate.setDate(day);

        return new DateTime(jsDate);
    }

    getDay() {
        return this.jsDate.getDate();
    }

    setMonth(month: number) {
        let jsDate = new Date(this.jsDate);
        jsDate.setMonth(month - 1);

        return new DateTime(jsDate);
    }

    getMonth() {
        return this.jsDate.getMonth() + 1;
    }

    getHour() {
        return this.jsDate.getHours();
    }

    getMinute() {
        return this.jsDate.getMinutes();
    }

    getSecond() {
        return this.jsDate.getSeconds();
    }

    toMidnight() {
        let jsDate = new Date(this.jsDate);
        jsDate.setHours(0);
        jsDate.setMinutes(0);
        jsDate.setSeconds(0);

        return new DateTime(jsDate);
    }

    diffDays(dateTo: DateTime) {
        let fullDayFrom = Math.floor(this.getTimestamp() / DateTime.dayLength);
        let fullDayTo = Math.floor(dateTo.getTimestamp() / DateTime.dayLength);

        return fullDayTo - fullDayFrom;
    }

    isBefore(date: DateTime) {
        return this.jsDate.getTime() > date.jsDate.getTime();
    }
}

export default DateTime;
