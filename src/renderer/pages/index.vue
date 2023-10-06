<template>
  <div id="root">
    <div class="action-btn" />

    <div class="connection-part row">
      <div class="col-6">
        <div class="welcomeText">Welcome to CactusAIO !</div>
        <div class="connection">
          <img
            src="../assets/img/logo/weclomeLogo.png"
            alt=""
            class="welcomeLogo"
          />
          <div class="text">
            <div class="text1">
              <span>1</span>
              Enter your license key to continue
            </div>
            <div
              id="license"
              class="license"
              :class="isAuth ? 'error' : 'pass'"
            >
              <InputLoginBox
                :init-value="key"
                @updated="
                  value => {
                    this.key = value.value;
                  }
                "
              />
            </div>
            <div id="loading" :class="isAuth ? 'pass' : 'error'">
              <span>
                Key verified
              </span>
            </div>
            <div id="loading_error" :class="isAuth ? 'pass' : 'error'">
              <span id="license_error_reason" />
            </div>
          </div>
          <div
            class="login"
            :class="isAuth ? 'clickedLogin' : ''"
            @click="login()"
          >
            <button
              id="login-btn"
              type="button"
              class=""
              :class="isAuth ? 'error' : 'pass'"
            >
              Login
            </button>
            <button
              id=""
              type="button"
              class=""
              :class="isAuth ? 'pass' : 'error'"
            >
              Please Wait
            </button>
            <img
              src="../assets/img/login-part/button-arrow.gif"
              alt="login-arrow"
              :class="isAuth ? 'error' : 'pass'"
              width="25px"
              height="25px"
            />
          </div>
          <input id="machine_fingerprint" type="hidden" value="" />
        </div>
      </div>
      <div class="col-6 right-part">
        <span>Need help ? Contact us</span>
        <a href="">here</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron';
import { mapState } from 'vuex';
import InputBoxText from '../components/inputs/InputBoxText';
import InputLoginBox from '../components/inputs/InputLoginBox';

export default {
  name: 'Index',
  layout: 'clear',
  // eslint-disable-next-line vue/no-unused-components
  components: { InputLoginBox, InputBoxText },
  data() {
    return {
      key: '',
      error: null,
      isAuth: false,
      setInterval: null,
    };
  },
  computed: {
    ...mapState({
      isAuthed: state => state.data.isAuthed,
    }),
  },
  watch: {
    isAuthed(newVal, val) {
      if (newVal) {
        ipcRenderer.send('was authed');
        this.$router.push('/dashboard');
      }
    },
  },
  mounted() {
    console.log('index:store isAuthed', this.isAuthed);
    // Login
    this.$store.dispatch('data/setIsAuthed', true);
  },
  destroyed() {
    clearInterval(this.setInterval);
  },
  methods: {
    login() {
      const authed = ipcRenderer.sendSync('auth', { key: this.key });
      setTimeout(() => {
        this.$store.dispatch('data/setIsAuthed', authed);
      }, 1500);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Montserrat';
  src: url('../assets/fonts/Montserrat/Montserrat-Regular.ttf')
    format('truetype');
}
@font-face {
  font-family: 'Montserrat-Bold';
  src: url('../assets/fonts/Montserrat/Montserrat-Bold.ttf') format('truetype');
}

body {
  display: flex;
  overflow: hidden;
}

#root {
  display: flex;
  border-radius: 15px;
}
.connection-part {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100vw !important;
  margin: 0;
  padding: 0;
  border-radius: 15px;
  background: #1f1f1f;
}
.connection-part .welcomeText {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-top: 21px;
  margin-left: 81px;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  color: #ffffff;
  opacity: 0.6;
}
.connection {
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #5dbd54;
  box-shadow: 0px 4px 18px rgb(0 0 0 / 13%);
  border-radius: 10px;
  padding: 45px 40px 34px 40px;
  position: relative;
  width: 281px;
  left: 81px;
}
.connection-part .connection .text {
  color: white;
  transition-duration: 0.5s;
  font-size: 10px;
  font-family: Montserrat-Bold;
}
.welcomeLogo {
  position: absolute;
  bottom: 91%;
  right: -30px;
}
.login {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: white;
  border-radius: 7px;
  margin-top: 96px;
  padding: 12px 63px;
  cursor: pointer;
}
body #root .connection-part .connection .login button {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #000000;
  background: transparent;
  outline: none;
  border: none;
}

.connection .text .text1 {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin: 2px 0 70px 0;
}
.text1 span {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  background: #1f1f1f;
  border-radius: 28px;
  width: 1rem;
  height: 1rem;
  margin-right: 6px;
}
body #root .connection-part .connection .text .license input {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
  border-bottom: 3px solid white;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  background: transparent;
  padding: 7px;
  justify-content: center;
  text-align: center;
  width: 100%;
}
.right-part {
  background: url(../assets/img/login-part/right-part.svg) no-repeat;
  background-size: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
.right-part span {
  color: white;
  position: absolute;
  bottom: 48px;
  right: 26%;
}
.right-part a {
  color: #5dbd54;
  position: absolute;
  bottom: 48px;
  right: 22%;
  text-decoration: none;
}
#loading {
  /* Key verified */

  background: url('.././assets/img/login-part/verify.gif') no-repeat center;
  background-size: 25%;
  height: 98px;
  margin-top: -31px;
}
.pass {
  display: block;
}
.error {
  display: none !important;
}
.clickedLogin {
  margin-top: 46px !important;
}
</style>
