<template>
  <v-app style="background: transparent!important;">
    <v-container class="container--fluid align-center">
      <v-row class="ma-0">
        <v-col md="7" class="ml-11 mr-9">
          <v-row
            class="home-analytics-header  align-center justify-space-between"
          >
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Home</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
                draggable="false"
              />
              <span class="analytics font-montserrat">Analytics</span>
            </div>
            <v-row class="analytics flex-row justify-end no-gutters">
              Start All Tasks
            </v-row>
          </v-row>
          <v-row class="">
            <div class="d-sm-flex homesearch pl-0 align-center col-6">
              <InputSearchText />
            </div>
            <div class="d-sm-flex align-center col-6 pa-0">
              <div
                class="calendarIcon flex-row d-sm-flex justify-content-center align-middle align-items-center bg-greenBackground round-5"
              >
                <img
                  src="../assets/img/dashboard/main/calendar.png"
                  alt="calendar"
                />
              </div>
              <v-tabs
                v-model="active_tab"
                background-color="#262626"
                slider-color="#5DBD54"
                color="white"
                :show-arrows="false"
                align-with-title
                centered
                height="35"
                width="100%"
                class="d-none d-sm-flex"
              >
                <v-tabs-slider color="#5DBD54"></v-tabs-slider>

                <v-tab
                  v-for="(i, index) in tabs"
                  :key="index"
                  hidden
                  active-class="activeColor"
                  class="text-general-white ma-0 tabWidth text-gray"
                  width="20"
                >
                  {{ i.name }}
                </v-tab>
              </v-tabs>
            </div>
            <v-tabs-items v-model="active_tab">
              <v-tab-item class="weeklyChart home-bgbackground-gray">
                <div
                  class="flex-row d-sm-flex align-middle align-center justify-content-between px-6 mt-3"
                >
                  <div
                    class="flex-row d-sm-flex align-middle text-general-white position-absolute chartSpend"
                  >
                    <span class="text-general-white me-2">€</span>
                    <span class="text-green font-12 me-2 fw-bold number"
                      >1245,00</span
                    >
                    <span class="text-general-white">Spend</span>
                  </div>
                  <div class="d-sm-flex flex-row ml-auto">
                    <span class="text-green me-2">+ 12%</span>
                    <span
                      class="price bg-greenBg text-general-white text-green round-3"
                      >Today</span
                    >
                  </div>
                </div>
                <line-chart
                  :chartdata="chartdata"
                  :options="chartOptions"
                  class="home-bgbackground-gray"
                  :styles="{ height: '23vh', position: 'relative' }"
                />
              </v-tab-item>
              <v-tab-item class="weeklyChart home-bgbackground-gray">
                <div
                  class="flex-row d-sm-flex align-middle align-center justify-content-between px-6 mt-3"
                >
                  <div
                    class="flex-row d-sm-flex align-middle text-general-white position-absolute chartSpend"
                  >
                    <span class="text-general-white me-2">€</span>
                    <span class="text-green font-12 me-2 fw-bold number"
                      >1245,00</span
                    >
                    <span class="text-general-white">Spend</span>
                  </div>
                  <div class="d-sm-flex flex-row ml-auto">
                    <span class="text-green me-2">+ 12%</span>
                    <span
                      class="price bg-greenBg text-general-white text-green round-3"
                      >Today</span
                    >
                  </div>
                </div>
                <line-chart
                  :chartdata="chartdata"
                  :options="chartOptions"
                  class="home-bgbackground-gray"
                  :styles="{ height: '23vh', position: 'relative' }"
                />
              </v-tab-item>
              <v-tab-item class="weeklyChart home-bgbackground-gray">
                <div
                  class="flex-row d-sm-flex align-middle align-center justify-content-between px-6 mt-3"
                >
                  <div
                    class="flex-row d-sm-flex align-middle text-general-white position-absolute chartSpend"
                  >
                    <span class="text-general-white me-2">€</span>
                    <span class="text-green font-12 me-2 fw-bold number"
                      >1245,00</span
                    >
                    <span class="text-general-white">Spend</span>
                  </div>
                  <div class="d-sm-flex flex-row ml-auto">
                    <span class="text-green me-2">+ 12%</span>
                    <span
                      class="price bg-greenBg text-general-white text-green round-3"
                      >Today</span
                    >
                  </div>
                </div>
                <line-chart
                  :chartdata="chartdata"
                  :options="chartOptions"
                  class="home-bgbackground-gray"
                  :styles="{ height: '23vh', position: 'relative' }"
                />
              </v-tab-item>
            </v-tabs-items>
            <JoinDashboard />
            <TotalStatices />
          </v-row>
        </v-col>
        <v-col class="no-gutters flex-lg-column col-lg-4 col-md-3 ">
          <v-row class="align-center justify-start pa-0 ml-0">
            <div class="homeAnayltics ">
              <span class="text-general-white" style="display: inline-block;"
                >Cards</span
              >
              <img
                src="../assets/img/dashboard/main/arrow-right.png"
                alt="arrow-right"
              />
              <span class="analytics">Analytics</span>
            </div>
          </v-row>
          <div class="cards mt-6">
            <div class="flex-row d-sm-flex align-middle">
              <span class="text-general-white">Profile 1</span>
              <img
                src="../assets/img/dashboard/main/profileCheck.png"
                class="card-check"
                alt="profile-check"
              />
            </div>
            <div
              class="flex-row d-sm-flex align-middle w-65 numsExp justify-space-between mt-2"
            >
              <div class="pb-4 pt-4 w-100 border-right">
                <div class="text-general-white w-100">Nums.</div>
                <div class="font-12 fw-bold mt text-general-white mt-1">
                  1234
                </div>
              </div>
              <div class="pb-4 pt-4 w-100 ">
                <div class="text-general-white justify-end w-100">Exp.</div>
                <div
                  class="font-12 text-general-white justify-end fw-bold mt-1"
                >
                  08/23
                </div>
              </div>
            </div>
            <div
              class="flex-row d-sm-flex align-middle text-general-white mt-2"
            >
              Max Mustermann
            </div>
            <div
              class="flex-row d-sm-flex align-middle text-general-white pt-4 pb-4"
            >
              <img
                src="../assets/img/dashboard/main/max-mustermann.png"
                alt="max-mustermann"
              />
            </div>
            <div
              class="flex-row d-sm-flex align-middle text-general-white spend"
            >
              <span class="text-general-white me-2">€</span>
              <span class="text-black font-12 me-2 fw-bold">1245,00</span>
              <span class="text-general-white">Spend</span>
            </div>
            <div
              class="d-sm-flex justify-content-end align-middle position-relative top-31 right-1"
            >
              <img
                src="../assets/img/dashboard/main/card-arrow-right.png"
                alt="card-arrow-right"
                class="home-bgbackground-gray pa-2"
              />
            </div>
          </div>
          <InputSearchText />
          <div class="bottom-border border-color-profile mt-2" />
          <div class="product-order">
            <div
              v-for="item in sport"
              :key="item.id"
              class="d-sm-flex  align-middle align-items-center bg-transparent py-2 bottom-border border-color-profile Sports"
            >
              <div class="me-2 ">
                <img
                  :src="item.Brand"
                  alt=""
                  class="home-bgbackground-gray nikePadding nike-brand"
                />
                <img
                  :src="item.HoverBrand"
                  alt=""
                  class="home-bgbackground-white nikePadding nike-brand-black"
                />
              </div>
              <div class="w-50 ">
                <div class="text-general-white">{{ item.ProductName }}</div>
                <div class="text-general-white fs-2 text-green trackOrder">
                  {{ item.TrackOrder }}
                </div>
              </div>
              <div
                class="justify-content-end bg-greenBg align-items-center ml-auto d-sm-flex align-middle round-3 activeHover"
                @click="checkout()"
              >
                <span
                  class="text-general-white  text-green price mainPrice cursor-pointer"
                  >- {{ item.Price }}€</span
                >
                <img
                  :src="item.ShowEye"
                  alt=""
                  class="home-bgbackground-white pa-2 dashboardEye cursor-pointer"
                />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <CheckOut
        :dialog.sync="dialog"
        class="checkDialog"
        @open-dialog="dialog = true"
        @close-dialog="dialog = false"
      />
    </v-container>
  </v-app>
