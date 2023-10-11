const oldLog = console.log

// const options = {
//     era: 'short',
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     weekday: 'short',
//     timezone: 'UTC',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
//   };

console.log = function (...args) {
    oldLog(new Date(), ...args)
}

console.forUser = function () {
    oldLog()
}