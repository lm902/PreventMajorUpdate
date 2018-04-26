const cp = require('child_process')
const fs = require('fs')
const elevator = require('elevator')
const isElevated = require('is-elevated')

const files = ['C:\\$WINDOWS.~BT', 'C:\\$WINDOWS.~WS']

isElevated().then(elevated => {
  if (elevated) {
    console.log('stop')
    stop(['wuauserv'])
    console.log('takeown')
    takeown(files)
    console.log('grant')
    grant(files)
    console.log('rmdir')
    rmdir(files)
    console.log('touch')
    touch(files)
    console.log('hide')
    hide(files)
    console.log('revoke')
    revoke(files)
  } else {
    cp.spawnSync('node_modules\\elevator\\bin\\elevate-x64.exe', process.argv)
  }
})

function takeown(files) {
  for (let file of files) {
    try {
      cp.execSync(`takeown /F "${file}" /R /A`)
    }
    catch (e) { }
  }
}

function grant(files) {
  for (let file of files) {
    try {
      cp.execSync(`icacls "${file}" /T /grant Administrators:F`)
    }
    catch (e) { }
  }
}

function rmdir(dirs) {
  for (let dir of dirs) {
    try {
      fs.rmdirSync(dir)
    }
    catch (e) { }
  }
}

function touch(files) {
  for (let file of files) {
    try {
      let id = fs.openSync(file, 'a')
      fs.appendFileSync(id, null)
      fs.close(id)
    }
    catch (e) { }
  }
}

function hide(files) {
  for (let file of files) {
    try {
      cp.execSync(`attrib +h +s "${file}"`)
    }
    catch (e) { }
  }
}

function revoke(files) {
  for (let file of files) {
    try {
      cp.execSync(`icacls "${file}" /T /deny SYSTEM:F`)
    }
    catch (e) { }
  }
}

function stop(services) {
  for (let service of services) {
    try {
      cp.execSync(`net stop "${service}"`)
    }
    catch (e) { }
  }
}
