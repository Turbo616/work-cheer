(function(root){
const defaults={salary:8000,days:21.75,start:'09:00',end:'18:00',breakStart:'12:00',breakEnd:'13:00',weekdays:[1,2,3,4,5],overtime:0,weekendRate:40,monthBase:0};
const minute=t=>{if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))throw Error('时间格式不正确');return Number(t.slice(0,2))*60+Number(t.slice(3));};
function validate(s){
 for(const k of ['salary','days','overtime','weekendRate','monthBase'])if(!Number.isFinite(s[k])||s[k]<0||s[k]>1e9)throw Error('请填写有效的非负金额');
 if(s.days<1||s.days>31)throw Error('月计薪天数应为 1 至 31');
 const a=minute(s.start),b=minute(s.end),c=minute(s.breakStart),d=minute(s.breakEnd);
 if(b<=a)throw Error('下班时间必须晚于上班时间（暂不支持跨夜班）');
 if(d<c||c<a||d>b||b-a-(d-c)<=0)throw Error('休息时间应在工作时段内，且不能占满全天');
 if(!Array.isArray(s.weekdays)||!s.weekdays.length||s.weekdays.some(x=>!Number.isInteger(x)||x<0||x>6))throw Error('请至少选择一个工作日');
 return s;
}
function day(s,date,seconds){
 const a=minute(s.start)*60,b=minute(s.end)*60,c=minute(s.breakStart)*60,d=minute(s.breakEnd)*60;
 const scheduled=s.weekdays.includes(date.getDay());
 const total=b-a-(d-c),elapsed=Math.max(0,Math.min(seconds,b)-a)-Math.max(0,Math.min(seconds,d)-c);
 const worked=Math.max(0,elapsed),rate=scheduled?s.salary/s.days/(total/3600):s.weekendRate;
 const extra=scheduled?Math.max(0,seconds-b):0;
 const earned=scheduled?worked/3600*rate+extra/3600*s.overtime:worked/3600*rate;
 const active=seconds>=a&&seconds<b&&!(seconds>=c&&seconds<d);
 return {earned,rate:active?rate:scheduled&&seconds>=b?s.overtime:0,worked,total,progress:Math.min(1,worked/total),remaining:Math.max(0,b-seconds),status:seconds<a?'还没上班，先照顾好自己':seconds>=b?(scheduled&&s.overtime>0?'加班中，记得休息':'今天辛苦了，下班快乐'):seconds>=c&&seconds<d?'休息时间，补充一点能量':scheduled?'正在努力，也在慢慢积累':'周末加班中，辛苦啦'};
}
function calculate(s,now=new Date()){
 validate(s);const seconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds()+now.getMilliseconds()/1000;
 const today=day(s,now,seconds);let month=s.monthBase;
 // shortcut: past days are estimates under the current schedule, add actual differences using monthBase.
 for(let n=1;n<now.getDate();n++){const date=new Date(now.getFullYear(),now.getMonth(),n);if(s.weekdays.includes(date.getDay()))month+=day(s,date,minute(s.end)*60).earned;}
 return {...today,month:month+today.earned};
}
const api={defaults,validate,calculate};if(typeof module!=='undefined')module.exports=api;else root.WorkCheer=api;
})(typeof window==='undefined'?globalThis:window);
