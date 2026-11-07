const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktop',{pin:value=>ipcRenderer.invoke('pin',value)});
