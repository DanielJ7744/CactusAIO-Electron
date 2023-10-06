<template>
  <v-row class="home-bgbackground-gray no-gutters mt-3 purchaseDecline">
    <div class="col-6 col-md-4 pl-0 pa-2">
      <div class="round-5 bg-mainBackground w-100 me-2 pde-padding">
        <div class="purchase text-general-white text-gray">Purchases</div>
        <div class="flex-row d-sm-flex justify-content-between align-middle align-items-center pb-4 pt-4">
          <img src="../assets/img/dashboard/main/purchase.png" alt="purchase">
          <div class="right-border border-green" />
          <div class="text-general-white fw-bold font-24">234</div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 pl-0 pa-2">
      <div class="round-5 bg-mainBackground w-100 me-2 pde-padding">
        <div class="purchase text-general-white text-gray">Declines</div>
        <div class="flex-row d-sm-flex  justify-content-between align-middle align-items-center pb-4 pt-4">
          <img src="../assets/img/dashboard/main/decline.png" alt="purchase">
          <div class="right-border border-red" />
          <div class="text-general-white fw-bold font-24">234</div>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 pl-0 pa-2">
      <div class="round-5 bg-mainBackground w-100 pde-padding">
        <div class="purchase text-general-white text-gray">Errors</div>
        <div class="flex-row d-sm-flex  justify-content-between align-middle align-items-center pb-4 pt-4">
          <img src="../assets/img/dashboard/main/error.png" alt="purchase">
          <div class="right-border border-yellow" />
          <div class="text-general-white fw-bold font-24">234</div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'TotalStatic'
}
</script>

<style scoped>
.purchaseDecline {
  padding: 29px 27px;
}
.purchaseDecline .font-24{
  font-size: 24px;
}
.pde-padding {
  padding: 13px 16px 0 16px;
}

.bg-mainBackground {
  background: #1F1F1F;
}
.right-border {
  border-right: 3px solid white;
  height: 23px;
}
.border-green {
  border-color: #2FC85A !important;
}
.border-red {
  border-color: #FF3535 !important;
}
.border-yellow {
  border-color: #FFAF51 !important;
}
</style>
