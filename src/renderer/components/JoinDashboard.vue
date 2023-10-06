<template>
  <div class="nikeDunk w-100 mt-3 flex-row d-sm-flex">
    <div class="bg-greenBackground round-5    position-relative"
         style="width: 33%;margin-right: 10px; padding: 12px 12px 0 12px"
    >
      <p class="flex-row d-sm-flex justify-content-center align-middle align-items-center nikeText text-general-white ">
        Nike Sb Dunk Low
      </p>
      <p class="flex-row d-sm-flex justify-content-center align-middle align-items-center droppingToday">
        Dropping Today !
      </p>
      <div class="flex-row d-sm-flex justify-content-center align-middle align-items-center">
        <img src="../assets/img/dashboard/main/mainLogo.png" alt="">
      </div>
      <button
        class="flex-row d-sm-flex justify-content-center align-middle align-items-center global-button w-75 v-btn--absolute joinDiscord text-general-white"
      >
        Join Discord
      </button>
    </div>
    <div class="home-bgbackground-gray w-75 welcomeBackDashboard">
      <div class="flex-row d-sm-flex  align-middle align-items-center text-general-white justify-space-between">
        <div class="text-general-white d-block">
          <div class="w-100">Welcome back,</div>
          <span id="loggedInUser" class="loggedInUser">ResellDon</span>
        </div>
        <p class="Dashbord text-general-white  justify-content-end">Dashboard</p>
      </div>
      <div class="message0">
        <div class="flex-row d-sm-flex  align-middle align-items-center mt-2 bottom-border border-color-welcome py-2">
          <div class="totalMessage home-generalColor text-green round-5 me-2">{{ message.length }}</div>
          <div class="home-generalColor ">new Messages</div>
          <div
            class="text-general-white ReadAll text-green cursor-pointer ml-auto"
            @click="ReadAll()"
          >
            Read All
          </div>
        </div>
        <div v-for="item in message" :key="item.id"
             class="flex-row d-sm-flex  align-middle align-items-center mt-2 bottom-border border-color-welcome py-1"
        >
          <img class="announcement me-2" :src="item.content.icon"
               alt="announcement"
          >
          <div class="home-generalColor ">{{ item.content.type }}</div>
          <div class="text-general-white Read text-green cursor-pointer ml-auto"
               @click="ReadAll()"
          >
            {{ item.status }}
          </div>
        </div>
      </div>
    </div>
    <ReadAll :dialog.sync="IsOpen" class="checkDialog"
             @open-dialog="
               IsOpen = true;
             "
             @close-dialog="
               IsOpen = false;
             "
    />
  </div>
</template>

<script>
import ReadAll from '../../renderer/components/PopUp/ReadAll'
export default {
  name: 'JoinDashboard',
  components: { ReadAll },
  data () {
    return {
      message: [
        {
          id: 1,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/annunce.png')
          },
          status: 'Read'
        },
        {
          id: 2,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/dropInfo.png')
          },
          status: 'Read'
        },
        {
          id: 3,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/annunce.png')
          },
          status: 'Read'
        },
        {
          id: 4,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/annunce.png')
          },
          status: 'Read'
        },
        {
          id: 5,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/annunce.png')
          },
          status: 'Read'
        },
        {
          id: 6,
          content: {
            type: 'Announcement',
            icon: require('../assets/img/dashboard/main/annunce.png')
          },
          status: 'Read'
        }
      ],
      IsOpen: false,
      isopen: false
    }
  },

  methods: {
    ReadAll () {
      this.IsOpen = true
      console.log('readall')
    },
    Read () {
      this.isopen = true
    }
  }
}
</script>

<style scoped>
.droppingToday {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}
.totalMessage {
  background: #92BDFF2E;
  margin-right: 10px;
  padding: 2px 7px;
}
.position-relative {
  position: relative;
}
.Dashbord {
  color: #4892FF !important;
  margin-left: auto;
  font-weight: bold;
}
.joinDiscord {
  background: #262626;
  left: 13%;
  top: 80%;
  padding: 9px 0;
  font-weight: 700;
  border-radius: 5px;

}

.message0 {
  height: 100%;
  max-height: 127px;
  overflow-y: scroll;
}

.message0::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.welcomeBackDashboard {
  padding: 17px 31px;
}
</style>
