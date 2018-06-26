import { app, BrowserWindow, ipcMain } from 'electron'
// import installExtension , { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
/*import * as url from 'url'
import * as path from 'path'*/
import * as log from 'electron-log'
declare var __dirname: string
let mainWindow: BrowserWindow
ipcMain.once('close', () => {
  mainWindow.close()
})
ipcMain.on('hide', () => {
  mainWindow.minimize()
})
app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 720, resizable: false,
    fullscreen: false })
  mainWindow.loadURL(`file:///${__dirname}/index.html`)
  mainWindow.webContents.toggleDevTools()
  setupLogger()
  mainWindow.once('ready-to-show', () => mainWindow.show())
 // const fileName = 'file:///' + __dirname + '/index.html'
 // mainWindow.loadURL(fileName)
  /* mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))*/

  /*installExtension(REACT_DEVELOPER_TOOLS).then((name => console.log(`Added Extension:  ${name}`))).catch((err) => console.log('An error occurred: ', err))
  installExtension(REDUX_DEVTOOLS).then((name => console.log(`Added Extension:  ${name}`))).catch((err) => console.log('An error occurred: ', err))
  */

})
app.on('window-all-closed', () => {
  app.quit()
})

function setupLogger() {
  // Same as for console transport
  log.transports.file.level = 'info'
  log.transports.file.format = '{h}:{i}:{s}:{ms} {text}'

  // Set approximate maximum log size in bytes. When it exceeds,
  // the archived log will be saved as the log.old.log file
  log.transports.file.maxSize = 5 * 1024 * 1024

  // Write to this file, must be set before first logging
  log.transports.file.file = __dirname + '/../log.log'
  log.transports.file.streamConfig = { flags: 'a' }
  // fs.createWriteStream options, must be set before first logging
  /*
  fs.exists(__dirname + '../log.log', (value) => {
    console.log('EXISTS', value)
    if (value) {
      log.transports.file.streamConfig = { flags: 'a' }
    } else {
      log.transports.file.streamConfig = { flags: 'w' }
    }
  })
*/
  // set existed file stream
  // log.transports.file.file = 'log.log'
  // log.transports.file.stream = fs.createWriteStream('log.log')
}

/*app.on('before-quit', () => {
  mainWindow.removeAllListeners('close')
  mainWindow.close()
})
*/
// 5354580012000022800000002400000001201B009D8F696140000000000F424068400000000000000C811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B
// 5354580012000022800000002400000001201B009D8F696140000000000F424068400000000000000C73210223254FE57496571E79D92C69F3A9E928E5B2E045A237752166801336084F5B38811456D4D9A220C51B290E00A15B5019D589C11C5D64831482C0E674B6450F7AD33B24AC89F127687843011B