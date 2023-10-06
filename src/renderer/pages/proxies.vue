<template>
  <v-app style="background: transparent!important;">
    <v-container class="container--fluid align-center">
      <v-row style="height:100vh">
        <v-col md="7" class="ml-11 mr-5" style="
              display: flex;
              flex-direction: column;
              max-height: 100%;
          ">
          <v-row
            class="home-analytics-header flex-nowrap align-center justify-space-between no-gutters"
          >
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;">Proxies</span>
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
                draggable="false"
              >
              <span class="analytics font-montserrat">Proxies</span>
            </div>
            <v-row class="analytics flex-row justify-end">
              Delete All Tasks
            </v-row>
          </v-row>
          <v-row
            class="align-center justify-space-between flex-nowrap mt-2 mb-2  no-gutters"
          >
            <div class="round-5 bg-taskBackground w-25 me-2 ">
              <div
                class="flex-row d-sm-flex justify-content-between align-middle align-items-center create round-5 cursor-pointer"
                @click="openDialog()"
              >
                <img
                  src="../assets/img/tasks/Plus.png"
                  alt="plus"
                  class="bg-greenBackground cursor-pointer"
                >
                <div
                  class="d-sm-flex text-general-white fw-bold justify-content-center text-center cursor-pointer me-7"
                >
                  Add
                </div>
              </div>
            </div>
            <div
              class="flex-row d-sm-flex  align-middle align-items-center justify-content-between w-50"
            >
              <div class="round-5 bg-taskBackground w-50 me-2">
                <div
                  class="flex-row d-sm-flex  justify-content-between align-middle align-items-center  TestProxies cursor-pointer"
                >
                  <img
                    src="../assets/img/tasks/start-header.png"
                    alt="edit"
                    class="bg-taskHeaderBackground"
                  >
                  <div class="text-general-white  fw-bold mx-4">Test All</div>
                </div>
              </div>
              <div class="round-5 bg-taskBackground w-50 ">
                <div
                  class="flex-row d-sm-flex  justify-content-between align-middle align-items-center  DeleteAllProxies cursor-pointer"
                >
                  <img
                    src="../assets/img/tasks/Trash.png"
                    alt="edit"
                    class="bg-taskHeaderBackground"
                    @click="deleteAllDisplayProxies()"
                  >
                  <div class="text-general-white  fw-bold me-4">Delete All</div>
                </div>
              </div>
            </div>
          </v-row>
          <div class="bottom-border border-color-profile mt-2" />
          <div class="ProxyContent">
            <v-row class="no-gutters d-block">
              <v-col
                v-for="item in displayProxies"
                :key="item.id"
                class="pa-1 mt-2"
              >
                <div
                  class="d-sm-flex flex-row align-middle align-items-center justify-content-between bg-taskBackground  border-left-green round-5 py-11-20 w-100"
                >
                  <div
                    class="flex-row d-sm-flex justify-content-between align-middle align-items-center  w-50 site"
                  >
                    <div class="site-product text-general-white">
                      {{ item.proxy }}
                    </div>
                  </div>
                  <div
                    class="flex-row d-sm-flex align-middle align-items-center justify-content-evenly text-general-small-white w-50 proxyMax"
                  >
                    <div
                      :class="[
                        item.proxy.className === 'text-green'
                          ? 'text-green'
                          : 'null',
                        item.proxy.className === 'text-red'
                          ? 'text-red'
                          : 'null',
                      ]"
                      class="flex-row d-sm-flex align-middle align-items-center text-general-white text-green-color  justify-end w-50"
                    >
                      {{ item.proxy.delay }}
                    </div>
                    <div
                      class="d-sm-flex flex-row align-items-center align-middle w-50  justify-end proxyAction"
                    >
                      <img
                        src="../assets/img/start.svg"
                        alt="start"
                        class="bg-taskstartBackground padding-4 startBtn round-3 me-2 cursor-pointer"
                      >
                      <img
                        src="../assets/img/delete.svg"
                        alt=""
                        class="bg-proxyDeleteBackground padding-4 startBtn round-3 cursor-pointer"
                        draggable="false"
                        @click.stop="deleteProxy(item.id)"
                      >
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col md="4" style="
              display: flex;
              flex-direction: column;
              max-height: 100%;
          ">
          <v-row class="align-center justify-start no-gutters">
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;">Proxies</span>
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              >
              <span class="analytics">Proxy Groups</span>
            </div>
          </v-row>
          <v-row class="flex-row flex-nowrap no-gutters align-center mt-2 mb-2">
            <InputBoxText
              label=""
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
              @click="createGroup()"
            >
          </v-row>
          <div class="bottom-border border-color-profile mt-2" />
          <div class="proxyGroup">
            <div
              v-for="item in displayProxyGroups"
              :key="item.id"
              class="d-sm-flex  align-middle align-items-center bg-taskBackground pa-2 justify-space-between   mt-3 round-5 "
              :class="item.id === selectedGroupId ? 'border-left-green' : ''"
              @click="handleGroupItemClick(item.id)"
            >
              <div class="w-50 ">
                <div
                  :class="
                    item.id === selectedGroupId
                      ? 'text-general-white'
                      : 'text-general-small-gray'
                  "
                  class=""
                >
                  {{ item.count }} Proxies
                </div>
                <div
                  :class="item.id === 0 ? 'text-green' : 'text-general-white'"
                  class="text-general-white fs-2  mt-1"
                >
                  {{ item.name }}
                </div>
              </div>
              <div class="me-2 justify-content-end d-flex">
                <img
                  src="../assets/img/tasks/Trash.png"
                  alt=""
                  class="cursor-pointer"
                  @click.stop="deleteProxyGroup(item.id)"
                >
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <CreateProxy
        v-if="dialog"
        v-model="dialog"
        class="ProxyDialog"
        :group-id="selectedGroupId"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
      />
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import CreateProxy from '../../renderer/components/PopUp/CreateProxy'
import InputBoxText from '../../renderer/components/inputs/InputBoxText'

