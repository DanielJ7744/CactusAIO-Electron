<template>
  <v-dialog :value="value" max-width="400px" @input="close">
    <div
      class="modal-dialog modal-dialog-centered harveterDialog"
      role="document"
    >
      <!-- Modal content-->
      <div class="modal-content ProxyContent">
        <div class="modal-body">
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between"
          >
            <p class="ModalProfileTitle">Create Harvester</p>
            <p class="bg-greenBg p-2-21 home-generalColor round-5 text-green">
              Enter Information
            </p>
          </div>
          <v-form ref="form" class="modal-form">
            <div class="form-Mode">
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-4"
              >
                <InputBoxText
                  label="Havester name"
                  placeholder="Type here..."
                  :init-value="name"
                  :rule-array="rules.name"
                  class="HavesterName"
                  @updated="
                    value => {
                      this.name = value.value;
                    }
                  "
                />
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-4"
              >
                <div class="w-50 mr-1">
                  <InputBoxSelect
                    label="Site"
                    :options="site.options"
                    :default-selected="site.selectedIndex"
                    :rule-array="rules.site"
                    class="SiteOption"
                    @updated="
                      value => {
                        this.site.selectedIndex = value.selectedIndex;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxSelect
                    label="Solver Type"
                    :options="solver.options"
                    :default-selected="solver.selectedIndex"
                    :rule-array="rules.solver"
                    class="SolverType"
                    @updated="
                      value => {
                        this.solver.selectedIndex = value.selectedIndex;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-4"
              >
                <InputBoxSelect
                  label="Proxy (set to localhost)"
                  :options="proxyGroup.options"
                  :default-selected="proxyGroup.selectedIndex"
                  :rule-array="proxyGroup.site"
                  class="proxyType"
                  @updated="
                    value => {
                      this.proxyGroup.selectedIndex = value.selectedIndex;
                    }
                  "
                />
              </div>

              <div class="form-button d-sm-flex flex-row justify-end mt-4">
                <button
                  id="CreateAccount"
                  class="global-button createHarbesterBtn bg-high-green p-12-52 text-general-white justify-end cursor-pointer"
                  @click="save"
                >
                  Create
                </button>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import InputBoxSelect from '../inputs/InputBoxSelect'
import InputBoxText from '../inputs/InputBoxText'
import siteOptions from '../../helpers/sites'
export default {
  name: 'CreateHarvester',
  components: { InputBoxSelect, InputBoxText },
  props: {
    value: Boolean,
    profileId: {
      type: String,
      required: false,
      default: ''
    },
    groupId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      name: '',
      site: {
        selectedIndex: -1,
        options: siteOptions
      },
      solver: {
        selectedIndex: -1,
        options: [
          { name: '2cap service' },
          { name: 'Anticap service' },
          { name: 'CapMonster service' },
          { name: 'Other service' }
        ]
      },
      proxyGroup: {
        selectedIndex: -1,
        options: []
      },
      rules: {
        name: [v => !!v || '*'],
        site: [v => this.site.selectedIndex > -1 || '*'],
        solver: [v => this.solver.selectedIndex > -1 || '*'],
        proxyGroup: [
          v => this.proxyGroup.selectedIndex > -1 || '*'
        ]
      }
    }
  },
  created () {
    this.proxyGroup.options = this.proxyGroups
  },
  computed: {
    ...mapState({
      proxyGroups: state => state.data.proxyGroups
    }),
    openDialog: {
      get () {
        return this.dialog
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  methods: {
    save () {
      if (!this.$refs.form.validate()) return
      const harveter = {
        name: this.name,
        site: this.site.options[this.site.selectedIndex]?.name,
        solver: this.solver.options[this.solver.selectedIndex]?.name,
        proxyGroupId: this.proxyGroup.options[this.proxyGroup.selectedIndex]
          ?.id
      }
      ipcRenderer.send('create_harvester', harveter)
      this.close()
    },
    close () {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
.harveterDialog {
  width: 400px;
  height: 300px;
  background: #1f1f1f;
  border-radius: 5px;
  padding: 17px 32px;
}

.createHarbesterBtn {
  cursor: pointer;
}
.mr-1 {
  margin-right: 1rem;
}
.justify-end {
  justify-content: flex-end;
}
</style>
