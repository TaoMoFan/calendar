<template>
  <v-app>
    <v-card>
<!--      标题栏-->
      <v-card-title class="px-1">
        <v-row>
          <v-col class="d-flex align-center">          
            <v-btn
              @click="drawer = true"
              outlined
              elevation="1"
              icon>
            <v-icon dark>
              mdi-account-circle
            </v-icon>
            </v-btn>
<!--          左侧弹窗遮罩-->
            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              width="20%"
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
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn
            outlined
            class="mx-1 unselected "
            :class="{selected: type === 'day'}"
            @click="setToday"
            :elevation="type === 'day' ? 0 : 3"
        >
          今天
            </v-btn>
            <v-btn
                class="mx-1 unselected"
                :class="{selected: type ==='week'}"
                outlined
                @click="type = 'week'"
                :elevation="type === 'week' ? 0 : 3"
            >
              本周
            </v-btn>
            <v-btn
                class="mx-1 unselected"
                :class="{selected: type === 'month'}"
                outlined
                @click="type = 'month'"
                :elevation="type === 'month' ? 0 : 3"
            >
              本月
            </v-btn>
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="4"></v-col>
            <v-col>
              <v-text-field
                dense
                hide-details
                prepend-inner-icon="mdi-magnify"
                outlined
                color="gray"
                label="搜索"
                clearable
                v-model="newSearch"
                @click:prepend-inner="Search"
                @keydown.enter="Search"
              >
              </v-text-field>
            </v-col>
            </v-row>


          </v-col>
        </v-row>



      </v-card-title>
<!--      内容-->
        <v-row>
