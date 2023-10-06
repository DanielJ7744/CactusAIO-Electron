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
              <span class="text-general-white" style="display: inline-block;">Profiles</span>
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
                draggable="false"
              >
              <span class="analytics font-montserrat">Profiles</span>
            </div>
            <v-row class="analytics flex-row justify-end">
              Delete All Tasks
            </v-row>
          </v-row>
          <v-row
            class="align-center justify-space-between flex-nowrap mt-2 mb-2  w-100 no-gutters"
          >
            <div class="round-5 bg-taskBackground w-25 me-2 ">
              <div
                class="flex-row d-sm-flex justify-content-between align-middle align-items-center create round-5 cursor-pointer"
                @click="openDialog()"
              >
                <img
                  src="../assets/img/tasks/Plus.png"
                  alt="plus"
                  class="bg-greenBackground"
                >
                <div
                  class="d-sm-flex text-general-white fw-bold justify-content-center text-center cursor-pointer me-4"
                >
                  Create
                </div>
              </div>
            </div>

            <div class="round-5 bg-taskBackground w-25 ">
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center  edit"
              >
                <img
                  src="../assets/img/profiles/Trash.png"
                  alt="edit"
                  class="bg-taskHeaderBackground"
                  @click="deleteAllDisplayProfiles()"
                >
                <div class="text-general-white fw-bold me-4">Delete All</div>
              </div>
            </div>
          </v-row>
          <div class="bottom-border border-color-profile mt-2 mb-2" />
          <div class="ProfileContent">
            <v-row>
              <v-col v-for="item in displayProfiles" :key="item.id" cols="6">
                <div
                  :class="
                    item.id === selectedProfileId
                      ? 'active-bg-green'
                      : 'bg-taskBackground'
                  "
                  class="round-5  position-relative pa-2"
                  @click="selectedProfileId = item.id"
                >
                  <div
                    class="round-5 py-14-20"
                    style="z-index: 100;position: relative;"
                  >
                    <div
                      class="flex-row d-sm-flex justify-content-between align-middle align-items-center  site"
                    >
                      <div class="site-product text-general-white">
                        {{ item.name }}
                      </div>
                      <div class="">
                        <img
                          :src="
                            item.id === selectedProfileId
                              ? require('../assets/img/profiles/profile-max.png')
                              : require('../assets/img/profiles/profile-max-default.png')
                          "
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      :class="
                        item.id === selectedProfileId
                          ? 'text-general-small-white'
                          : 'text-general-small-gray'
                      "
                      class="flex-row d-sm-flex align-middle align-items-center profile-max mt-1"
                    >
                      {{ `${item.firstName} ${item.lastName}` }}
                    </div>
                    <div
                      class="flex-row d-sm-flex align-middle align-items-center justify-space-between text-general-small-white profile-max mt-5"
                    >
                      <div class="d-block w-25">
                        <div
                          :class="
                            item.id === selectedGroupId
                              ? 'text-general-more-small-green'
                              : 'text-general-green'
                          "
                          class=" w-100"
                        >
                          Num.
                        </div>
                        <div class="text-general-big-white mt-2">
                          {{ item.card.substring(8,4) }}
                        </div>
                      </div>
                      <div class="d-block w-25">
                        <div
                          :class="
                            item.id === selectedGroupId
                              ? 'text-general-more-small-green'
                              : 'text-general-green'
                          "
                          class=" w-100"
                        >
                          Exp.
                        </div>
                        <div class="text-general-big-white mt-2">
                          {{ item.expirationDate }}
                        </div>
                      </div>
                      <div
                        class="d-sm-flex flex-row align-items-center align-middle w-50 ml-auto justify-end mt-3"
                      >
                        <img
                          src="../assets/img/profiles/edit.png"
                          alt="edit"
                          @click.stop="editProfile(item.id)"
                        >
                        <img
                          src="../assets/img/profiles/Trash.png"
                          alt="delete"
                          @click.stop="deleteProfile(item.id)"
                        >
                      </div>
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
              <span class="text-general-white" style="display: inline-block;">Profiles</span>
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              >
              <span class="analytics">Profile Groups</span>
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
              @click="createGroup"
            >
          </v-row>
          <div class="bottom-border border-color-profile mt-2" />
          <div class="profile-group">
            <div
              v-for="item in displayProfileGroups"
              :key="item.id"
              class="task-group-item d-sm-flex  align-middle align-items-center bg-taskBackground pa-2 justify-space-between   mt-3 round-5"
              :class="item.id === selectedGroupId ? 'border-left-green' : ''"
              @click="handleGroupItemClick(item.id)"
            >
              <div class="w-50 ">
                <div class="text-general-white">{{ item.count }} Profiles</div>
                <div class="text-general-white fs-2 text-green mt-1">
                  {{ item.name }}
                </div>
              </div>
              <div class="me-2 justify-content-end d-sm-flex">
                <img
                  src="../assets/img/tasks/Trash.png"
                  alt=""
                  @click.stop="deleteProfileGroup(item.id)"
                >
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <CreateProfile
        v-if="dialog"
        v-model="dialog"
        class="CreateDialog"
        label=""
        :profile-id="editProfileId"
        :group-id="selectedGroupId"
        @closeDialog="dialog = false"
      />
    </v-container>
  </v-app>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState } from 'vuex'
