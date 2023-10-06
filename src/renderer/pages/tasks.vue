<template>
  <v-app style="background: transparent!important;">
    <v-container class="container--fluid align-center">
      <v-row style="height:100vh">
        <v-col
          md="7"
          class="ml-11 mr-5"
          style="
              display: flex;
              flex-direction: column;
              max-height: 100%;
          "
        >
          <v-row
            class="home-analytics-header flex-nowrap align-center justify-space-between no-gutters"
          >
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Tasks</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
                draggable="false"
              />
              <span class="analytics font-montserrat">Tasks</span>
            </div>
            <v-row class="analytics flex-row justify-end">
              Delete All Tasks
            </v-row>
          </v-row>
          <v-row
            class="align-center justify-space-between flex-nowrap mt-2 mb-2  w-100 no-gutters"
          >
            <div class="round-5 bg-taskBackground w-100 me-2 ">
              <div
                class="flex-row d-sm-flex justify-content-between align-middle align-items-center create round-5"
                @click="create()"
              >
                <img
                  src="../assets/img/tasks/Plus.png"
                  alt="plus"
                  class="bg-greenBackground"
                />
                <div
                  class="d-sm-flex text-general-white fw-bold justify-content-center text-center cursor-pointer mr-6"
                >
                  Create
                </div>
              </div>
            </div>
            <div class="round-5 bg-taskBackground w-100 me-2 ">
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center start"
              >
                <img
                  src="../assets/img/tasks/start-header.png"
                  alt="start"
                  class="bg-taskHeaderBackground"
                />
                <div class="text-general-white fw-bold  mr-31">Start</div>
              </div>
            </div>
            <div class="round-5 bg-taskBackground w-100 me-2 ">
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center  stop"
              >
                <img
                  src="../assets/img/tasks/stop.png"
                  alt="stop"
                  class="bg-taskHeaderBackground"
                />
                <div class="text-general-white fw-bold  mr-31">Stop</div>
              </div>
            </div>
            <div class="round-5 bg-taskBackground w-100 ">
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center  edit"
              >
                <img
                  src="../assets/img/tasks/edit.png"
                  alt="edit"
                  class="bg-taskHeaderBackground"
                />
                <div class="text-general-white fw-bold  mr-31">Edit</div>
              </div>
            </div>
          </v-row>
          <div class="bottom-border  mt-2" />
          <div class="taskContent">
            <v-row class="no-gutters d-block">
              <v-col v-for="item in displayTasks" :key="item.id" class="">
                <div
                  class="flex-row d-sm-flex  justify-content-between align-middle align-items-center mt-3 border-left-green "
                  :class="[
                    item.status === 'Checked Out'
                      ? 'border-right-green'
                      : 'null',
                    item.status === 'In Queue' ? 'border-right-blue' : 'null',
                    item.status === 'Stopped' ? 'border-right-red' : 'null',
                  ]"
                >
                  <div class="round-5 bg-taskBackground  w-35 me-1 ">
                    <div class="round-5 py-9-13 ">
                      <div
                        class="flex-row d-sm-flex justify-content-between align-middle align-items-center  site"
                      >
                        <div class="site-product home-generalColor">
                          {{ item.site }}
                        </div>
                        <div class="text-general-green">{{ `US 9` }}</div>
                      </div>
                      <div
                        class="flex-row d-sm-flex align-middle align-items-center product-name text-general-white mt-1"
                      >
                        {{ item.item }}
                      </div>
                    </div>
                  </div>
                  <div class="round-5 bg-taskBackground w-25 me-1 ">
                    <div class="round-5 py-9-13 ">
                      <div
                        class="flex-row d-sm-flex justify-content-between align-middle align-items-center  profile"
                      >
                        <div class="site-product home-generalColor">
                          {{ item.profile ? item.profile.name : 'No profile' }}
                        </div>
                      </div>
                      <div
                        class="flex-row d-sm-flex align-middle align-items-center product-name text-general-white mt-1"
                      >
                        {{ item.proxyGroup ? item.proxyGroup.name : 'No name' }}
                      </div>
                    </div>
                  </div>
                  <div class="round-5 bg-taskBackground w-50">
                    <div
                      class="flex-row d-sm-flex justify-space-between align-middle align-items-center  site pb-3 pt-3"
                    >
                      <div class="site-product ma-1 px-2" :class="item.classname">
                        {{ item.status }}
                      </div>
                      <div
                        class="d-sm-flex flex-row align-items-center align-center tasksACtion"
                      >
                        <img
                          v-if="item.isRunning === true"
                          :src="require('../assets/img/tasks/taskStop.png')"
                          alt=""
                          HEAD
                          class="bg-taskstartBackground pa-1 stopBtn round-3 cursor-pointer  me-2"
                          @click="stopTask(item.id)"
                        />
                        <img
                          v-else
                          :src="require('../assets/img/start.svg')"
                          alt=""
                          class="bg-taskstartBackground  startBtn round-3 cursor-pointer me-2"
                          @click="startTask(item.id)"
                        />
                        <img
                          :src="require('../assets/img/edit.svg')"
                          alt=""
                          HEAD
                          class="bg-taskEditBackground  stopBtn round-3 cursor-pointer  me-2"
                        />
                        <img
                          :src="require('../assets/img/copy.svg')"
                          alt=""
                          HEAD
                          class="bg-taskEditBackground  copyBtn round-3 cursor-pointer  me-2"
                        />
                        <img
                          src="../assets/img/delete.svg"
                          alt=""
                          class="bg-taskDeleteBackground  deleteBtn round-3 cursor-pointer me-2"
                          draggable="false"
                          @click="deleteTask(item.id)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col
          md="4"
          style="
              display: flex;
              flex-direction: column;
              max-height: 100%;
          "
        >
          <v-row class="align-center justify-start no-gutters">
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Tasks</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              />
              <span class="analytics">Task Groups</span>
            </div>
          </v-row>
          <div
            class="flex-row d-sm-flex flex-nowrap no-gutters align-center mt-2 mb-2"
          >
            <InputBoxText
              label="New Group"
              placeholder="Enter Name"
              :init-value="groupName"
              @updated="
                value => {
                  groupName = value.value;
                }
              "
            />
            <img
              src="../assets/img/tasks/Plus.png"
              alt="plus"
              class="bg-greenBackground CreateTaskGroup cursor-pointer"
              @click="createGroup"
            />
          </div>
          <div class="bottom-border border-color-profile mt-2" />
          <div class="taskGroup">
            <div
              v-for="item in displayTaskGroups"
              :key="item.id"
              class="d-sm-flex  align-middle align-items-center bg-taskBackground pa-2 justify-space-between   mt-3 round-5 "
              :class="item.id === selectedGroupId ? 'border-left-green' : ''"
              @click="handleGroupItemClick(item.id)"
            >
              <div class="w-50 ">
                <div class="text-general-white">{{ item.count }} Tasks</div>
                <div class="text-general-white fs-2 text-green mt-1">
                  {{ item.name }}
                </div>
              </div>
              <div
                class="justify-end bg-greenBg align-items-center ml-auto d-sm-flex align-middle align-content-center round-3 store"
              >
                <span class=" text-general-green me-2  count">{{
                  item.count
                }}</span>
                <img src="../assets/img/tasks/store.png" alt="store" />
              </div>
              <div class="d-sm-flex align-center me-2 justify-end">
                <img
                  src="../assets/img/tasks/Trash.png"
                  alt=""
                  @click="deleteTaskGroup(item.id)"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <CreateTask
        v-if="dialog"
        v-model="dialog"
        class="TaskDialog"
        :group-id="selectedGroupId"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
      />
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { ipcRenderer } from 'electron';
import CreateTask from '../../renderer/components/PopUp/CreateTask';
import InputBoxText from '../../renderer/components/inputs/InputBoxText';

