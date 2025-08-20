// Preload script for secure communication between main and renderer processes
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Menu actions
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-toggle-magnifier', callback);
    ipcRenderer.on('menu-zoom-in', callback);
    ipcRenderer.on('menu-zoom-out', callback);
    ipcRenderer.on('menu-vertical-split', callback);
    ipcRenderer.on('menu-horizontal-split', callback);
    ipcRenderer.on('menu-reset', callback);
    ipcRenderer.on('menu-new-focus', callback);
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  
  // App info
  getVersion: () => {
    return process.env.npm_package_version || '1.0.0';
  },
  
  // Platform info
  getPlatform: () => {
    return process.platform;
  }
});