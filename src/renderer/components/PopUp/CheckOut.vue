<template>
  <v-dialog
    :value="dialog"
    max-width="300px"
    max-height="250px"
    persistent
  >
    <div class="modal-dialog modal-dialog-centered justify-content-center checkDialog pa-6" role="document">
      <!-- Modal content-->
      <div class="modal-content pa-6">
        <div class="modal-body">
          <div class="modal-form">
            <div class="d-sm-flex flex-row justify-content-between align-items-center align-middle">
              <div class="d-block">
                <div class="text-general-white">Nike SB Dunk Low Pro Blue Fury</div>
                <div class="home-generalColor mt-1">JD Sports DE</div>
                <div class="bg-greenBg justify-content-start text-general-white round-5 text-green p-1 w-25 mt-1">
                  - 180€
                </div>
              </div>
              <div class="d-sm-flex flex-row justify-content-between align-items-center align-middle">
                <img src="../../assets/img/dashboard/modal/shoe.png" alt="shoe"
                     class="shoe bg-transparent"
                >
              </div>
            </div>
            <div class="d-sm-flex flex-row align-items-center justify-content-between align-middle bg-background round-5 p-12-34  position-relative mt-4">
              <Inputcheckout />
              <img src="../../assets/img/dashboard/modal/edit.png" alt="" draggable="false" class="editIcon">
            </div>
            <div class="d-sm-flex flex-row justify-content-between align-items-center align-middle mt-4">
              <div class="home-generalColor orderNumber">Order#0001</div>
            </div>
            <div class="d-sm-flex flex-row justify-content-between align-items-center align-middle mt-4">
              <div class="d-block">
                <div class="text-general-white text-green">Placed</div>
                <div class="d-sm-flex flex-row justify-content-center align-middle align-items-center mt-2 ">
                  <span class="placedCircle bg-small-green" />
                  <div class="placedState bg-small-green" />
                </div>
              </div>
              <div class="d-block">
                <div class="text-general-white text-green">Shipped</div>
                <div class="d-sm-flex flex-row justify-content-center align-middle align-items-center mt-2">
                  <span class="placedCircle bg-small-green " />
                  <div class="ShippedState bg-background" />
                </div>
              </div>
              <div class="d-block">
                <div class="home-generalColor">Arrived</div>
                <div class="d-sm-flex flex-row justify-content-center align-middle align-items-center mt-2">
                  <span class="placedCircle bg-background" />
                </div>
              </div>
            </div>
            <div class="form-button justify-content-center d-sm-flex flex-row justify-content-center mt-4">
              <button id="modalTrackOrder"
                      class="global-button createTrackOrder bg-background text-general-white text-green p-12-40 round-5"
                      @click="close"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Inputcheckout from '../../../renderer/components/inputs/Inputcheckout'
export default {
  name: 'CheckOut',
  components: { Inputcheckout },
  props: {
    dialog: Boolean
  },
  methods: {
    close () {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
.editIcon{
  position: absolute;
  right: 39%;
}

.placedCircle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.bg-small-green {
  background: #93DF8B;
}
.placedState, .ShippedState {
  width: 83px;
  height: 2px;
}
.bg-background {
  background: #1F1F1F;
}
.p-12-40 {
  padding: 12px 40px;
}
</style>
