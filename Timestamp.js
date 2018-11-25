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
Timestamp.prototype.format = function(opt){
    switch (opt) {
        case 't':
        return this.get('time', 's'); //returns hh:mm
            break;
    
        case 'tt':
        return this.get('time','l');  //returns hh:mm:ss
            break;

        case 'ttt':
        return this.get('time','L'); //returns hh:mm:ss:ms
            break;

        case 'd':
        return this.get('day','s');  //returns short version of day
            break;
        
        case 'dd':
        return this.get('day','l');  //returns long version of day
            break;
         
        case 'dt':
        return this.get('date');  //returns numeric day of month
            break;    

        case 'dtms':
        return `${this.get('date')} ${this.get('month', 's')}`;  //returns numeric day of month folowed by the month short version
            break;    

        case 'msdt':
        return `${this.get('month', 's')} ${this.get('date')}`;  //returns the month short version and numeric day of month
            break;        
            
        case 'dtml':
        return `${this.get('date')} ${this.get('month', 'l')}`;  //returns numeric day of month folowed by the month long version
            break; 

        case 'mldt':
        return `${this.get('month', 'l')} ${this.get('date')}`;  //returns the month long version and numeric day of month
            break;

        case 'mldty':
        return `${this.get('month', 'l')} ${this.get('date')} ${this.get('year', 'l')}`;  //returns the month long version and numeric day of month
            break;

        default: 'now'
        return `${this.get('day','l')} ${this.get('month', 'l')} ${this.get('date')} ${this.get('year', 'l')} ${this.get('time','l')}`;
            break;
    }
}
//instantiating new object
let date = new Timestamp();

//defining new query string in the e property of the new object and setting its value to the function
//which takes only one optional argument, the option how we want to display the name of the day
date.define('day',function(opt){
    let d = date.d.getUTCDay()+1;
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
        short       : months[m].substr(0,3),
        number      : m
    } 
    if(!opt){
        return  mObj.short
    }else{
        return  opt==='s' ? mObj.short
            :   opt==='l' ? mObj.fullMonth
            :   opt==='n' ? mObj.number
            :   undefined
    }
})
//returns short or long version of current year
date.define('year', function(opt){
    let y = date.d.getFullYear().toString();
    let yObj = {
        fullYear :  y,
        short   : y.substr(2)
    }
    if(!opt){
        return yObj.short
    }else{
        return  opt==='s' ? yObj.short
            :   opt==='l' ? yObj.fullYear
            :   undefined
    }
})
//returns current time
date.define('time', function(opt){
    let t = {
        h   :   date.d.getHours(),
        m   :   date.d.getMinutes(),
        s   :   date.d.getSeconds(),
        ms  :   date.d.getMilliseconds()
    }
    if (opt==="s") {
        return  t.h<12 ? `${adjustTime(t.h)}:${adjustTime(t.m)} AM` : `${adjustTime(t.h)}:${adjustTime(t.m)} PM`
    }else if(opt==="l"){
        return  t.h<12 ? `${adjustTime(t.h)}:${adjustTime(t.m)}:${adjustTime(t.s)} AM` : `${adjustTime(t.h)}:${adjustTime(t.m)}:${adjustTime(t.s)} PM`
    }else if(opt==="L"){
        return  t.h<12 ? `${adjustTime(t.h)}:${adjustTime(t.m)}:${adjustTime(t.s)}:${t.ms} AM` : `${adjustTime(t.h)}:${adjustTime(t.m)}:${adjustTime(t.s)}:${t.ms} PM`
    }else{
        return undefined
    }
    function adjustTime(t){
        if (t < 10) {
            return `0${t}`
        }else{
            return t
        }
    }
})
//exports date object
module.exports = date
