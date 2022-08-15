/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord (empArray) {
    return {

        firstName: empArray [0],
        familyName: empArray [1],
        title: empArray [2],
        payPerHour: empArray [3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords (arr) {
    return arr.map(record => createEmployeeRecord(record))
}

let createTimeInEvent = function(dateStamp) {
   let [date, hour] = dateStamp.split(' ')
    
   this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
   })
    return this;
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    
    this.timeOutEvents.push({
     type: "TimeOut",
     hour: parseInt(hour, 10),
     date,
    })
     return this;
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (date) {
    let wage=hoursWorkedOnDate.call(this, date)*this.payPerHour;
    return parseFloat(wage.toString());
}

function allWagesFor (empRecord) {
    let allWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date));
    return allWages.reduce((total,wage) => total + wage);
}


function findEmployeeByFirstName (src, name) {
    return src.find(record => record.firstName === name);
}

let calculatePayroll = function(total){
    return total.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}