import CreateProfile from '../../renderer/components/PopUp/CreateProfile'
import InputBoxText from '../../renderer/components/inputs/InputBoxText'
export default {
  components: { CreateProfile, InputBoxText },
  middleware: 'auth',
  data () {
    return {
      valid: true,
      dialog: false,
      groupName: '',
      selectedProfileId: '',
      editProfileId: '',
      selectedGroupId: ''
    }
  },
  computed: {
    ...mapState({
      profiles: state => state.data.profiles,
      profileGroups: state => state.data.profileGroups,
      isAuthed: state => state.data.isAuthed
    }),
    displayProfileGroups () {
      const groups = this.profileGroups.map(v => {
        const selectProfiles = this.profiles.filter(m => m.groupId === v.id)
        return { ...v, count: selectProfiles.length }
      })
      return groups
    },
    displayProfiles () {
      const profiles = this.profiles.filter(
        v => v.groupId === this.selectedGroupId
      )
      return profiles
    }
  },
  watch: {
    isAuthed (newVal, val) {
      if (!newVal) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    // console.log(this.selectedProfileId)
  },
  methods: {
    handleSelect (id) {
      // eslint-disable-next-line no-return-assign
      if (id === this.data[id].id) {
        this.data[id].profiles.active = !this.data[id].profiles.active
      } else {
        this.data[id].profiles.active = false
      }
      console.log(this.data)
    },
    openDialog () {
      this.dialog = true
    },
    editProfile (id) {
      this.editProfileId = id
      this.openDialog()
    },
    createGroup () {
      if (this.groupName) {
        ipcRenderer.send('create_profile_group', { name: this.groupName })
        this.groupName = ''
      }
    },
    deleteProfileGroup (groupId) {
      ipcRenderer.send('delete_profile_group', { id: groupId })
      const profiles = this.profiles.filter(v => v.groupId === groupId)
      this.deleteProfiles(profiles)
    },
    deleteProfile (id) {
      ipcRenderer.send('delete_profile', { id })
    },
    deleteProfiles (profiles) {
      ipcRenderer.send('delete_profiles', { profiles })
    },
    deleteAllDisplayProfiles () {
      return this.deleteProfiles(this.displayProfiles)
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

<style>
.profile-group{
  height: 100%;
  flex-grow: 2;
  overflow-y: scroll;
}
.ProfileContent{
  height: 100%;
  flex-grow: 2;
  overflow-y: scroll;
  height: 100%;

}
.profile-group::-webkit-scrollbar,.ProfileContent::-webkit-scrollbar {
  display: none;
}
.py-14-20 {
  padding: 14px 20px;
}
.task-group-item {
  cursor: pointer;
}
</style>
