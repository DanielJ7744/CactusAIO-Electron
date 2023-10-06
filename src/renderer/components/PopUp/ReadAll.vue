<template>
  <v-dialog
    :value="dialog"
    max-width="300px"
    max-height="250px"
    persistent
  >
    <div class="modal-dialog modal-dialog-centered justify-content-center ReadDialog pa-6" role="document">
      <!-- Modal content-->
      <div class="modal-content ReadContent">
        <div class="modal-body">
          <div class="d-sm-flex flex-row align-middle align-items-center justify-content-between">
            <div class="d-block w-100">
              <div class="ModalProfileTitle">Announcement</div>
              <div class="home-generalColor byLoggedIn mt-1">by Dev#0001</div>
            </div>
            <p class="bg-greenBg p-2-21 text-general-white round-5 text-green">Important</p>
          </div>
          <div class="modal-form">
            <div class="d-sm-flex flex-row align-middle align-items-center justify-content-between text-left p-15-18 bg-background home-generalColor mt-4 Announcement">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
              et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. Lorem
            </div>
            <div class="d-sm-flex flex-row justify-content-center mt-2">
              <button id="ReadAnnouncement"
                      class="global-button text-general-small-white text-green bg-background justify-content-center text-center p-12-56" data-tasktype="Announcement"
                      @click="close"
              >
                Read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReadAll',
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
.p-15-18 {
  padding: 15px 18px;
}
.p-12-56 {
  padding: 12px 56px;
}
button {
  border-radius: 5px;

}
</style>