export default {
  components: { InputBoxText, CreateTask },
  middleware: 'auth',
  data() {
    return {
      valid: true,
      dialog: false,
      groupName: '',
      selectedTaskId: '',
      editTaskId: '',
      selectedGroupId: '',
      data: [
        {
          id: 1,
          name: 'Task Group',
          tasks: {
            id: 1,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'Checked Out',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-checkout',
            active: false,
            number: '3',
          },
        },
        {
          id: 2,
          name: 'Task Group',
          tasks: {
            id: 2,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'In Queue',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-inQueue',
            number: '',
          },
        },
        {
          id: 3,
          name: 'Task Group',
          tasks: {
            id: 3,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'Stopped',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-stopped',
            number: '3',
          },
        },
        {
          id: 4,
          name: 'Task Group',
          tasks: {
            id: 4,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'In Queue',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-inQueue',
            number: '',
          },
        },
        {
          id: 5,
          name: 'Task Group',
          tasks: {
            id: 5,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'Checked Out',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-checkout',
            number: '',
          },
        },
        {
          id: 6,
          name: 'Task Group',
          tasks: {
            id: 6,
            site: 'Footlocker US',
            price: 'US 9',
            product: 'Nike Air Jordan 1 Retro Shadows',
            profile: 'Profile 1',
            mail: ' email@email.com',
            status: 'Checked Out',
            action: require('../assets/img/tasks/start.png'),
            classname: 'text-checkout',
            number: '',
          },
        },
      ],
      started: false,
    };
  },
  computed: {
    ...mapState({
      profiles: state => state.data.profiles,
      proxyGroups: state => state.data.proxyGroups,
      tasks: state => state.data.tasks,
      taskGroups: state => state.data.taskGroups,
      isAuthed: state => state.data.isAuthed,
    }),
    displayTaskGroups() {
      const groups = this.taskGroups.map(v => {
        const selectTasks = this.tasks.filter(m => m.groupId === v.id);
        return { ...v, count: selectTasks.length };
      });
      return groups;
    },
    displayTasks() {
      const tasks = this.tasks.filter(v => v.groupId === this.selectedGroupId);
      const mappedTasks = tasks.map(v => {
        const profile = this.profiles.find(
          profile => profile.id === v.profileId,
        );
        const proxyGroup = this.proxyGroups.find(
          proxyGroup => proxyGroup.id === v.proxyGroupId,
        );
        return {
          ...v,
          profile,
          proxyGroup,
          status: 'Checked Out',
          classname: 'text-checkout',
        };
      });
      return mappedTasks;
    },
  },
  watch: {
    isAuthed(newVal, val) {
      if (!newVal) {
        this.$router.push('/');
      }
    },
  },
  mounted() {},
  methods: {
    create() {
      this.dialog = true;
    },
    createGroup() {
      if (this.groupName) {
        ipcRenderer.send('create_task_group', { name: this.groupName });
        this.groupName = '';
      }
    },
    deleteTaskGroup(groupId) {
      ipcRenderer.send('delete_task_group', { id: groupId });
      const tasks = this.tasks.filter(v => v.groupId === groupId);
      this.deleteTasks(tasks);
    },
    startTask(id) {
      ipcRenderer.send('start_task', { id });
    },
    stopTask(id) {
      ipcRenderer.send('stop_task', { id });
    },
    deleteTask(id) {
      ipcRenderer.send('delete_task', { id });
    },
    deleteTasks(tasks) {
      ipcRenderer.send('delete_tasks', { tasks });
    },
    deleteAllDisplayTasks() {
      return this.deleteTasks(this.displayTasks);
    },

    handleGroupItemClick(id) {
      console.log(this.selectedGroupId, id);
      if (this.selectedGroupId === id) {
        this.selectedGroupId = '';
      } else {
        this.selectedGroupId = id;
      }
    },
  },
};
</script>