<!--          待办-->

          <v-col cols="4" class="pr-0 pt-0">
            <v-sheet class="overflow-hidden">
              <v-tabs
                  fixed-tabs
                  v-model="tab"
                  color="green"

              >
                <v-tab key="1" style="min-width: 5%">
                    <v-icon color="orange darken-2">mdi-arrow-up-bold-box-outline</v-icon>
                </v-tab>
                <v-tab key="2" style="min-width: 5%">
                  <v-icon color="blue darken-2">mdi-heart</v-icon>
                </v-tab>
                <v-tab key="3" style="min-width: 5%">
                  <v-icon color="indigo darken-2"> mdi-account-box</v-icon>
                </v-tab>
                <v-tab key="4" style="min-width: 5%">
                  <v-icon color="teal darken-2">mdi-email</v-icon>
                </v-tab>
                <v-tab key="5" style="min-width: 5%">
                  <v-icon color="deep-purple darken-2">mdi-call-split</v-icon>
                </v-tab>
                <v-tab key="6" style="min-width: 5%">
                <v-icon color="cyan darken-2">mdi-dialpad</v-icon>
              </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item key="1">
                  <v-container style="max-width: 500px">
                    <v-card class=" mb-2">
                       <v-sheet class=" d-flex align-center">
                          <v-text-field
                          hide-details=""
                          outlined
                          v-model="eventName"
                          label="新建待办事项"
                          placeholder="待办事项名称"
                          @keydown.enter="create"
                          @click="expandNewEvent"
                          @blur="blurNewEvent"
                          >
                            <template v-slot:append>
                              <v-fade-transition>
                                <v-icon
                                    v-if="eventName"
                                    @click="create"
                                >
                                  mdi-plus-circle
                                </v-icon>
                              </v-fade-transition>
                            </template>
                          </v-text-field>
                       </v-sheet>
                       <v-expand-transition>
                          <div v-show="showNewEvent">
                            <v-divider></v-divider>
                            <v-sheet class="mt-1">
                              <v-textarea
                                dense
                                auto-grow
                                counter
                                outlined
                                clearable
                                prepend-inner-icon="mdi-comment"
                                rows="3"
                                name="input-3-4"
                                label="备注内容"
                                placeholder="不超过50字"
                                :value="eventContent"
                                :rules="eventContentRules"
                              ></v-textarea>
                            </v-sheet>
                            <v-divider></v-divider>
                            <v-sheet class="mt-1">
                              <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header>
                                  日期
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-menu
                                    ref="menu"
                                    v-model="eventDateMenu"
                                    :close-on-content-click="false"
                                    :return-value.sync="dates"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-combobox
                                        v-model="eventDates"
                                        multiple
                                        chips
                                        small-chips
                                        label="Multiple picker in menu"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-combobox>
                                    </template>
                                    <v-date-picker
                                      v-model="dates"
                                      multiple
                                      no-title
                                      scrollable
                                    >
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dates)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                            </v-sheet>
                          </div>
                        </v-expand-transition>
                    </v-card>


                    <h2 class="text-h4 success--text pl-4">
                      总计:&nbsp;
                      <v-fade-transition leave-absolute>
                        <span :key="`tasks-${tasks.length}`">
                          {{ tasks.length }}
                        </span>
                      </v-fade-transition>
                    </h2>
                    <v-divider class="mt-4"></v-divider>
                    <v-row
                        class="my-1"
                        align="center"
                    >
                      <strong class="mx-4 info--text text--darken-2">
                        剩余待办: {{ remainingTasks }}
                      </strong>

                      <v-divider vertical></v-divider>

                      <strong class="mx-4 success--text text--darken-2">
                        已完成: {{ completedTasks }}
                      </strong>

                      <v-spacer></v-spacer>

                      <v-progress-circular
                          :value="progress"
                          class="mr-2"
                      ></v-progress-circular>
                    </v-row>

                    <v-divider class="mb-4"></v-divider>

                    <v-card v-if="tasks.length > 0">
                      <v-slide-y-transition
                          class="py-0"
                          group
                          tag="v-list"
                      >
                        <template v-for="(task, i) in tasks">
                          <v-divider
                              v-if="i !== 0"
                              :key="`${i}-divider`"
                          ></v-divider>
                            <v-list-item :key="`${i}-${task.text}`">
                              <v-list-item-action>
                                <v-checkbox
                                    v-model="task.done"
                                    :color="task.done && 'grey' || 'primary'"
                                >
                                  <template v-slot:label>
                                    <div
                                        :class="task.done && 'grey--text' || 'primary--text'"
                                        class="ml-4"
                                        v-text="task.text"
                                    ></div>
                                  </template>
                                </v-checkbox>
                              </v-list-item-action>

                            <v-spacer></v-spacer>

                            <v-scroll-x-transition>
                              <v-icon
                                  v-if="task.done"
                                  color="success"
                              >
                                mdi-check
                              </v-icon>
                            </v-scroll-x-transition>
                          </v-list-item>
                        </template>
                      </v-slide-y-transition>
                    </v-card>
                  </v-container>
                </v-tab-item>
                <v-tab-item key="2">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-home
                      </v-icon>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-tab-item>
                <v-tab-item key="3">3</v-tab-item>
                <v-tab-item key="4">2</v-tab-item>
                <v-tab-item key="5">3</v-tab-item>
              </v-tabs-items>
            </v-sheet>
          </v-col>
          <!--          //日历-->
          <v-col class="pl-0 pt-0">
            <v-toolbar
                flat
            >
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
            </v-toolbar>
            <v-sheet height="800px">
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
          </v-col>
        </v-row>

    </v-card>
  </v-app>

</template>

<script>

export default {
  data: () => ({
    //标题栏
    newSearch: null,

    //待办栏
    tab: null,
    tasks: [
      {
        done: false,
        text: '开会',
      },
      {
        done: false,
        text: '发邮件',
      },
      {
        done: false,
        text: '填工时',
      },
    ],
    showNewEvent: false,
    eventName: null,
    eventContent: '',
    eventContentRules: [v => v.length <= 50 || 'Max 50 characters'],
    eventDateMenu: false,
    eventDates: [],
    //日历栏
    drawer: false,
    group: null,
    ifcalendar: true,
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

    //

  }),
  computed: {
    completedTasks () {
      return this.tasks.filter(task => task.done).length
    },
    progress () {
      return this.completedTasks / this.tasks.length * 100
    },
    remainingTasks () {
      return this.tasks.length - this.completedTasks
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    //标题栏
    Search(){
      alert('search')
    },
    //待办栏
    expandNewEvent(){
      this.showNewEvent = true
    },
    blurNewEvent(){
      // this.showNewEvent = false
    },
    create () {
      this.tasks.push({
        done: false,
        text: this.eventName,
      })
      this.eventName = null
    },
    //日历
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
      this.type = 'day'
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
.unselected{
  font-size: large;
  color: gray;
}
.selected {
  color: black;
}
.addEventCard >>>.v-input__slot{
margin-bottom: 0px;
}
.addEventCard >>>.v-text-field__details{
margin-bottom: 0px;
min-height: 0px;
max-height: 0px;
}
</style>