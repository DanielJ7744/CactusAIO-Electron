<template>
  <div>
    <div class="e-nuxt-container" data-app>
      <div id="moveBar" />
      <div class="e-nuxt-content">
        <nav-menu id="nav-menu" />
        <div id="window-content">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiPlay, mdiPause, mdiPencilOutline } from '@mdi/js'
import { ipcRenderer } from 'electron'
import NavMenu from '../components/nav-menu.vue'
// const version = require('electron').remote.app.getVersion()
import { version } from '../../../package'

export default {
  components: {
    NavMenu
  },
  data () {
    return {
      version,
      mdiPlay,
      mdiPause,
      mdiPencilOutline,
      openNotification: false,
      notificationMessage: '',
      isUpdatedDownloaded: null,
      progress: 0
    }
  },
  created () {
    ipcRenderer.on('update_available', () => {
      console.log('default: update_available')
      ipcRenderer.removeAllListeners('update_available')
      this.notificationMessage = 'A new version is available.\n Downloading...'
      this.isUpdatedDownloaded = false
      this.openNotification = true
    })
    ipcRenderer.on('update_downloaded', () => {
      console.log('default: update_downloaded')
      ipcRenderer.removeAllListeners('update_downloaded')
      this.notificationMessage =
        'Update Downloaded. It will be installed on restart. Restart now?'
      this.isUpdatedDownloaded = true
      this.openNotification = true
    })
    ipcRenderer.on('download_progress', progress => {
      this.isUpdatedDownloaded = false
      this.openNotification = true
      this.progress = progress
    })
  },
  methods: {
    close () {
      this.openNotification = false
    },
    restartApp () {
      ipcRenderer.send('restart_app')
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('../assets/fonts/Montserrat/Montserrat-Regular.ttf') format('Truetype');
}
@font-face {
  font-family: 'Montserrat-Bold';
  src: url('../assets/fonts/Montserrat/Montserrat-Bold.ttf') format('Truetype');
}
body {
  -webkit-user-select: none;
  user-select: none;
  overflow: hidden;
  color: white;
  font-family: 'Montserrat', sans-serif;
  /*border-radius: 15px;*/
  background: transparent!important;
}
#window-content{
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #1F1F1F;
}
.w-75 {
  width: 75% !important;
}
.e-nuxt-content {
  display: flex;
  height: 100vh;
}

#window-content {
  min-width: 600px;
  width: 100%;
}
#moveBar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  -webkit-app-region: drag;
}
#moveBar span {
  display: flex;
  justify-content: flex-end;
  margin: 20px 29px 0 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: white;
}
.homeAnayltics{
  align-content: center;
  display: flex;
}
.analytics {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #787878;
}
.main {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons-container {
  display: flex;
  width: 100%;
  padding: 10px 20px;
  justify-content: space-between;
}

.hidden {
  display: none;
}
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
.round-5 {
  border-radius: 5px;
}
.me-1 {
  margin-right: 0.1rem !important;
}

.me-3 {
  margin-right: 0.75rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}
.mr-31 {
  margin-right: 31%;
}
.bg-taskHeaderBackground {
  background: #303030;
}
.active-bg-green {
  background: linear-gradient(111deg, transparent 8em, #5dbd54 1em),
    linear-gradient(to top, #77d46e 20%, #77d46e 20%);
}

.fw-bold {
  font-weight: bold !important;
}
.cursor-pointer {
  cursor: pointer;
}
.w-100 {
  width: 100% !important;
}
.w-25 {
  width: 25% !important;
}
.w-40{
  width: 40% !important;
}
.w-35{
  width: 35% !important;
}
.w-50 {
  width: 50% !important;
}
.h-50 {
  height: 50% !important;
}
.bg-greenBackground {
  background: #5dbd54 !important;
}
.home-bgbackground-gray {
  background: #262626;
  border-radius: 5px;
}

.home-bgbackground-white {
  background: #fff;
  border-radius: 5px;
}
.text-red {
  color: #ff3535 !important;
}
.text-gray {
  color: #787878 !important;
}
.text-blue {
  color: #4892ff !important;
}

.text-black {
  color: #151a30 !important;
}
.round-3 {
  border-radius: 3px;
}
.border-right-green {
  border-right: 4px solid #5dbd54;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.border-left-green {
  border-left: 4px solid #5dbd54;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
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
.text-general-green {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.563rem;
  font-style: normal;
  font-weight: 600;
  line-height: 11px;
  letter-spacing: 0em;
  color: #5dbd54;
}
.v-tabs__bar {
  display: none;
}
.v-tab:not(.v-tab--active) {
  color: #787878 !important;
}
.v-input {
  height: 35px;
  color: #787878 !important;
}
.v-input input {
  color: #787878 !important;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  max-height: 20px;
}
.v-input input::placeholder {
  color: #787878 !important;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
}
.v-input__control {
  min-height: 34px !important;
}
.v-icon.v-icon {
  font-size: 16px !important;
  color: #fff !important;
}
.v-slide-group__prev {
  display: none !important;
}
.v-tabs-slider {
  width: 60% !important;
  margin: 0 auto !important;
}
.v-tabs-bar {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}
#line-chart {
  height: 165px;
  background: #262626;
  width: 100% !important;
  border-radius: 5px;
}
.v-window__container,
.v-tabs-items {
  background: #262626;
}
.v-item-group{
  width: 100% !important;
}
.theme--light.v-tabs-items {
  background-color: #262626;
}
img {
  cursor: pointer;
}
button {
  outline: none;
}
.checkDialog {
  height: 250px;
  padding: 20px;
  border-radius: 5px;
  background: #262626;
}
.ReadDialog {
  height: 250px;
  padding: 20px;
  border-radius: 5px;
  background: #262626;
}
.bg-background {
  background: #1f1f1f;
}
.mt-1 {
  margin-top: 5px !important;
}
.mt-2 {
  margin-top: 0.5rem !important;
}
.mt-4 {
  margin-top: 1rem !important;
}
.p-2-21 {
  padding: 2px 21px;
}
.CreateDialog {
  border-radius: 5px;
  background: #1f1f1f;
  height: 520px;
  padding: 22px 29px;
}
.v-select__selections,
.v-list-item__title {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #787878;
}
.v-list-item {
  min-height: 33px !important;
}
.v-select__selection--comma {
  color: #787878;
}
.ProxyDialog {
  height: 286px;
  background: #262626;
  border-radius: 5px;
  padding: 17px 32px;
}
.bg-high-green {
  background: #77d46e;
  border-radius: 5px;
  padding: 12px 52px;
}
.v-textarea.v-text-field--solo {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
}
.v-input__slot {
  padding-left: 12px;
  padding-right: 0 !important;
}
.v-textarea.v-text-field--solo::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  width: 1px;
  color: red;
}
.v-textarea.v-text-field--solo::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
.v-stepper__content,
.v-stepper__items,
.v-stepper {
  background: #1e1e1e !important;
  border-radius: 5px;
}
.ModalProfileTitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
}
.eye .v-input__append-inner {
  background: #5dbd54 !important;
  padding: 5px;
}

.custom-amount-input-text-container >>> input[type='number'] {
  -moz-appearance: textfield;
}
.custom-amount-input-text-container >>> input::-webkit-outer-spin-button,
.custom-amount-input-text-container >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.theme--light.v-text-field:not(.v-input--has-state):hover
  > .v-input__control
  > .v-input__slot:before {
  border-color: white !important;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: white !important;
}
.v-text-field > .v-input__control {
  position: relative;
}
.v-text-field > .v-input__control .v-text-field__details {
  position: absolute;
  top: 8px;
  left: 30px;
}
.productInput label{
  color: #FFFFFF!important;
}
.productInput .v-text-field__details {
  position: absolute;
  top: 8px;
  left: 117px!important;
}
.profileInput .v-text-field__details {
  position: absolute;
  top: 8px;
  left: 45px!important;
}
.modeInput .v-text-field__details {
  position: absolute;
  top: 8px;
  left: 45px!important;
}
.proxyGroup .v-text-field__details {
  position: absolute;
  top: 8px;
  left: 78px!important;
}
.HavesterName label,
.createProfileName label,
.ProfileEmail label,
.ProfilefName label,
.ProfilelName label,
.ProfileAddress label,
.ProfileCity label,
.profile__part label{
  color: #FFFFFF!important;
}

.HavesterName .v-text-field__details{
  left: 87px!important;
}
.SolverType .v-text-field__details{
  left: 70px!important;
}.createProfileName .v-text-field__details{
  left: 70px!important;
}.ProfileEmail .v-text-field__details{
  left: 38px!important;
}.ProfilefName .v-text-field__details{
  left: 63px!important;
}.ProfilelName .v-text-field__details{
  left: 63px!important;
}.ProfileAddress .v-text-field__details{
  left: 74px!important;
}.ProfileCity .v-text-field__details{
  left: 29px!important;
}.ProfileZip .v-text-field__details{
  left: 70px!important;
}.ProfileCountry .v-text-field__details{
  left: 48px!important;
}.ProfileState .v-text-field__details{
  left: 35px!important;
}.ProfileCard .v-text-field__details{
  left: 77px!important;
}.ProfilePhone .v-text-field__details{
  left: 80px!important;
}.ProfileCardNumber .v-text-field__details{
  left: 102px!important;
}.ProfileDate .v-text-field__details{
  left: 57px!important;
}.ProfileCVV .v-text-field__details{
  left: 32px!important;
}
.v-text-field > .v-input__control .v-text-field__details .error--text {
  color: red;
  font-size: 14px;
}
.v-select__slot .v-label{
  color: #FFFFFF!important;
}

.v-input__slot:before {
  border-color: white !important;
}
.global-input input {
  color: white !important;
}
.global-input input::placeholder {
  color: white !important;
  padding-left: 60px;
}
.v-input .v-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0em;
  text-align: left;
  color: #787878;
}
.bg-background-color {
  background: #262626;
}
.v-menu__content::-webkit-scrollbar{
display: block!important;
  width: 2px!important;
  height: 4px!important;
}
.v-menu__content::-webkit-scrollbar-thumb{
  width: 4px!important;
  background: #1F1F1F !important;
  height: 4px!important;

}
.v-menu__content::-webkit-scrollbar-track{
  background: #787878 !important;
  width: 4px!important;

}
.v-window{
  width: 100%;
}
.v-label{
  top: calc(50% - 7px) !important;

}
.v-text-field input{
  padding: 8px 5px 8px 0!important;

}
@media (min-width: 1440px){
  #line-chart {
    height: 30vh!important;
    background: #262626;
    width: 100% !important;
    border-radius: 5px;
  }
  .nikeText {
    margin-top: 19px!important;
  }
  .message0{
    max-height: 194px!important;
  }
  .product-order{
    max-height: 646px!important;
  }
}
</style>
