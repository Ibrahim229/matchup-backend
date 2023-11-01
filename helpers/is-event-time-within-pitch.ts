import moment from 'moment';

// A function that checks if a given date is within a given range
function isWithinRange(date: Date, rangeStart: Date, rangeEnd: Date): boolean {
	// If the range is not wrapped around midnight, then the date must be between the range start and end
	if (rangeStart < rangeEnd) {
		return date >= rangeStart && date <= rangeEnd;
	}
	// If the range is wrapped around midnight, then the date must be either before the range end or after the range start
	else {
		return date <= rangeEnd || date >= rangeStart;
	}
}

// A function that takes open and close date and start and end date as parameters and returns true if start and end date are within open and close date
export function isEventTimeWithinRange(startDate: Date, endDate: Date, openDate: Date, closeDate: Date): boolean {
	// Check if both start and end date are within the open and close date range

	// Convert the dates to local time strings
	const start = moment(startDate.toLocaleTimeString(), 'h:mm A').toDate();
	const end = moment(endDate.toLocaleTimeString(), 'h:mm A').toDate();
	const open = moment(openDate.toLocaleTimeString(), 'h:mm A').toDate();
	const close = moment(closeDate.toLocaleTimeString(), 'h:mm A').toDate();

	return isWithinRange(start, open, close) && isWithinRange(end, open, close);
}
