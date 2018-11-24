class Timestamp{
    constructor(){
        this._this = this,
        this.d = new Date(),
        this.e = {}
    }
}
//define new key value par in e object. Takes the query name as the first argument 
//and a function to be executed if certain type of query has been entered
Timestamp.prototype.define = function(type ,fn){
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

//defining new query string in the e of the new object and setting its value to the function
//which takes only one argumene, the option how we want to display the name of the day
date.define('day' ,function(opt){
    console.log(this)
    // let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // let obj = {
    //     fullDay : days[d-1],
    //     short   : days[d-1].substr(0,3)
    // }
    // return opt==='s' ? obj.short 
    //         : opt==="l" ? obj.fullDay
    //         : undefined
})

// date.define('date', function(){
//     let date = new Date();
//     dateObj.getDate()
//     if (!date) {
//         return
//     }
//     if (date===1) {
//         return {
//             date:`${date}st`
//         }
//     }else if (date===2) {
//         return {
//             date:`${date}nd`
//         }
//     }else if (date===3) {
//         return {
//             date:`${date}rd`
//         }
//     }else{
//         return {
//             date:`${date}th`
//         }
//     }
// })

console.log(date.get('day'))



// Timestamp.prototype.returnDay = 
// Timestamp.prototype.returnMonth = function(num){
//     let months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'August', 'Septemper', 'October', 'November', 'December'];
//     return {
//         fullMonth   : months[num],
//         short       : months[num].substr(0,3)
//     } 
// }
// Timestamp.prototype.adjustTime = function(time){
//     if (time < 10) {
//         return `0${time}`
//     }else{
//         return time
//     }
// }
// Timestamp.prototype.returnDate = function(date){
//     if (!date) {
//         return
//     }
//     if (date===1) {
//         return {
//             date:`${date}st`
//         }
//     }else if (date===2) {
//         return {
//             date:`${date}nd`
//         }
//     }else if (date===3) {
//         return {
//             date:`${date}rd`
//         }
//     }else{
//         return {
//             date:`${date}th`
//         }
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