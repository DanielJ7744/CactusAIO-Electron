import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { machineIdSync } from 'node-machine-id';
import _ from 'lodash';
import winston, { format } from 'winston';
import { ClientSocket } from './socket';

import BrowserWinHandler from './BrowserWinHandler';
const uuid = require('uuid').v4;
const settings = require('electron-settings');
const { autoUpdater } = require('electron-updater');

import { transformToSocketData, sendLoginRequest } from './helper';

if (process.env.NODE_ENV === 'development') {
  const devUserData = path.resolve(__dirname, '..', '..', 'build', 'userData');
  app.setPath('userData', devUserData);
}

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({
      filename: path.join(app.getPath('userData'), 'error.log'),
      level: 'error',
      timestamp: true,
    }),
    new winston.transports.File({
      filename: path.join(app.getPath('userData'), 'combined.log'),
      timestamp: true,
    }),
  ],
});

const isDev = process.env.NODE_ENV === 'development';

const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html');
const DEV_SERVER_URL = process.env.DEV_SERVER_URL; // eslint-disable-line prefer-destructuring

const _PROFILES_KEY = 'profiles';
const _PROFILE_GROUPS_KEY = 'profile_groups';
const _TASKS_KEY = 'tasks';
const _TASKS_GROUP_KEY = 'tasks_groups';
const _ACCOUNTS_KEY = 'accounts';
const _PROXIES_KEY = 'proxies';
const _PROXY_GROUPS_KEY = 'proxy_groups';
const _HARVESTER_KEY = 'harvester';
const _LICENSE_KEY = 'key';
const _SETTINGS_KEY = 'settings';
const _AUTH_KEY = 'auth';

function getTasks() {
  return settings.has(_TASKS_KEY) && !_.isEmpty(settings.get(_TASKS_KEY))
    ? settings.get(_TASKS_KEY)
    : [];
}

function saveTasks(tasks) {
  settings.set(_TASKS_KEY, tasks);
}

function getTaskGroups() {
  return settings.has(_TASKS_GROUP_KEY) &&
    !_.isEmpty(settings.get(_TASKS_GROUP_KEY))
    ? settings.get(_TASKS_GROUP_KEY)
    : [];
}

function saveTaskGroups(groups) {
  settings.set(_TASKS_GROUP_KEY, groups);
}

function getProfiles() {
  return settings.has(_PROFILES_KEY) && !_.isEmpty(settings.get(_PROFILES_KEY))
    ? settings.get(_PROFILES_KEY)
    : [];
}

function saveProfiles(profiles) {
  settings.set(_PROFILES_KEY, profiles);
}

function getProfileGroups() {
  return settings.has(_PROFILE_GROUPS_KEY) &&
    !_.isEmpty(settings.get(_PROFILE_GROUPS_KEY))
    ? settings.get(_PROFILE_GROUPS_KEY)
    : [];
}

function saveProfileGroups(groups) {
  settings.set(_PROFILE_GROUPS_KEY, groups);
}

function getProxies() {
  return settings.has(_PROXIES_KEY) && !_.isEmpty(settings.get(_PROXIES_KEY))
    ? settings.get(_PROXIES_KEY)
    : [];
}

function saveProxies(proxies) {
  settings.set(_PROXIES_KEY, proxies);
}

function getProxyGroups() {
  return settings.has(_PROXY_GROUPS_KEY) &&
    !_.isEmpty(settings.get(_PROXY_GROUPS_KEY))
    ? settings.get(_PROXY_GROUPS_KEY)
    : [];
}

function saveProxyGroups(groups) {
  settings.set(_PROXY_GROUPS_KEY, groups);
}

function getHarvesters() {
  return settings.has(_HARVESTER_KEY) &&
    !_.isEmpty(settings.get(_HARVESTER_KEY))
    ? settings.get(_HARVESTER_KEY)
    : [];
}

function saveHarvesters(harvesters) {
  settings.set(_HARVESTER_KEY, harvesters);
}

function getSettings() {
  return settings.has(_SETTINGS_KEY) ? settings.get(_SETTINGS_KEY) : {};
}