</template>

<script>
import { ipcRenderer } from 'electron';
import CheckOut from '../../renderer/components/PopUp/CheckOut';
import LineChart from '../components/LineChart';
import InputSearchText from '../../renderer/components/inputs/InputSearchText';
import JoinDashboard from '../../renderer/components/JoinDashboard';
import TotalStatic from '../components/TotalStatic';

export default {
  name: 'Dashboard',
  components: {
    CheckOut,
    LineChart,
    TotalStatices: TotalStatic,
    JoinDashboard,
    InputSearchText,
  },
  middleware: 'auth',
  data() {
    return {
      dialog: false,
      tabs: [{ name: 'Weekly' }, { name: 'Monthly' }, { name: 'Daily' }],
      active_tab: '',
      sport: [
        {
          id: '1',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '2',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '3',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '4',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '5',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '6',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '7',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '8',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '9',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '10',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '11',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
        {
          id: '12',
          Brand: require('../assets/img/dashboard/main/nike-brand.png'),
          HoverBrand: require('../assets/img/dashboard/main/nike-brand-black.png'),
          ProductName: 'JD Sports DE',
          TrackOrder: 'Track Order',
          Price: '180',
          ShowEye: require('../assets/img/dashboard/main/dashboard-eye.png'),
        },
      ],
      chartdata: {
        type: 'Line',
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            borderColor: '#5DBD54',
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#FFF',
            backgroundSize: 20,
            BorderWidth: 5,
            backgroundColor: '#5DBD542E',
            cubicInterpolationMode: 'monotone',
            data: [5, 20, 12, 12, 8, 10, 13, 14, 14, 12, 9, 7],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,

        // interaction: {
        //   intersect: true
        // },
        scales: {
          x: {
            display: false,
            title: {
              display: false,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 21,
          },
          ticks: {
            display: false,
          },
        },
      },
    };
  },
  mounted() {
    ipcRenderer.send('fetch_tasks');
    ipcRenderer.send('fetch_task_groups');
    ipcRenderer.send('fetch_profiles');
    ipcRenderer.send('fetch_profile_groups');
    ipcRenderer.send('fetch_proxies');
    ipcRenderer.send('fetch_proxy_groups');
    ipcRenderer.send('fetch_harvesters');
    ipcRenderer.send('fetch_settings');
  },
  methods: {
    checkout() {
      console.log('checkout');
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.analytics {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #787878;
}
.chartSpend .number {
  font-size: 1rem;
}
.homesearch img {
  position: absolute;
  left: 7%;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.home-generalColor {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 12px;
  color: #787878;
}

.home-search {
  border: none !important;
  border-color: transparent;
  padding-left: 34px !important;
}

.v-tabs .v-slide-group__prev--disabled {
  display: none !important;
}

.tabWidth {
  min-width: 10%;
  max-width: 66px;
  font-size: 8px !important;
}

.activeColor {
  color: white !important;
}

.calendarIcon img {
  padding: 6px;
}

.cards {
  background: url('../assets/img/dashboard/main/card.png') no-repeat;
  background-size: 110%;
  height: 236px;
  padding: 14px 20px;
  width: 233px;
}

.card-check {
  margin-left: 42%;
}

.w-65 {
  width: 65%;
}

.numsExp {
  border-bottom: 2px solid white;
  border-top: 2px solid white;
}

.spend {
  top: 9%;
  position: relative;
}

.position-absolute {
  position: absolute;
}
.position-relative {
  position: relative;
}

.top-31 {
  top: 0%;
  left: 92%;
}

.border-right {
  border-right: 2px solid white;
}

.nike-brand-black,
.dashboardEye {
  display: none;
}

.nikePadding {
  padding: 15px 8px;
}

.Sports:hover .mainPrice {
  display: none;
}

.Sports:hover {
  background: #77d46e !important;
  border-radius: 5px;
}

.Sports:hover .trackOrder {
  color: #12430d !important;
}

.Sports:hover .nike-brand {
  display: none;
}

.Sports:hover .dashboardEye {
  display: block;
}

.Sports:hover .nike-brand-black {
  display: block;
}

.col-3 {
  flex: 0;
  max-width: 100% !important;
}

.product-order {
  height: 100%;
  max-height: 252px;
  overflow-y: scroll;
}

.product-order::-webkit-scrollbar {
  display: none;
}

.weeklyChart {
  height: 197px;
}
@media (min-width: 1440px) {
  .weeklyChart {
    height: 400px;
  }
  .nikeDunk {
    height: 300px;
  }
}
</style>
