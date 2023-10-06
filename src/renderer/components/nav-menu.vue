<template>
  <div class="navbar">
    <div class="app">
      <div class="app_text">
        <span class="main_text">
          CactusAIO
        </span>
        <img
          src="../assets/img/logo/weclomeLogo.png"
          alt="logo"
          draggable="false"
        />
      </div>
    </div>
    <div id="tools-list" class="tools-list">
      <div
        data-num="1"
        class="tool d-sm-flex flex-row align-items-center justify-content-between"
        :class="currentRoute === '/dashboard' ? 'active' : ''"
      >
        <nuxt-link to="/dashboard" class="nav-link">
          <div class="sidebar-img">
            <img
              src="../assets/img/dashboard/navbar/overview.png"
              alt=""
              class="home1"
              draggable="false"
            />
          </div>
          <span>Overview</span>
        </nuxt-link>
      </div>
      <div
        data-num="2"
        class="tool d-sm-flex flex-row align-items-center justify-content-between"
        :class="currentRoute === '/tasks' ? 'active' : ''"
      >
        <nuxt-link to="/tasks" class="nav-link">
          <div class="sidebar-img">
            <img
              src="../assets/img/dashboard/navbar/task.png"
              alt=""
              class="power1"
              draggable="false"
            />
          </div>
          <span class="d-flex flex-row w-25">Tasks</span>
        </nuxt-link>
        <div
          class="price bg-greenBg text-general-white text-green  round-3 totalTask"
        >
          {{ taskCount }}
        </div>
      </div>
      <div
        data-num="3"
        class="tool d-sm-flex flex-row align-items-center justify-content-between"
        :class="currentRoute === '/profiles' ? 'active' : ''"
      >
        <nuxt-link to="/profiles" class="nav-link">
          <div class="sidebar-img">
            <img
              src="../assets/img/dashboard/navbar/profile.png"
              alt=""
              class="power1"
              draggable="false"
            />
          </div>
          <span>Profiles</span>
        </nuxt-link>
        <div
          class="price bg-greenBg text-general-white text-green  round-3 totalProxy"
        >
          {{ profileCount }}
        </div>
      </div>
      <div
        data-num="4"
        class="tool d-sm-flex flex-row align-items-center justify-content-between"
        :class="currentRoute === '/proxies' ? 'active' : ''"
      >
        <nuxt-link to="/proxies" class="nav-link">
          <div class="sidebar-img">
            <img
              src="../assets/img/dashboard/navbar/Proxies.png"
              alt=""
              class="user1"
              draggable="false"
            />
          </div>
          <span class="d-flex flex-row w-25">Proxies</span>
        </nuxt-link>
        <div
          class="price bg-greenBg text-general-white text-green  round-3 totalProxy"
        >
          {{ proxyCount }}
        </div>
      </div>
      <div
        data-num="5"
        class="tool d-sm-flex flex-row align-items-center justify-content-between"
        :class="currentRoute === '/settings' ? 'active' : ''"
      >
        <nuxt-link to="/settings" class="nav-link">
          <div class="sidebar-img">
            <img
              src="../assets/img/dashboard/navbar/setting.png"
              alt=""
              class="user1"
              draggable="false"
            />
          </div>
          <span>Settings</span>
        </nuxt-link>
      </div>
    </div>
    <div class="app-clock-display">
      <div class="sidebar-img">
        <img
          src="../assets/img/dashboard/navbar/Clock.png"
          alt=""
          class="home1"
          draggable="false"
        />
      </div>
      <span
        id="app-clock"
        class="text-general-white text-center justify-content-center"
        >{{ timestamp }}</span
      >
    </div>
    <div class="app-version-display">
      <div class="user-connected">
        <span id="userName">User Settings</span>
        <div class="connectedState">
          <span class="connected">Connected</span>
          <span class="activeConnect" />
        </div>
      </div>
      <img
        src="../assets/img/dashboard/navbar/user-setting.png"
        alt=""
        draggable="false"
      />
    </div>
  </div>
</template>

<script>
import { mdiLogout } from '@mdi/js';
import { ipcRenderer } from 'electron';
import { mapState } from 'vuex';
import { version } from '../../../package';

