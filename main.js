/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

// Receive string of dates one after each other
function outputDate(dates) {

    /** HELPER FUNCTIONS */
    const parseDate = date => {
        const parts = date.split('.');
        return new Date(+parts[2], parts[1] - 1, +parts[0]);
    };
    const getDaysInLastFullMonth = day => {
        const d = parseDate(day);
        const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 0);
        return lastDayOfMonth.getDate();
    }


    const startDate = parseDate(dates[0]);
    const endDate = parseDate(dates[1]);
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    let diffDays = Math.ceil(diffTime / ONE_DAY);
    let diffYears = endDate.getFullYear() - startDate.getFullYear();
    let diffMonths= endDate.getMonth() - startDate.getMonth();

    // Recalculate days & months
    if (endDate.getDate() - startDate.getDate() < 0) {
        const daysInLastFullMonth = getDaysInLastFullMonth(dates[0]);
        if (daysInLastFullMonth < startDate.getDate()) {
            diffDays = daysInLastFullMonth + diffDays + (startDate.getDate() - daysInLastFullMonth);
        }
        diffMonths--;
    }

    // Recalculate years & months in case of negative months
    if (diffMonths < 0) {
        diffMonths = 12 + diffMonths;
        diffYears--;
    }
    
    // If it's just one month of 30 days, don't write month
    if (diffMonths === 1 && diffDays === 30) diffMonths = 0;

    let years = diffYears > 0 ? `${diffYears} years, ` : '';
    let months = diffMonths > 0 ? `${diffMonths} months, ` : '';
    let days = `total ${diffDays} days`;
    if (diffMonths === 1) months = `${diffMonths} month, `;
    if (diffYears === 1) years = `${diffYears} year, `;
    if (diffDays === 1) days = `total ${diffDays} day`;
    dates = years + months + days;
    return dates;
}