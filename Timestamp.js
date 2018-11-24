class Timestamp{
    constructor(){
        this.d = new Date(),
        this.e = {}
    }
}

//define new key value par in e object. Takes the query name as the first argument 
//and a function to be executed if certain type of query has been entered
Timestamp.prototype.define = function(type,fn){
    if(this.e[type]){
       return  
    }
    this.e[type] = fn;
}
//takes the type of query /day,date, etc../ as the first argument, and option as second
//executes the function associated with query tipe and returns the values
Timestamp.prototype.get = function(type, options){
    if (this.e[type]) {
       return this.e[type](options)
    }
}
//instantiating new object
let date = new Timestamp();

//defining new query string in the e property of the new object and setting its value to the function
//which takes only one optional argument, the option how we want to display the name of the day
date.define('day',function(opt){
    let d = date.d.getUTCDay();
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let dayObj = {
        fullDay : days[d-1],
        short   : days[d-1].substr(0,3)
    }
    //if no option provided, the default is the short version
    if(!opt){
        return dayObj.short
    }else{
        return opt==='s' ? dayObj.short 
            : opt==="l" ? dayObj.fullDay
            : undefined
    }
})
//defining new query string in the e property of the new object and setting its value to the function
//which takes no arguments. Returning day in month folowed by the apropriate string depending on day
date.define('date', function(){
    let d = date.d.getDate();
    return  d===1 ? d+'st'
        :   d===2 ? d+'nd'
        :   d===3 ? d+'rd'
        :   d+'th'
})
//defining new query string in the e property of the new object and setting its value to the function
//which takes an option argument. Returning short or long version of month. If no option provided, 
//returning the short vesrion
date.define('month', function(opt){
    let m = date.d.getMonth();
    let months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'August', 'Septemper', 'October', 'November', 'December'];
    let mObj =  {
        fullMonth   : months[m],
        short       : months[m].substr(0,3)
    } 
    if(!opt){
        return  mObj.short
    }else{
        return  opt==='s' ? mObj.short
            :   opt==='l' ? mObj.fullMonth
            :   undefined
    }
})


module.exports = date

// Timestamp.prototype.adjustTime = function(time){
//     if (time < 10) {
//         return `0${time}`
//     }else{
//         return time
//     }
// }

// Timestamp.prototype.now = function(){
//     let dateObj         = new Date();
//     this.dayOfWeek      = this.returnDay(dateObj.getUTCDay());
//     this.dateInMonth    = this.returnDate(dateObj.getDate());
//     this.monthInYear    = this.returnMonth(dateObj.getMonth());
//     this.year           = dateObj.getFullYear();
//     this.hours          = this.adjustTime(dateObj.getHours());
//     this.minutes        = this.adjustTime(dateObj.getMinutes());
//     this.seconds        = this.adjustTime(dateObj.getSeconds());
//     this.e = {}
// }


// Timestamp.prototype.on = function(type, fn){
//     this.e[type] = this.e[type] || [];
//     this.e[type].push(fn) 
// }




// module.exports = Timestamp;