<template>
  <v-dialog :value="value" max-width="400px" @input="close">
    <div class="modal-dialog modal-dialog-centered ProxyDialog" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-body">
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between"
          >
            <p class="ModalProfileTitle">Add Proxies</p>
            <p class="bg-greenBg p-2-21 home-generalColor round-5 text-green">
              Enter Proxies
            </p>
          </div>
          <div class="modal-form mt-4">
            <InputProxytextArea
              label=""
              :values="proxiesArr"
              @updated="
                value => {
                  proxiesArr = value.value;
                }
              "
            />
          </div>
          <div class="form-button d-sm-flex flex-row justify-content-end mt-3">
            <button
              id="SaveProxy"
              class="global-button createProxyBtn bg-high-green p-12-52 text-general-white justify-content-end"
              @click="save()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import InputProxytextArea from '../../../renderer/components/inputs/InputProxytextArea'
export default {
  name: 'CreateProxy',
  components: { InputProxytextArea },
  props: {
    value: Boolean,
    groupId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      proxiesArr: [],
      rules: []
    }
  },
  computed: {
    ...mapState({
      proxies: state => state.data.proxies
    })
    // openDialog: {
    //   get() {
    //     return this.dialog;
    //   },
    //   set(value) {
    //     console.log('openDialog', value);
    //     if (!value) {
    //       this.close();
    //     }
    //   },
    // },
  },
  mounted () {},
  methods: {
    save () {
      if (this.proxiesArr.length > 0) {
        const proxies = this.proxiesArr.map(proxy => {
          return {
            proxy,
            groupId: this.groupId
          }
        })
        console.log('proxies', proxies)
        ipcRenderer.send('create_proxies', proxies)
        this.close()
      }
    },
    close () {
      console.log('close')
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
.justify-content-end {
  justify-content: flex-end;
}
.modal-form {
  height: 171px;
}
</style>
