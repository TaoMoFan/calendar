<template>
  <v-app>
    <v-card height="100%">
<!--      标题栏-->
      <v-card-title class="px-1">
          <v-btn
              @click="drawer = true"
              outlined
              elevation="1"
              icon>
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-btn>
<!--        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>-->
        <v-spacer></v-spacer>
        <v-responsive class="ml-auto"  max-width="15%">
          <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-card-title>
      <v-card-text>
        <v-row class="fill-height">
          <v-col cols="4" style="padding: 0px">
            <v-sheet class="overflow-hidden" height="90%">
              <v-app-bar
                  height="50px"
                  scroll-target="#scrolling-techniques-2"
              >
                <!--            <template v-slot:img="{ props }">-->
                <!--              <v-img-->
                <!--                  v-bind="props"-->
                <!--                  gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"-->
                <!--              ></v-img>-->
                <!--            </template>-->


                <v-app-bar-title>Title</v-app-bar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn
                    @click="ifcalendar = !ifcalendar"
                    icon>
                  <v-icon
                      color="teal darken-2"
                  >
                    mdi-email
                  </v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <template v-if="ifcalendar" v-slot:extension>
                  <v-tabs v-model="tab" align-with-title>
                    <v-tab style="margin-left: 0px" key="1">
                      今天
                    </v-tab>
                    <v-tab key="2">本周</v-tab>
                    <v-tab key="3">本月</v-tab>
                  </v-tabs>
                </template>
              </v-app-bar>
              <!--          左侧弹窗遮罩-->
              <v-navigation-drawer
                  v-model="drawer"
                  absolute
                  temporary
              >
                <v-list
                    nav
                    dense
                >
                  <v-list-item-group
                      v-model="group"
                      active-class="deep-purple--text text--accent-4"
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-navigation-drawer>

              <v-tabs-items v-model="tab">
                <v-tab-item key="1">
                  1
                </v-tab-item>
                <v-tab-item key="2">2</v-tab-item>
                <v-tab-item key="3">3</v-tab-item>
              </v-tabs-items>
              <!--          任务列表-->
              <!--          <v-sheet-->
              <!--              id="scrolling-techniques-2"-->
              <!--              class="overflow-y-auto"-->
              <!--              max-height="90%"-->
              <!--          >-->
              <!--            <v-container style="height: 100%;background-color: #725124">123</v-container>-->
              <!--          </v-sheet>-->
            </v-sheet>
          </v-col>


          <v-col cols="20" style="padding: 0px" v-if="ifcalendar">
            <v-sheet class="overflow-hidden" height="90%">
              <v-toolbar
                  height="50px"
                  flat
              >
                <v-btn
                    outlined
                    class="mr-2"
                    color="grey darken-2"
                    @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                >
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                >
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!--            <template v-slot:activator="{ on, attrs }">-->
                <!--              <v-btn-->
                <!--                  outlined-->
                <!--                  color="grey darken-2"-->
                <!--                  v-bind="attrs"-->
                <!--                  v-on="on"-->
                <!--              >-->
                <!--                <span>{{ typeToLabel[type] }}</span>-->
                <!--                <v-icon right>-->
                <!--                  mdi-menu-down-->
                <!--                </v-icon>-->
                <!--              </v-btn>-->
                <!--            </template>-->
                <v-btn
                    outlined
                    class="mr-2"
                    color="grey darken-2"
                    @click="type = 'day'"
                >
                  Day
                </v-btn>
                <v-btn
                    outlined
                    class="mr-2"
                    color="grey darken-2"
                    @click="type = 'week'"
                >
                  week
                </v-btn>
                <v-btn
                    outlined
                    class="mr-2"
                    color="grey darken-2"
                    @click="type = 'month'"
                >
                  month
                </v-btn>
              </v-toolbar>


              <v-sheet height="100%">
                <!--          日历-->
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @contextmenu:date="addEvent"
                    @click:day="preAdd"
                    @change="updateRange"
                ></v-calendar>
                <!--          卡片-->
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                  <v-card
                      color="grey lighten-4"
                      min-width="20vw"
                      flat
                  >
                    <v-toolbar
                        :color="selectedEvent.color"
                        dark
                    >
                      <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                          text
                          color="secondary"
                          @click="selectedOpen = false"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>
  </v-app>

</template>

<script>

export default {
  data: () => ({
    drawer: false,
    group: null,
    ifcalendar: true,
    tab: null,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }
      let e = [];
      e.push({
        name: '开会',
        start: '2022-09-27 14:00',
        end: '2022-09-27 15:00',
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: true,
      },
          {
            name: '开会',
            details: '1213212',
            start: '2022-09-27 14:00',
            end: '2022-09-27 15:00',
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: true,
          }
      )
      this.events = e
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    addEvent(){
      console.log('addEvent')
    },
    preAdd(day){
      console.log('preAdd',day)
      let preEvent = {
        name: '新建事项',
        start: day.date + ' 00:00',
        end: day.date + ' 23:59',
        color: 'grey',
        timed: false
      }
      this.events.push(preEvent)

    },
  },
}
</script>

<style scoped>

</style>