export default {
  name: 'Proxies',
  components: { InputBoxText, CreateProxy },
  middleware: 'auth',
  data () {
    return {
      dialog: false,
      groupName: '',
      selectedProxyId: '',
      selectedGroupId: ''
    }
  },
  watch: {
    isAuthed (newVal, val) {
      if (!newVal) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapState({
      proxies: state => state.data.proxies,
      proxyGroups: state => state.data.proxyGroups,
      isAuthed: state => state.data.isAuthed
    }),
    displayProxyGroups () {
      const groups = this.proxyGroups.map(v => {
        const selectProxies = this.proxies.filter(m => m.groupId === v.id)
        return { ...v, count: selectProxies.length }
      })
      return groups
    },
    displayProxies () {
      const proxies = this.proxies.filter(
        v => v.groupId === this.selectedGroupId
      )
      return proxies
    }
  },
  mounted () {},
  methods: {
    openDialog () {
      console.log('dialog', this.dialog)
      this.dialog = true
    },
    createGroup () {
      if (this.groupName) {
        ipcRenderer.send('create_proxy_group', { name: this.groupName })
        this.groupName = ''
      }
    },
    deleteProxyGroup (groupId) {
      ipcRenderer.send('delete_proxy_group', { id: groupId })
      const proxies = this.proxies.filter(v => v.groupId === groupId)
      this.deleteProxies(proxies)
    },
    deleteProxy (id) {
      ipcRenderer.send('delete_proxy', { id })
    },
    deleteProxies (proxies) {
      ipcRenderer.send('delete_proxies', { proxies })
    },
    deleteAllDisplayProxies () {
      return this.deleteProxies(this.displayProxies)
    },

    handleGroupItemClick (id) {
      console.log(this.selectedGroupId, id)
      if (this.selectedGroupId === id) {
        this.selectedGroupId = ''
      } else {
        this.selectedGroupId = id
      }
    }
  }
}
</script>

<style scoped>
.proxyAction img{
  width: 20px;
  height: 20px;
}
.ProxyContent{
  flex-grow: 2;
  overflow-y: scroll;
  height: 100%;

}
.proxyGroup{
  flex-grow: 2;
  overflow-y: scroll;
  height: 100%;

}
.proxyGroup::-webkit-scrollbar,.ProxyContent::-webkit-scrollbar {
  display: none;
}
.DeleteAllProxies img {
  padding: 9px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.bg-proxyDeleteBackground{
  background: #FF35352B;
  padding: 1px;
}

.TestProxies img {
  padding: 9px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.py-11-20 {
  padding: 11px 13px 11px 20px;
}

.justify-content-evenly {
  justify-content: space-evenly;
}
</style>
