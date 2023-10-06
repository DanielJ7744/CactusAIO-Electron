<template>
  <div>
    <div class="e-nuxt-container" data-app>
      <div class="e-nuxt-content">
        <div />
        <div id="window-content">
          <div id="moveBar">
            <span>CactusAIO</span>
          </div>
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { version } from '../../../package'
// const version = require('electron').remote.app.getVersion()
import NavMenu from '../components/nav-menu.vue'

export default {
  components: {
    NavMenu
  },
  data () {
    return { version }
  }
}
</script>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('../assets/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Montserrat-Bold';
  src: url('../assets/fonts/Montserrat/Montserrat-Bold.ttf') format('truetype');
}
body {
  -webkit-user-select: none;
  user-select: none;
  overflow: hidden;
  color: white;
  font-family: 'Montserrat', sans-serif;
  /*border-radius: 15px;*/
}

body::-webkit-scrollbar {
  display: none;
}

.drag-area {
  width: 100%;
  height: 48px;
  -webkit-app-region: drag;
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

</style>
