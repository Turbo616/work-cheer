const {test}=require('node:test');const assert=require('node:assert/strict');const {defaults:d,calculate:c,validate:v}=require('../app/core');
const at=(day,h,m=0)=>new Date(2026,10,day,h,m);
test('工作日、休息和下班收入准确',()=>{const s={...d,salary:8000,days:20};assert.equal(c(s,at(2,8)).earned,0);assert.equal(c(s,at(2,12)).earned,150);assert.equal(c(s,at(2,12,30)).earned,150);assert.equal(c(s,at(2,18)).earned,400);assert.equal(c(s,at(2,20)).earned,400);assert.equal(c(s,at(2,18)).progress,1);});
test('加班与周末计算',()=>{assert.equal(c({...d,salary:8000,days:20,overtime:30},at(2,20)).earned,460);assert.equal(c(d,at(7,18)).earned,320);assert.equal(c(d,at(7,20)).earned,320);});
test('月初与本月估算',()=>{assert.equal(c(d,at(1,8)).month,0);const s={...d,salary:8000,days:20,monthBase:20};assert.equal(c(s,at(3,18)).month,820);});
test('拒绝无效设置',()=>{for(const s of [{days:0},{start:'22:00',end:'06:00'},{salary:NaN},{weekdays:[]},{breakEnd:'20:00'}])assert.throws(()=>v({...d,...s}));});
