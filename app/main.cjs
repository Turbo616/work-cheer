const {app,BrowserWindow,ipcMain}=require('electron');
const path=require('node:path');
let win;
function create(){
 win=new BrowserWindow({width:490,height:740,minWidth:390,minHeight:620,title:'上班鼓励器',backgroundColor:'#f5f7fb',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
 win.loadFile(path.join(__dirname,'index.html'));
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',e=>e.preventDefault());
 win.webContents.session.setPermissionRequestHandler((w,p,cb)=>cb(false));
}
ipcMain.handle('pin',(e,value)=>{if(e.sender===win.webContents&&typeof value==='boolean')win.setAlwaysOnTop(value);});
app.whenReady().then(create);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)create();});