export default {
  components: {},
  data() {
    return {
      version,
      mdiLogout,
      timestamp: '',
    };
  },
  computed: {
    ...mapState({
      tasks: state => state.data.tasks,
      profiles: state => state.data.profiles,
      proxies: state => state.data.proxies,
    }),
    taskCount() {
      return this.tasks.length;
    },
    profileCount() {
      return this.profiles.length;
    },
    proxyCount() {
      return this.proxies.length;
    },
    currentRoute() {
      return $nuxt.$route.path;
    },
  },
  mounted() {
    ipcRenderer.send('app_version');
    this.currentDateTime();
    ipcRenderer.on('tasks', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('tasks ==============>', newData);
      this.$store.dispatch('data/setTasks', newData);
    });

    ipcRenderer.on('task_groups', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('task_groups ==============>', newData);
      this.$store.dispatch('data/setTaskGroups', newData);
    });

    ipcRenderer.on('profiles', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('profiles ==============>', newData);
      this.$store.dispatch('data/setProfiles', newData);
    });

    ipcRenderer.on('profile_groups', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('profile_groups ==============>', newData);
      this.$store.dispatch('data/setProfileGroups', newData);
    });

    ipcRenderer.on('proxies', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('proxies ==============>', newData);
      this.$store.dispatch('data/setProxies', newData);
    });

    ipcRenderer.on('proxy_groups', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('proxy_groups ==============>', newData);
      this.$store.dispatch('data/setProxyGroups', newData);
    });

    ipcRenderer.on('harvesters', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      console.log('harvesters ==============>', newData);
      this.$store.dispatch('data/setHarvesters', newData);
    });

    ipcRenderer.on('settings', (event, data) => {
      const newData = JSON.parse(JSON.stringify(data));
      this.$store.dispatch('data/setSettings', newData);
    });
  },

  methods: {
    checkUpdate() {},
    currentDateTime() {
      setInterval(() => {
        const date = new Date();
        const [hours, minutes, seconds] = [
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
        ].map(e => e.toString().padStart(2, '0'));
        const time = `${hours}:${minutes}:${seconds}`;
        this.timestamp = hours ? time + ' ' + 'AM' : time + ' ' + 'PM';
      }, 1000);
    },
  },
};
</script>

<style>
.navbar {
  display: block;
  width: 25%;
  background: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.navbar {
  position: relative;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.app {
  padding: 0 24px;
  border-bottom: 2px solid #1f1f1f;
}

.main_text {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.app_text {
  display: flex;
  align-items: center;
}

.app_text img {
  display: flex;
  margin-left: auto;
  width: 50px;
  height: 50px;
}

.navbar .tools-list {
  justify-content: center;
  height: 382px;
  width: 85%;
  border-radius: 0px;
  position: absolute;
  top: 10.96%;
  bottom: 48.73%;
}

.d-sm-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}

.flex-row {
  -ms-flex-direction: row !important;
  flex-direction: row !important;
}

.navbar .tools-list .tool {
  position: relative;
  /* padding-left: 38px; */
  margin-right: 62px;
  width: 100%;
  height: 40px;
  text-align: left;
  transition-duration: 0.3s;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.sidebar-img {
  padding: 20px;
}

.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}

.justify-content-between {
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.round-3 {
  border-radius: 3px;
}

.tool span {
  position: absolute;
  top: 26%;
  left: 19%;
  color: #ffffff;
  font-size: 0.625rem;
  font-style: normal;
  letter-spacing: 0em;
  text-align: center;
  margin-left: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.navbar .tools-list .tool img {
  display: flex;
  justify-content: center;
  text-align: center;
}

.price {
  padding: 3px 8px;
}

.bg-greenBg {
  background: #5dbd542e;
}

.text-green {
  color: #5dbd54 !important;
}

.text-general-white {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.625rem;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.text-center {
  text-align: center !important;
}

.justify-content-center {
  -ms-flex-pack: center !important;
  justify-content: center !important;
}

.app-clock-display {
  width: 100%;
  text-align: center;
  position: relative;
  top: 74%;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  background: #1f1f1f;
  box-shadow: 0px 4px 25px rgb(0 0 0 / 3%);
  border-radius: 5px;
}

.app-clock-display .sidebar-img {
  background: #303030;
  padding: 8px 11px !important;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
}

.tools-list .active {
  background: #5dbd54;
}

.tools-list .active .sidebar-img {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #77d46e;
  height: 40px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.tools-list .active span {
  left: 27%;
}

.app-clock-display #app-clock {
  font-size: 90%;
  width: 100%;
}

.navbar .app-version-display {
  position: relative;
  top: 76%;
  display: flex;
  align-items: center;
  text-align: center;
  background: #1f1f1f;
  box-shadow: 0px 4px 25px rgb(0 0 0 / 3%);
  border-radius: 5px;
  padding: 13px 14px;
}

.connectedState {
  display: flex;
  align-items: center;
  padding: 2px 0;
}

.connected {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  display: flex;
  align-items: center;
  color: #787878;
}

.activeConnect {
  background: linear-gradient(93.18deg, #23c664 0%, #148e45 100%);
  height: 4px;
  width: 4px;
  border-radius: 14px;
  margin-left: 5px;
}

.app-version-display img {
  display: flex;
  margin-left: auto;
  background: #92bdff2e;
  padding: 5px;
  border-radius: 2px;
}
#userName {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
}
</style>
