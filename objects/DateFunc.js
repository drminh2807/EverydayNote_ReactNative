const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const shortMonths = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

class DateFunc {

}
export function GetNameMonths(date) {
  return months[date.getMonth()]
}
export function GetTimeStringFromDate(date){
    ampm= 'AM'
    h= date.getHours()
    m= date.getMinutes()
    if(h>= 12){
        if(h>12) h -= 12;
        ampm= 'PM';
    }
    if(m<10) m= '0'+m;
    return h + ':' + m + ' ' + ampm;
}
