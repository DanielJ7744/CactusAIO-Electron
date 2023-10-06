<template>
  <v-dialog :value="value" max-width="500px" @input="close">
    <div class="modal-dialog modal-dialog-centered taskDialog" role="document">
      <v-form ref="form" class="modal-content ProxyContent">
        <div
          class="d-sm-flex flex-row align-middle align-items-center justify-content-between"
        >
          <p class="ModalProfileTitle">Create Tasks</p>
          <p class="bg-greenBg p-2-21 text-general-white round-5 text-green">
            Enter Information
          </p>
        </div>
        <div class="task__part">
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-4"
          >
            <div class="w-50 mr-1">
              <InputBoxSelect
                label="Site"
                :options="site.options"
                :default-selected="site.selectedIndex"
                :rule-array="rules.site"
                @updated="
                  value => {
                    this.site.selectedIndex = value.selectedIndex;
                  }
                "
              />
            </div>
            <div class="w-50">
              <InputBoxSelect
                label="Size"
                :options="size.options"
                :default-selected="size.selectedIndex"
                :rule-array="rules.size"
                @updated="
                  value => {
                    this.size.selectedIndex = value.selectedIndex;
                  }
                "
              />
            </div>
          </div>
          <div
            class="d-sm-flex flex-row align-middle align-items-center  mt-2 ml-auto productInput"
            style="width: 100%;margin: 0 auto;"
          >
            <InputBoxText
              label="Product ( URL / SKU )"
              placeholder="Type here..."
              :init-value="item"
              :rule-array="rules.item"
              @updated="
                value => {
                  this.item = value.value;
                }
              "
            />
          </div>
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
          >
            <div class="w-50 mr-1 profileInput">
              <InputBoxSelect
                label="Profile"
                placeholder="Type here..."
                :options="profile.options"
                :default-selected="profile.selectedIndex"
                :rule-array="rules.profile"
                @updated="
                  value => {
                    this.profile.selectedIndex = value.selectedIndex;
                  }
                "
              />
            </div>
            <div class="w-50 proxyGroup">
              <InputBoxSelect
                label="Proxy Group"
                :options="proxyGroup.options"
                :default-selected="proxyGroup.selectedIndex"
                :rule-array="rules.proxyGroup"
                @updated="
                  value => {
                    this.proxyGroup.selectedIndex = value.selectedIndex;
                  }
                "
              />
            </div>
          </div>
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
          >
            <div class="w-50 mr-1 modeInput">
              <InputBoxSelect
                label="Mode"
                :options="mode.options"
                :default-selected="mode.selectedIndex"
                :rule-array="rules.mode"
                @updated="
                  value => {
                    this.mode.selectedIndex = value.selectedIndex;
                  }
                "
              />
            </div>
            <div class="w-50">
              <InputBoxText
                type="number"
                label="Amount ( 1 )"
                placeholder="Type here..."
                :init-value="amount"
                :rule-array="rules.amount"
                @updated="
                  value => {
                    this.amount = value.value;
                  }
                "
              />
            </div>
          </div>
        </div>
        <div
          class="form-button d-sm-flex flex-row align-items-center align-middle justify-content-end mt-4"
        >
          <button
            class="global-button savetaskBtn bg-high-green p-12-52 home-general"
            @click="save()"
          >
            Save
          </button>
        </div>
      </v-form>
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { ipcRenderer } from 'electron';
import InputBoxSelect from '../../../renderer/components/inputs/InputBoxSelect';
import InputBoxText from '../../../renderer/components/inputs/InputBoxText';
import siteOptions from '../../helpers/sites';
export default {
  name: 'CreateTask',
  components: {
    InputBoxText,
    InputBoxSelect,
  },
  props: {
    value: Boolean,
    taskId: {
      type: String,
      required: false,
      default: '',
    },
    groupId: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      e1: 1,
      site: {
        selectedIndex: -1,
        options: siteOptions,
      },
      size: {
        selectedIndex: -1,
        options: [
          { name: 'XL' },
          { name: 'L' },
          { name: 'M' },
          { name: 'S' },
          { name: 'XS' },
        ],
      },
      profile: {
        selectedIndex: -1,
        options: [],
      },
      proxyGroup: {
        selectedIndex: -1,
        options: [],
      },
      mode: {
        selectedIndex: -1,
        options: [{ name: 'Mode1' }, { name: 'Mode2' }],
      },
      item: '',
      amount: 1,
      rules: {
        item: [v => !!v || '*'],
        site: [v => this.site.selectedIndex > -1 || '*'],
        size: [v => this.size.selectedIndex > -1 || '*'],
        profile: [
          v => this.profile.selectedIndex > -1 || '*',
        ],
        mode: [v => this.mode.selectedIndex > -1 || '*'],
        proxyGroup: [
          v => this.proxyGroup.selectedIndex > -1 || '*',
        ],
      },
    };
  },
  computed: {
    ...mapState({
      profiles: state => state.data.profiles,
      proxyGroups: state => state.data.proxyGroups,
    }),
  },
  created() {
    // this.handleSelect();
    console.log('profiles =========>', this.profiles);
    console.log('proxyGroups =========>', this.proxyGroups);
    this.profile.options = this.profiles.map(v => {
      return { id: v.id, name: v.name };
    });
    this.proxyGroup.options = this.proxyGroups.map(v => {
      return { id: v.id, name: v.name };
    });
  },
  mounted() {
    // this.handleSelect(this.siteList)
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) return;
      if (this.amount === 1) {
        const newTask = {
          site: this.site.options[this.site.selectedIndex]?.name,
          size: this.size.options[this.size.selectedIndex]?.name,
          item: this.item,
          profileId: this.profile.options[this.profile.selectedIndex]?.id,
          proxyGroupId: this.proxyGroup.options[this.proxyGroup.selectedIndex]
            ?.id,
          mode: this.mode.options[this.mode.selectedIndex]?.name,
          groupId: this.groupId,
        };
        ipcRenderer.send('create_task', newTask);
      } else {
        const tasks = [];
        for (let i = 0; i < this.amount; i++) {
          const task = {
            site: this.site.options[this.site.selectedIndex]?.name,
            size: this.size.options[this.size.selectedIndex]?.name,
            item: this.item,
            profileId: this.profile.options[this.profile.selectedIndex]?.id,
            proxyGroupId: this.proxyGroup.options[this.proxyGroup.selectedIndex]
              ?.id,
            mode: this.mode.options[this.mode.selectedIndex]?.name,
            groupId: this.groupId,
          };
          tasks.push(task);
        }
        ipcRenderer.send('create_tasks', tasks);
      }
      this.close();
    },
    close() {
      this.$emit('close-dialog');
    },
    increment() {
      this.items.quan = parseInt(this.items.quan, 10) + 1;
    },
    decrement() {
      this.items.quan = parseInt(this.items.quan, 10) - 1;
    },
  },
};
</script>

<style scoped>
.taskDialog {
  width: 500px;
  height: 300px;
  background: #1f1f1f;
  border-radius: 5px;
  padding: 17px 32px;
}
.selected {
  background-color: #5dbd54;
}
.justify-content-end {
  justify-content: flex-end;
}
.selectedBox {
  width: 25%;
  border-right: 2px solid black;
}

.none-selected {
  margin-right: 0.5rem;
  padding: 1rem;
}

.siteName {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-right: 30%;
}

.nonesiteName {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #787878;
  padding: 1rem;
}

.Active {
  display: flex;
}

.inActive {
  display: none;
}

.justify-center {
  justify-content: center;
}

/*.noneselected {*/
/*  padding-left: 27%;*/

/*}*/
.p-3 {
  padding: 1rem !important;
}

.savetaskBtn {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
}

.mr-1 {
  margin-right: 1rem;
}
.plus {
  margin-right: 0.5rem;
}
.fontIcon {
  position: absolute;
  right: 35px;
  top: 70%;
}
.fontIcon img {
  cursor: pointer;
}
</style>
