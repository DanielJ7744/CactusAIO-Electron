<template>
  <v-app style="background: transparent!important;">
    <v-container class="container--fluid align-center">
      <v-row>
        <v-col md="7" class="ml-11 mr-5">
          <v-row
            class="home-analytics-header flex-nowrap align-center justify-space-between no-gutters"
          >
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Captcha</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
                draggable="false"
              />
              <span class="analytics font-montserrat">Captcha Harvester</span>
            </div>
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
                />
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
                  />
                  <div class="text-general-white  fw-bold me-4">Open All</div>
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
                  />
                  <div class="text-general-white  fw-bold me-4">Delete All</div>
                </div>
              </div>
            </div>
          </v-row>
          <div class="bottom-border  mt-2 mb-2" />
          <div class="CaptchaContent">
            <div class="havaster">
              <v-row class="">
                <v-col
                  v-for="item in displayHarvesters"
                  :key="item.id"
                  cols="6"
                  class="fill-height"
                >
                  <div class="round-5  bg-taskBackground  flex-50  ">
                    <div class="round-5 py-14-20  ">
                      <div
                        class="flex-row d-sm-flex justify-content-between align-middle align-items-center  site"
                      >
                        <div class="site-product text-general-white">
                          {{ item.name }}
                        </div>
                        <div class="">
                          <img
                            src="../assets/img/setting/captcha-delete.png"
                            alt=""
                            @click="deleteHarvester(item.id)"
                          />
                        </div>
                      </div>
                      <div
                        class="flex-row d-sm-flex align-middle align-items-center text-general-small-white profile-max mt-1"
                      >
                        <span class="home-generalColor me-2">{{
                          item.site
                        }}</span>
                        <span class="text-general-small-white text-blue"
                          >Opened</span
                        >
                      </div>
                      <div
                        class="flex-row d-sm-flex align-middle align-items-center justify-content-evenly text-general-small-white profile-max mt-2"
                      >
                        <div class="d-block w-50">
                          <div
                            class="d-sm-flex text-general-small-white text-green bg-greenBg text-center justify-content-center round-3 p-1"
                          >
                            Checkout Only
                          </div>
                          <div
                            class="d-sm-flex text-general-small-white text-green bg-greenBg text-center justify-content-center round-3 mt-2 p-1"
                          >
                            {{
                              item.proxyGroup
                                ? item.proxyGroup.name
                                : 'localhost'
                            }}
                          </div>
                        </div>
                        <div
                          class="d-sm-flex flex-row align-items-center align-middle w-50 ml-auto justify-end mt-3"
                        >
                          <img
                            src="../assets/img/setting/img.png"
                            alt=""
                            class="bg-taskstartBackground pa-1 startBtn round-3 me-2"
                          />
                          <img
                            src="../assets/img/setting/refresh.png"
                            alt=""
                            width="24px"
                            height="24px"
                            class="bg-proxyDeleteBackground pa-1 startBtn round-3"
                            draggable="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <div class="license-setting position-absolute">
              <div
                class="setting-header flex-row d-sm-flex align-items-center justify-content-between"
              >
                <div class="homeAnayltics ">
                  <span
                    class="text-general-white"
                    style="display: inline-block;"
                    >Settings</span
                  >
                  <img
                    src="../assets/img/dashboard/main/arrow-right.png"
                    alt="arrow-right"
                  />
                  <span class="analytics">License Information</span>
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-items-center align-middle bg-taskBackground round-5 mt-3 py-14-20"
              >
                <div class="d-block">
                  <div
                    class="d-sm-flex flex-row align-items-center align-middle justify-content-between"
                  >
                    <div class="d-block">
                      <div class="text-general-white">ResellDon#6858</div>
                      <div class="home-generalColor mt-1">Monthly User</div>
                    </div>
                    <div class="d-block">
                      <div class="text-general-white text-green">
                        18 Days Left
                      </div>
                      <div class="home-generalColor text-blue mt-1 text-right">
                        Dashboard
                      </div>
                    </div>
                  </div>
                  <div
                    class="d-sm-flex flex-row align-items-center align-middle bg-background round-3 p-12-34  position-relative mt-3"
                  >
                    <img
                      src="../assets/img/setting/setting-eye.png"
                      alt="setting-eye"
                      class="position-absolute"
                      style="left:10px;"
                    />
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      class="home-generalColor bg-transparent me-3"
                    />
                    <span class="home-generalColor me-3">12/24</span>
                    <span class="home-generalColor me-3">12/24</span>
                    <img
                      src="../assets/img/profiles/profile-max-default.png"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  class="ma-auto"
                  style="height: 87px;border: 2px solid #1A1A1A;"
                />
                <div
                  class="flex-row d-sm-flex justify-content-center align-items-center"
                >
                  <button
                    class="global-button bg-greenBackground round-5  text-center text-general-white p-11-46"
                    @click="logout()"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col md="4">
          <v-row class="align-center justify-start no-gutters">
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Captcha</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              />
              <span class="analytics">Captcha API Key</span>
            </div>
          </v-row>
          <div class="captcha-order">
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <CaptchaApi
                  label=""
                  placeholder="2captcha API Key"
                  :init-value="twoCapApiKey"
                  @updated="
                    value => {
                      this.twoCapApiKey = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <CaptchaApi
                  label=""
                  placeholder="AntiCaptcha API Key"
                  :init-value="antiCapApiKey"
                  @updated="
                    value => {
                      this.antiCapApiKey = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <CaptchaApi
                  label=""
                  placeholder="CapMonster"
                  :init-value="capMonsterApiKey"
                  @updated="
                    value => {
                      this.capMonsterApiKey = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <CaptchaApi
                  label=""
                  placeholder="Other Captcha Service"
                  :init-value="otherApiKey"
                  @updated="
                    value => {
                      this.otherApiKey = value.value;
                    }
                  "
                />
              </div>
            </div>
          </div>
          <div class="Discord-Webhooks-header flex-row d-sm-flex mt-3">
            <div class="profiles-profilegroup ">
              <span class="text-general-white" style="display: inline-block;"
                >Settings</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              />
              <span class="analytics">Discord Webhooks</span>
            </div>
          </div>
          <div class="Webhooks-order">
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <InputBoxText
                  label=""
                  placeholder="Decline Webhook"
                  :init-value="errorWebhook"
                  @updated="
                    value => {
                      this.errorWebhook = value.value;
                    }
                  "
                />
                <div
                  class="bg-greenBackground discordTest text-black fw-bold text-general-white pa-2"
                >
                  Test
                </div>
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center"
              >
                <InputBoxText
                  label=""
                  placeholder="Success Webhook"
                  :init-value="successWebhook"
                  @updated="
                    value => {
                      this.successWebhook = value.value;
                    }
                  "
                />
                <div
                  class="bg-greenBackground discordTest text-black fw-bold text-general-white pa-2"
                >
                  Test
                </div>
              </div>
            </div>
          </div>
          <div class="Settings-Delays-header flex-row d-sm-flex mt-3">
            <div class="profiles-profilegroup ">
              <span class="text-general-white" style="display: inline-block;"
                >Settings</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              />
              <span class="analytics">Delays</span>
            </div>
          </div>
          <div class="Settings-Delays-order">
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center p-1"
              >
                <InputBoxText
                  label=""
                  type="number"
                  placeholder="Error Delay"
                  :init-value="errorDelay"
                  @updated="
                    value => {
                      this.errorDelay = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center p-1"
              >
                <InputBoxText
                  label=""
                  type="number"
                  placeholder="Retry Delay"
                  :init-value="retryDelay"
                  @updated="
                    value => {
                      this.retryDelay = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div
              class="justify-content-between round-5 bg-taskBackground w-100 mt-3"
            >
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center p-1"
              >
                <InputBoxText
                  label=""
                  type="number"
                  placeholder="Checkout Delay"
                  :init-value="checkoutDelay"
                  @updated="
                    value => {
                      this.checkoutDelay = value.value;
                    }
                  "
                />
              </div>
            </div>
            <div class="justify-content-between round-5 w-100 mt-3">
              <div
                class="flex-row d-sm-flex  justify-content-between align-middle align-items-center p-1"
              >
                <button
                  class="global-button bg-greenBackground round-5  text-center text-general-white p-11-46"
                  @click="save()"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div v-if="dialog">
        <CreateHarvester
          v-if="dialog"
          v-model="dialog"
          label=""
          class="ProxyDialog"
          @open-dialog="dialog = true"
          @close-dialog="dialog = false"
        />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { ipcRenderer } from 'electron';
import CaptchaApi from '../../renderer/components/inputs/CaptchaApi';
import CreateHarvester from '../../renderer/components/PopUp/CreateHarvester';
import InputBoxText from '../../renderer/components/inputs/InputBoxText';
export default {
  name: 'Settings',
  components: {
    CreateHarvester,
    CaptchaApi,
    InputBoxText,
  },
  middleware: 'auth',
  data() {
    return {
      dialog: false,
      type: 'text',
      twoCapApiKey: '',
      antiCapApiKey: '',
      otherApiKey: '',
      capMonsterApiKey: '',
      successWebhook: '',
      errorWebhook: '',
      errorDelay: 500,
      retryDelay: 500,
      checkoutDelay: 500,
    };
  },
  computed: {
    ...mapState({
      harvesters: state => state.data.harvesters,
      proxyGroups: state => state.data.proxyGroups,
      settingsBg: state => state.data.settings,
    }),
    displayHarvesters() {
      const harvesters = this.harvesters.map(v => {
        const proxyGroup = this.proxyGroups.find(m => m.id === v.proxyGroupId);
        return { ...v, proxyGroup };
      });
      console.log('harvesters==========', harvesters);
      return harvesters;
    },
  },
  watch: {},
  created() {
    console.log('settingsBg===========>', this.settingsBg);
    this.twoCapApiKey = this.settingsBg.twoCapApiKey || '';
    this.antiCapApiKey = this.settingsBg.antiCapApiKey || '';
    this.otherApiKey = this.settingsBg.otherApiKey || '';
    this.capMonsterApiKey = this.settingsBg.capMonsterApiKey || '';
    this.successWebhook = this.settingsBg.successWebhook || '';
    this.errorWebhook = this.settingsBg.errorWebhook || '';
    this.errorDelay = this.settingsBg.errorDelay || 500;
    this.retryDelay = this.settingsBg.retryDelay || 500;
    this.checkoutDelay = this.settingsBg.checkoutDelay || 500;
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    openDialog() {
      console.log('dialog', this.dialog);
      this.dialog = true;
    },
    logout() {
      this.$store.dispatch('data/setIsAuthed', false);
      this.$router.push('/');
    },
    save() {
      const setting = {
        twoCapApiKey: this.twoCapApiKey,
        antiCapApiKey: this.antiCapApiKey,
        otherApiKey: this.otherApiKey,
        capMonsterApiKey: this.capMonsterApiKey,
        successWebhook: this.successWebhook,
        errorWebhook: this.errorWebhook,
        errorDelay: this.errorDelay,
        retryDelay: this.retryDelay,
        checkoutDelay: this.checkoutDelay,
      };
      console.log('setting', setting);
      ipcRenderer.send('save_setting', setting);
    },
    deleteHarvester(id) {
      ipcRenderer.send('delete_harvester', { id });
    },
  },
};
</script>

<style scoped>
.CaptchaContent {
  flex-grow: 2;
  position: relative;
  height: calc(100vh - 253px);
}
.havaster {
  height: 100%;
  overflow-y: scroll;
}
.havaster::-webkit-scrollbar {
  display: none;
}
.discordTest {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.license-setting {
  width: 100%;
  position: absolute;
  top: 100%;
}
.DeleteAllProxies img {
  padding: 9px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.TestProxies img {
  padding: 9px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.bg-proxyDeleteBackground {
  background: #ff35352b;
}

.p-11-46 {
  padding: 11px 46px;
}

.bg-background {
  background: #1f1f1f;
}

.p-12-34 {
  padding: 12px 12px 12px 12px;
}
.discordTest {
  padding: 12px 12px !important;
}
</style>
