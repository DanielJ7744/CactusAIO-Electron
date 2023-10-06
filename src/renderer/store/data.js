import _ from 'lodash'
import { ipcRenderer } from 'electron'
export const state = () => ({
  profiles: [],
  accounts: [],
  tasks: [],
  quickTasks: [],
  taskGroups: [],
  profileGroups: [],
  proxies: [],
  proxyGroups: [],
  harvesters: [],
  groups: [],
  settings: {},
  isAuthed: false,
  appVersion: '0.0.0'
})

export const mutations = {
  setAppVersion (state, payload) {
    console.log('state setAppVersion', payload)
    state.appVersion = payload
  },
  setIsAuthed (state, payload) {
    console.log('state setIsAuthed', payload)
    state.isAuthed = payload
  },
  setProfiles (state, payload) {
    state.profiles = payload
  },
  addProfile (state, payload) {
    state.profiles.push(payload)
  },
  updateProfile (state, payload) {
    const { index, profile } = payload
    state.profiles[index] = profile
    ipcRenderer.send('update profiles', state.profiles)
  },
  setAccounts (state, payload) {
    state.accounts = payload
  },
  deleteProfile (state, payload) {
    state.profiles.splice(payload, 1)
  },
  setTasks (state, payload) {
    state.tasks = payload
  },
  setQuickTasks (state, payload) {
    state.quickTasks = payload
  },
  setTaskGroups (state, payload) {
    state.taskGroups = payload
  },
  setProfileGroups (state, payload) {
    state.profileGroups = payload
  },
  setProxies (state, payload) {
    state.proxies = payload
  },
  setProxyGroups (state, payload) {
    state.proxyGroups = payload
  },
  setHarvesters (state, payload) {
    state.harvesters = payload
  },
  addProxy (state, payload) {
    state.proxies.push(payload)
    ipcRenderer.send('save proxies', state.proxies)
  },

  deleteProxy (state, payload) {
    const { name } = payload
    state.proxies = state.proxies.filter(v => v.name !== name)
    ipcRenderer.send('save proxies', state.proxies)
  },
  changeProxyName (state, payload) {
    const { index, oldName, newName } = payload
    state.proxies = _.map(state.proxies, v => {
      if (v.name === oldName) {
        return { name: newName, values: v.values }
      } else {
        return v
      }
    })
    // ipcRenderer.send('save proxies', state.proxies)
  },
  setGroups (state, payload) {
    state.groups = payload
  },
  setSettings (state, payload) {
    state.settings = payload
  },
  updateTaskStatus (state, payload) {
    const { id, status } = payload
    state.tasks = _.map(state.tasks, v => {
      if (id === v.id) {
        return { ...v, status, isRunning: true, finishStatus: null }
      } else {
        return v
      }
    })
  },
  updateFinishStatus (state, payload) {
    const { id, data } = payload
    console.log('data updateFinishStatus', id, data)
    state.tasks = _.map(state.tasks, v => {
      if (id === v.id) {
        return { ...v, ...data }
      } else {
        return v
      }
    })
  }
}

export const actions = {
  setAppVersion (context, data) {
    context.commit('setAppVersion', data)
  },
  setIsAuthed (context, data) {
    context.commit('setIsAuthed', data)
  },
  setTasks (context, data) {
    context.commit('setTasks', data)
  },
  setQuickTasks (context, data) {
    context.commit('setQuickTasks', data)
  },
  setTaskGroups (context, data) {
    context.commit('setTaskGroups', data)
  },
  setProfileGroups (context, data) {
    context.commit('setProfileGroups', data)
  },
  setAccounts (context, data) {
    context.commit('setAccounts', data)
  },
  setProfiles (context, data) {
    context.commit('setProfiles', data)
  },
  addProfile (context, data) {
    context.commit('addProfile', data)
  },
  updateProfile (context, data) {
    context.commit('updateProfile', data)
  },
  setProxies (context, data) {
    context.commit('setProxies', data)
  },
  setProxyGroups (context, data) {
    context.commit('setProxyGroups', data)
  },
  setHarvesters (context, data) {
    context.commit('setHarvesters', data)
  },
  addProxy (context, data) {
    context.commit('addProxy', data)
  },
  deleteProxy (context, data) {
    context.commit('deleteProxy', data)
  },
  deleteProfile (context, data) {
    context.commit('deleteProfile', data)
  },
  changeProxyName (context, data) {
    context.commit('changeProxyName', data)
  },
  setGroups (context, data) {
    context.commit('setGroups', data)
  },
  setSettings (context, data) {
    context.commit('setSettings', data)
  },
  updateTaskStatus (context, data) {
    context.commit('updateTaskStatus', data)
  },
  updateFinishStatus (context, data) {
    context.commit('updateFinishStatus', data)
  }
}

export const getters = {
  getProxies: state => {
    return state.proxies.map(v => {
      return { name: v.name, values: v.values }
    })
  }
}
