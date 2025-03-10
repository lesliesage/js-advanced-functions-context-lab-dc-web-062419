function createEmployeeRecord(empArray){
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployees(empsArray){
    const newArray = empsArray.map(createEmployeeRecord)
    return newArray
}

function createTimeInEvent(startPunch){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(startPunch.split(" ")[1]),
        date: startPunch.split(" ")[0]
    })
    return this
}

function createTimeOutEvent(endPunch){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(endPunch.split(" ")[1]),
        date: endPunch.split(" ")[0]
    })
    return this
}

function hoursWorkedOnDate(date){
    const foundStart = this.timeInEvents.find(e => {return e.date === date})
    const foundEnd = this.timeOutEvents.find(e => {return e.date === date})
    return (foundEnd.hour - foundStart.hour)/100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function createEmployeeRecords(empsArray){
    return empsArray.map(createEmployeeRecord)
}

function findEmployeebyFirstName(srcArray, firstName){
    return srcArray.find(empRec => {return firstName === empRec.firstName})
}

function calculatePayroll(empsArray){
    return empsArray.reduce((wagesTotal, empRec) => {
        return wagesTotal + allWagesFor.call(empRec)
    }, 0)
}

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