<style>
.tasksACtion img{
  width: 21px;
  height: 21px;
}
.stopBtn {
  padding: 3px !important;
}
.startBtn {
  padding: 3px !important;
}
.deleteBtn {
  padding: 3px !important;
}
.copyBtn {
  padding: 3px !important;
}
.bg-taskstartBackground {
  background: #92bdff2e;
}
.bg-taskEditBackground {
  background: #4d3e2e;
}
.bg-taskDeleteBackground {
  background: #ff35352b;
}
.taskContent {
  height: 100%;
  flex-grow: 2;
  overflow-y: scroll;
}
.taskGroup {
  height: 100%;
  overflow-y: scroll;
  flex-grow: 2;
}
.taskContent::-webkit-scrollbar,
.taskGroup::-webkit-scrollbar {
  display: none;
}
.count {
  padding-top: 2px;
}
.bg-taskBackground {
  background: #262626;
}

.start:hover {
  background: #1a1a1a !important;
}

.start:hover img {
  background: #4892ff !important;
}

.stop:hover {
  background: #1a1a1a !important;
}

.stop:hover img {
  background: #ff3535 !important;
}

.edit:hover {
  background: #1a1a1a !important;
}

.edit:hover img {
  background: #ffaf51 !important;
}

.create img,
.start img {
  padding: 0.5rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.stop img {
  padding: 12px 14px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.edit img {
  padding: 9px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.border-color-profile {
  border-color: #262626;
}

.bottom-border {
  border-bottom: 2px solid #262626;
}

.text-general-green {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.563rem;
  font-style: normal;
  font-weight: 600;
  line-height: 11px;
  letter-spacing: 0em;
  color: #5dbd54;
}

.home-generalColor {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 12px;
  color: #787878;
}

.text-general-white {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-size: 0.625rem;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.text-general-small-white {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-size: 0.563rem;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.text-general-small-gray {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-size: 0.563rem;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #787878;
}

.text-general-big-white {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-size: 0.75rem;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.text-general-more-small-green {
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  line-height: 10px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #12430d;
  font-weight: bold;
}

.text-checkout {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: center;
  color: #2fc85a;
}

.text-inQueue {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: center;
  color: #4892ff;
}

.text-stopped {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: center;
  color: #ff3535;
}

.bg-taskstartBackground {
  background: #92bdff2e;
}

.py-9-13 {
  padding: 9px 13px;
}
.store {
  padding: 2px;
}
.border-right-blue {
  border-right: 4px solid #4892ff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.border-right-red {
  border-right: 4px solid #ff3535;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.profileName {
  border: none !important;
  border-color: transparent;
  padding: 18px;
}

input:focus {
  outline: none;
  border: none;
  box-shadow: none !important;
}

.CreateTaskGroup {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0.4rem;
}
</style>
