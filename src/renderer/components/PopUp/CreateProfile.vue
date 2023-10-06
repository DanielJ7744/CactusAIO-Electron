<template>
  <v-dialog :value="value" max-width="400px" @input="close">
    <div
      class="modal-dialog modal-dialog-centered CreateDialog"
      role="document"
    >
      <!-- Modal content-->
      <!-- <v-btn icon dark @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
      <div class="modal-content">
        <div class="modal-body">
          <!--                    <button class="close global-button" data-dismiss="modal">&times;</button>-->
          <div
            class="d-sm-flex flex-row align-middle align-items-center justify-content-between"
          >
            <p class="ModalProfileTitle">
              {{ profileId ? 'Edit Profile' : 'Create Profile' }}
            </p>
            <p class="bg-greenBg pa-1 text-general-white round-5 text-green">
              Enter Information
            </p>
          </div>
          <v-form ref="form" class="modal-form">
            <div class="profile__part">
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-4"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="Profile Name"
                    placeholder="Type here.."
                    :init-value="name"
                    :rule-array="rules.name"
                    class="createProfileName"
                    @updated="
                      value => {
                        name = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxText
                    label="Email"
                    placeholder="Type here.."
                    :init-value="email"
                    :rule-array="rules.email"
                    class="ProfileEmail"
                    @updated="
                      value => {
                        email = value.value;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="First Name"
                    placeholder="Type here.."
                    :init-value="firstName"
                    :rule-array="rules.firstName"
                    class="ProfilefName"
                    @updated="
                      value => {
                        firstName = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxText
                    label="Last Name"
                    placeholder="Type here.."
                    :init-value="lastName"
                    :rule-array="rules.lastName"
                    class="ProfilelName"
                    @updated="
                      value => {
                        lastName = value.value;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center  mt-2 ml-auto"
                style="width: 100%;margin: 0 auto;"
              >
                <InputBoxText
                  label="Adress Line 1"
                  placeholder="Type here.."
                  :init-value="addressLine1"
                  :rule-array="rules.addressLine1"
                  class="ProfileAddress"
                  @updated="
                    value => {
                      addressLine1 = value.value;
                    }
                  "
                />
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2 "
              >
                <InputBoxText
                  label="Adress Line 2 (optional)"
                  placeholder="Type here..."
                  :init-value="addressLine2"
                  :rule-array="rules.addressLine2"
                  @updated="
                    value => {
                      addressLine2 = value.value;
                    }
                  "
                />
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="City"
                    placeholder="Type here.."
                    :init-value="city"
                    :rule-array="rules.city"
                    class="ProfileCity"
                    @updated="
                      value => {
                        city = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxText
                    label="Postal Code"
                    placeholder="Type here.."
                    :init-value="postCode"
                    :rule-array="rules.postCode"
                    class="ProfileZip"
                    @updated="
                      value => {
                        postCode = value.value;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="Country"
                    placeholder="Type here.."
                    :init-value="country"
                    :rule-array="rules.country"
                    class="ProfileCountry"
                    @updated="
                      value => {
                        country = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <!--                  <InputBoxSelect label="State" :options="country" />-->
                  <InputBoxText
                    label="State"
                    placeholder="Type here.."
                    :init-value="state"
                    :rule-array="rules.state"
                    class="ProfileState"
                    @updated="
                      value => {
                        state = value.value;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="Name on Card"
                    placeholder="Type here.."
                    :init-value="holdName"
                    :rule-array="rules.holdName"
                    class="ProfileCard"
                    @updated="
                      value => {
                        holdName = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxText
                    label="Phone Number"
                    placeholder="Type here.."
                    :init-value="phone"
                    :rule-array="rules.phone"
                    class="ProfilePhone"
                    @updated="
                      value => {
                        phone = value.value;
                      }
                    "
                  />
                </div>
              </div>
              <div
                class="card-container d-sm-flex flex-row align-middle align-items-center justify-content-between bg-background round-5 mt-2 ml-auto"
              >
                <InputBoxText
                  label="Credit Card Number"
                  placeholder="Type here.."
                  :init-value="card"
                  :rule-array="rules.card"
                  class="ProfileCardNumber"
                  @updated="
                    value => {
                      card = value.value;
                    }
                  "
                />
                <img
                  src="../../assets/img/profiles/profile-max-default.png"
                  alt=""
                  class="me-2 position-absolute max-default"
                />
              </div>
              <div
                class="d-sm-flex flex-row align-middle align-items-center justify-content-between mt-2"
              >
                <div class="w-50 mr-1">
                  <InputBoxText
                    label="Exp.Date"
                    placeholder="Exp.Date"
                    :init-value="expirationDate"
                    :rule-array="rules.expirationDate"
                    class="ProfileDate"
                    @updated="
                      value => {
                        expirationDate = value.value;
                      }
                    "
                  />
                </div>
                <div class="w-50">
                  <InputBoxText
                    label="CVV"
                    placeholder="CVV"
                    :init-value="cvv"
                    :rule-array="rules.cvv"
                    class="ProfileCVV"
                    @updated="
                      value => {
                        cvv = value.value;
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
                id="EditTask"
                class="global-button createProfileBtn bg-high-green p-12-52"
                data-tasktype="profile"
                @click="save"
              >
                {{ profileId ? 'Save' : 'Create' }}
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { ipcRenderer } from 'electron';
import valid from 'card-validator';
import { mapState } from 'vuex';
import InputBoxText from '../../../renderer/components/inputs/InputBoxText';
import InputBoxSelect from '../../../renderer/components/inputs/InputBoxSelect';

export default {
  name: 'CreateProfile',
  components: { InputBoxSelect, InputBoxText },
  props: {
    value: Boolean,
    profileId: {
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
      // eslint-disable-next-line max-len
      name: 'Profile0',
      email: 'test0101@gmail.com',
      firstName: 'tom',
      lastName: 'large',
      addressLine1: 'Rue du bois rosalie',
      addressLine2: '',
      city: 'Paris',
      postCode: '75000',
      country: 'France',
      state: '259',
      holdName: 'tom large',
      phone: '07832412534',
      card: '424242424242',
      expirationDate: '2025/04',
      cvv: '444',
      rules: {
        name: [v => !!v || '*'],
        email: [
          v => !!v || '*',
          v =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v,
            ) || '*',
        ],
        firstName: [v => !!v || '*'],
        lastName: [v => !!v || '*'],
        addressLine1: [v => !!v || '*'],
        addressLine2: [],
        city: [v => !!v || '*'],
        postCode: [
          v => !!v || '*',
          // v => v.length <= 7 || 'Length should be less than 7',
          // v => /^[0-9]*$/.test(v) || 'Only numbers are allowed',
          v => v.length <= 7 || '*',
          v => /^[0-9]*$/.test(v) || '*',
        ],
        state: [v => !!v || '*'],
        country: [v => !!v || '*'],
        phone: [
          v => !!v || '*',
          v =>
            /^([0-9]{3})([0-9]{4})([0-9]{4})$/.test(v) ||
            '*',
        ],
        holdName: [v => !!v || '*'],
        card: [
          v => !!v || '*',
          v => valid.number(v).isPotentiallyValid || '*',
        ],
        expirationDate: [
          v => !!v || '*',
          v => /^[0-9]{4}\/[0-9]{2}$/.test(v) || '*',
        ],
        cvv: [
          v => !!v || '*',
          v => /^[0-9]{3,4}$/.test(v) || '*',
        ],
      },
    };
  },
  watch: {},
  computed: {
    ...mapState({
      profiles: state => state.data.profiles,
    }),
    openDialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        if (!value) {
          this.close();
        }
      },
    },
  },
  mounted() {
    const profile = this.profiles.find(v => v.id === this.profileId);
    if (profile) {
      this.name = profile.name;
      this.email = profile.email;
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.adressLine1 = profile.adressLine1;
      this.addressLine2 = profile.addressLine2;
      this.city = profile.city;
      this.postCode = profile.postCode;
      this.country = profile.country;
      this.state = profile.state;
      this.holdName = profile.holdName;
      this.phone = profile.phone;
      this.card = profile.card;
      this.expirationDate = profile.expirationDate;
      this.groupId = profile.groupId;
    }
  },
  methods: {
    onUpdate(event) {
      this.$emit('updated', { value: this.value });
    },
    enabledChangeCallback() {
      this.enabled = this.$props.setenabled;
    },
    close() {
      this.$emit('closeDialog');
    },
    save() {
      if (!this.$refs.form.validate()) return;
      if (this.profileId) {
        const profile = {
          id: this.profileId,
          name: this.name,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          adressLine1: this.adressLine1,
          addressLine2: this.addressLine2,
          city: this.city,
          postCode: this.postCode,
          country: this.country,
          state: this.state,
          holdName: this.holdName,
          phone: this.phone,
          card: this.card,
          expirationDate: this.expirationDate,
          groupId: this.groupId,
        };
        ipcRenderer.send('update_profile', profile);
      } else {
        const newProfile = {
          name: this.name,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          adressLine1: this.adressLine1,
          addressLine2: this.addressLine2,
          city: this.city,
          postCode: this.postCode,
          country: this.country,
          state: this.state,
          holdName: this.holdName,
          phone: this.phone,
          card: this.card,
          expirationDate: this.expirationDate,
          groupId: this.groupId,
        };
        ipcRenderer.send('create_profile', newProfile);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.pa-1 {
  padding: 2px 9px;
}

.mr-1 {
  margin-right: 1rem;
}

.max-default {
  position: absolute;
  right: 20px;
}
.card-container {
  position: relative;
}

.justify-content-end {
  justify-content: flex-end;
}

.createProfileBtn {
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
}

.custom-input-text-container {
  width: 100%;
}
</style>