function saveSettings(setttingData) {
  settings.set(_SETTINGS_KEY, setttingData);
}

function getAuth() {
  return settings.has(_AUTH_KEY) ? settings.get(_AUTH_KEY) : {};
}

function setAuth(data) {
  return settings.set(_AUTH_KEY, data);
}

const winHandler = new BrowserWinHandler({
  // height: 500,
  minHeight: 500,
  // width: 830,
  width: 1050,
  height: 700,
  minWidth: 830,
  titleBarStyle: 'hidden',
  vibrancy: 'dark',
  frame: false,
  autoHideMenuBar: true,
  transparent: true,
});

console.log('Main window created.');

let mainWindowRef;

const checkForUpdate = async () => {
  try {
    if (!isDev) {
      const result = await autoUpdater.checkForUpdatesAndNotify();
      console.log(result);
    }
  } catch (err) {
    console.log(err);
  }
};

const socket = ClientSocket.getInstance();
socket.subscribe('connected', data => {
  console.log('socket', data);
});

winHandler.onCreated(async browserWindow => {
  console.log('winhandler onCreated');
  mainWindowRef = browserWindow;
  mainWindowRef.webContents.on('did-finish-load', async () => {
    console.log('version 0.1.1');
    console.log('ipcMain: checkForUpdatesAndNotify');
    await checkForUpdate();
  });

  if (isDev) mainWindowRef.loadURL(DEV_SERVER_URL);
  else mainWindowRef.loadFile(INDEX_PATH);

  /**
   * Task execution
   */
  /**
   * window actions
   */

  ipcMain.on('minimize', () => {
    winHandler.minimize();
  });
  ipcMain.on('maximize', arg => {
    winHandler.isMaximized() ? winHandler.restore() : winHandler.maximize();
  });
  ipcMain.on('close', () => {
    winHandler.close();
    workerWindow.close();
  });
  ipcMain.on('app_version', event => {
    mainWindowRef.webContents.send('app_version', {
      version: app.getVersion(),
    });
  });
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });
  ipcMain.on('check_update', async () => {
    await checkForUpdate();
  });

  /**
   Auth actions
  */
  ipcMain.on('auth', async (event, data) => {
    const { key } = data;
    console.log('auth', key);
    const hwid = machineIdSync();
    try {
      const json = await sendLoginRequest(key, hwid);
      console.log(json);
      event.returnValue == true;
    } catch (err) {
      event.returnValue == false;
    }
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('fetch_tasks', (event, group) => {
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('fetch_Task_groups', (event, group) => {
    mainWindowRef.webContents.send('task_groups', getTaskGroups());
  });

  ipcMain.on('fetch_profiles', (event, group) => {
    mainWindowRef.webContents.send('profiles', getProfiles());
  });

  ipcMain.on('fetch_profile_groups', (event, group) => {
    mainWindowRef.webContents.send('profile_groups', getProfileGroups());
  });

  ipcMain.on('create_task', (event, task) => {
    console.log('create_task', task);
    const currTasks = getTasks();
    currTasks.push({ ...task, id: uuid() });
    saveTasks(currTasks);
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('create_tasks', (event, tasks) => {
    console.log('create_task', tasks);
    const newTasks = tasks.map(task => {
      return { ...task, id: uuid() };
    });
    const currTasks = getTasks();
    saveTasks([...currTasks, ...newTasks]);
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('update_task', (event, task) => {
    console.log('update_task', task);
    const currTasks = getTasks();
    const newTasks = currTasks.map(v => {
      if (v.id === task.id) {
        return task;
      } else {
        return v;
      }
    });
    saveTasks(newTasks);
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('start_task', (event, data) => {
    const currTasks = getTasks();
    const task = currTasks.find(v => v.id === data.id);
    const profiles = getProfiles();
    const profile = profiles.find(v => v.id === task.profileId);
    const settings = getSettings();

    const proxyGroups = getProxyGroups();
    const proxies = getProxies();
    const proxyGroup = proxyGroups.find(v => v.id === task.proxyGroupId);
    proxyGroup.proxies = proxies.filter(v => v.groupId === proxyGroup.id);
    console.log('task', task);
    console.log('profile', profile);
    console.log('settings', settings);
    console.log('proxyGroup', proxyGroup);
    const socketData = transformToSocketData(
      task,
      profile,
      settings,
      proxyGroup,
    );
    socket.sendMessage('start-task', socketData);
  });

  ipcMain.on('stop_task', (event, data) => {
    const settings = getSettings();
    socket.sendMessage('stop-task', data);
  });
  ipcMain.on('delete_task', (event, task) => {
    console.log('delete_task', task.id);

    const currTasks = getTasks();
    const newTasks = currTasks.filter(v => v.id !== task.id);
    saveTasks(newTasks);
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('delete_tasks', (event, data) => {
    console.log('delete_tasks', data.tasks);

    const currTasks = getTasks();
    const newTasks = currTasks.filter(
      v => !data.tasks.map(v => v.id).includes(v.id),
    );
    saveTasks(newTasks);
    mainWindowRef.webContents.send('tasks', getTasks());
  });

  ipcMain.on('create_task_group', (event, group) => {
    const currGroups = getTaskGroups();
    currGroups.push({ ...group, id: uuid() });
    saveTaskGroups(currGroups);
    mainWindowRef.webContents.send('task_groups', getTaskGroups());
  });

  ipcMain.on('delete_task_group', (event, group) => {
    console.log('delete_task_group', group.id);
    const currGroups = getTaskGroups();
    const newGroups = currGroups.filter(v => v.id !== group.id);
    saveTaskGroups(newGroups);
    mainWindowRef.webContents.send('task_groups', getTaskGroups());
  });

  ipcMain.on('create_profile', (event, profile) => {
    console.log('create_profile', profile);
    if (profile.id == null) {
      profile.id = uuid();
    }
    const currProfiles = getProfiles();
    currProfiles.push(profile);
    saveProfiles(currProfiles);
    mainWindowRef.webContents.send('profiles', getProfiles());
  });

  ipcMain.on('update_profile', (event, profile) => {
    console.log('update_profile', profile);
    const currProfiles = getProfiles();
    const newProfiles = currProfiles.map(v => {
      if (v.id === profile.id) {
        return profile;
      } else {
        return v;
      }
    });
    saveProfiles(newProfiles);
    mainWindowRef.webContents.send('profiles', getProfiles());
  });

  ipcMain.on('delete_profile', (event, profile) => {
    console.log('delete_profile', profile.id);

    const currProfiles = getProfiles();
    const newProfiles = currProfiles.filter(v => v.id !== profile.id);
    saveProfiles(newProfiles);
    mainWindowRef.webContents.send('profiles', getProfiles());
  });

  ipcMain.on('delete_profiles', (event, data) => {
    console.log('delete_profiles', data.profiles);

    const currProfiles = getProfiles();
    const newProfiles = currProfiles.filter(
      v => !data.profiles.map(v => v.id).includes(v.id),
    );
    saveProfiles(newProfiles);
    mainWindowRef.webContents.send('profiles', getProfiles());
  });

  ipcMain.on('create_profile_group', (event, group) => {
    if (group.id == null) {
      group.id = uuid();
    }
    const currGroups = getProfileGroups();
    currGroups.push(group);
    saveProfileGroups(currGroups);
    mainWindowRef.webContents.send('profile_groups', getProfileGroups());
  });

  ipcMain.on('delete_profile_group', (event, group) => {
    console.log('delete_profile', group.id);
    const currGroups = getProfileGroups();
    const newGroups = currGroups.filter(v => v.id !== group.id);
    saveProfileGroups(newGroups);
    mainWindowRef.webContents.send('profile_groups', getProfileGroups());
  });

  ipcMain.on('fetch_proxies', (event, group) => {
    mainWindowRef.webContents.send('proxies', getProxies());
  });

  ipcMain.on('fetch_proxy_groups', (event, group) => {
    mainWindowRef.webContents.send('proxy_groups', getProxyGroups());
  });

  ipcMain.on('fetch_harvesters', (event, group) => {
    mainWindowRef.webContents.send('harvesters', getHarvesters());
  });

  ipcMain.on('create_proxies', (event, proxies) => {
    console.log('create_proxies', proxies);
    const newProxies = proxies.map(v => {
      return { ...v, id: uuid() };
    });
    const currProxies = getProxies();
    saveProxies([...currProxies, ...newProxies]);
    mainWindowRef.webContents.send('proxies', getProxies());
  });

  ipcMain.on('delete_proxy', (event, proxy) => {
    console.log('delete_proxy', proxy.id);

    const currProxies = getProxies();
    const newProxies = currProxies.filter(v => v.id !== proxy.id);
    saveProxies(newProxies);
    mainWindowRef.webContents.send('proxies', getProxies());
  });

  ipcMain.on('delete_proxies', (event, data) => {
    console.log('delete_proxies', data.proxies);

    const currProxies = getProxies();
    const newProxies = currProxies.filter(
      v => !data.proxies.map(v => v.id).includes(v.id),
    );
    saveProxies(newProxies);
    mainWindowRef.webContents.send('proxies', getProxies());
  });

  ipcMain.on('create_proxy_group', (event, group) => {
    console.log('create_proxy_group', group);

    if (group.id == null) {
      group.id = uuid();
    }
    const currGroups = getProxyGroups();
    currGroups.push(group);
    saveProxyGroups(currGroups);
    mainWindowRef.webContents.send('proxy_groups', getProxyGroups());
  });

  ipcMain.on('delete_proxy_group', (event, group) => {
    console.log('delete_proxy_group', group.id);
    const currGroups = getProxyGroups();
    const newGroups = currGroups.filter(v => v.id !== group.id);
    saveProxyGroups(newGroups);
    mainWindowRef.webContents.send('proxy_groups', getProxyGroups());
  });

  ipcMain.on('create_harvester', (event, harvester) => {
    console.log('create_harvester', harvester);

    const currHarvesters = getHarvesters();
    currHarvesters.push({ ...harvester, id: uuid() });
    saveHarvesters(currHarvesters);
    mainWindowRef.webContents.send('harvesters', getHarvesters());
  });

  ipcMain.on('delete_harvester', (event, harvester) => {
    console.log('delete_harvester', harvester.id);
    const currData = getHarvesters();
    const newData = currData.filter(v => v.id !== harvester.id);
    saveHarvesters(newData);
    mainWindowRef.webContents.send('harvesters', getHarvesters());
  });

  ipcMain.on('fetch_settings', (event, settings) => {
    const fetchedSettings = getSettings();
    mainWindowRef.webContents.send('settings', fetchedSettings);
  });

  ipcMain.on('save_setting', (event, settings) => {
    console.log('save_setting', settings);
    saveSettings(settings);
    const fetchedSettings = getSettings();
    mainWindowRef.webContents.send('settings', fetchedSettings);
  });
});

winHandler.onClosed(() => {
  // stopTasks()
});
// function createChildWindow() {
//   const childWindow = new BrowserWindow({
//     width: 1050,
//     height: 700,
//     maxHeight: 1080,
//     maxWidth: 1920,
//     minWidth: 1050,
//     minHeight: 700,
//     transparent: true,
//     titleBarStyle: 'hidden',
//     vibrancy: 'dark',
//     frame: false,
//     autoHideMenuBar: true,
//     resizable: false
//   })
//   childWindow.loadFile(DEV_SERVER_URL)
// }
// ipcMain.on('login',async () => {
//   console.log('dashboard page')
//   await createChildWindow()
//   if (winHandler) {
//     winHandler.close()
//     // winHandler = null;
//   }
// })

autoUpdater.on('update-available', info => {
  console.log('autoUpdater: update-available', info);
  mainWindowRef.webContents.send('update_available');
});
autoUpdater.on('download-progress', progress => {
  console.log(`Progress ${Math.floor(progress.percent)}`);
  mainWindowRef.webContents.send(
    'download_progress',
    Math.floor(progress.percent),
  );
});
autoUpdater.on('update-downloaded', info => {
  console.log('autoUpdater: update-downloaded', info);
  mainWindowRef.webContents.send('update_downloaded');
});
autoUpdater.on('error', error => {
  console.error(error);
});
export default winHandler;
