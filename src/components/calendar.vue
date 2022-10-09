<template>
  <v-app>
    <v-card>
<!--      标题栏-->
      <v-card-title class="px-1">
        <v-row>
          <v-col class="d-flex align-center">
            <v-avatar @click="drawer = true">
              <v-img
                  src="~@/assets/avataaars.svg"
              ></v-img>
            </v-avatar>
            <div class="text-h5 ml-5">小浦
              <span class="orange--text text--darken-2">T</span><span class="indigo--text text--darken-2">o</span><span class="teal--text text--darken-2">D</span><span class="cyan--text text--darken-2">o</span>
            </div>
<!--          左侧弹窗遮罩-->
<!--            <v-navigation-drawer-->
<!--              v-model="drawer"-->
<!--              absolute-->
<!--              temporary-->
<!--              width="20%"-->
<!--          >-->
<!--            <v-list-->
<!--                nav-->
<!--                dense-->
<!--            >-->
<!--              <v-list-item-group-->
<!--                  v-model="group"-->
<!--                  active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"-->
<!--              >-->
<!--                <v-list-item>-->
<!--                  <v-list-item-icon>-->
<!--                    <v-icon>mdi-home</v-icon>-->
<!--                  </v-list-item-icon>-->
<!--                  <v-list-item-title>Home</v-list-item-title>-->
<!--                </v-list-item>-->

<!--                <v-list-item>-->
<!--                  <v-list-item-icon>-->
<!--                    <v-icon>mdi-account</v-icon>-->
<!--                  </v-list-item-icon>-->
<!--                  <v-list-item-title>Account</v-list-item-title>-->
<!--                </v-list-item>-->
<!--              </v-list-item-group>-->
<!--            </v-list>-->
<!--            </v-navigation-drawer>-->
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
                placeholder="搜索事项名称或标签"
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

          <v-col cols="3" class="pr-0 pt-0">
            <v-sheet class="overflow-hidden">
              <v-tabs
                  fixed-tabs
                  v-model="tab"
                  color="green"

              >
                <v-tab key="1" style="min-width: 5%">
                    <v-icon color="orange darken-2">mdi-plus-box</v-icon>
                </v-tab>
                <v-tab key="3" style="min-width: 5%">
                  <v-icon color="indigo darken-2"> mdi-account-box</v-icon>
                </v-tab>
                <v-tab key="4" style="min-width: 5%">
                  <v-badge
                      :content="emailShenyu"
                      :value="emailShenyu"
                      color="green"
                      overlap

                  >
                    <v-icon color="teal darken-2">mdi-email</v-icon>
                  </v-badge>
                </v-tab>
                <v-tab key="5" style="min-width: 5%">
                  <v-icon color="deep-purple darken-2">mdi-sitemap</v-icon>
                </v-tab>
                <v-tab key="6" style="min-width: 5%">
                <v-icon color="cyan darken-2">mdi-dialpad</v-icon>
              </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item key="1">
                  <v-container >
                    <v-card class=" mb-2">
                       <v-sheet class=" d-flex align-center">
                          <v-text-field
                          hide-details=""
                          outlined
                          v-model="eventForm.eventName"
                          label="新建待办事项"
                          placeholder="待办事项名称"
                          @click="expandNewEvent"
                          >
                          </v-text-field>
                       </v-sheet>
                       <v-expand-transition>
                          <div v-show="showNewEvent">
                            <v-divider></v-divider>
                            <v-sheet class="mt-1">
                            <v-expansion-panels accordion focusable multiple v-model="eventExpanValue">
                              <v-expansion-panel>
                                  <v-expansion-panel-header>
                                    备注
                                    <template v-slot:actions>
                                      <v-switch
                                      class="mt-0 pt-0"
                                      dense
                                      hide-details
                                      :value="ifineventExpanValue(0)"
                                      color="orange darken-2"
                                      >
                                      </v-switch>
                                    </template>
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content class="pa-2">
                                    <v-sheet >
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
                                        v-model="eventForm.eventContent"
                                        :rules="eventContentRules"
                                      ></v-textarea>
                                    </v-sheet>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel >
                                  <v-expansion-panel-header>
                                    时间日期
                                    <template v-slot:actions>
                                      <v-switch
                                      class="mt-0 pt-0"
                                      dense
                                      hide-details
                                      :value="ifineventExpanValue(1)"
                                      color="indigo darken-2"
                                      >
                                      </v-switch>
                                    </template>
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                        <el-date-picker
                                            v-model="eventForm.eventTime"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            placeholder="选择时间范围"
                                            is-range
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            style="width: 100%"
                                        >
                                        </el-date-picker>
                                        <v-select
                                            class="mt-5"
                                            :items="eventRepeat"
                                            label="重复规则"
                                            dense
                                            outlined
                                            v-model="eventForm.eventRepeats"
                                        ></v-select>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                  <v-expansion-panel-header>
                                    类别标签
                                    <template v-slot:actions>
                                      <v-switch
                                      class="mt-0 pt-0"
                                      dense
                                      hide-details
                                      :value="ifineventExpanValue(2)"
                                      color="teal darken-2"

                                      >
                                      </v-switch>
                                    </template>
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-combobox
                                        v-model="eventForm.eventModel"
                                        :filter="filter"
                                        :hide-no-data="!search"
                                        :items="items"
                                        :search-input.sync="search"
                                        hide-selected
                                        label="选择或输入标签"
                                        multiple
                                        small-chips
                                        outlined
                                        dense
                                    >
                                      <template v-slot:no-data>
                                        <v-list-item>
                                          <span class="subheading">新建标签</span>
                                          <v-chip
                                              :color="`${colors[nonce - 1]} lighten-3`"
                                              label
                                              small
                                          >
                                            {{ search }}
                                          </v-chip>
                                        </v-list-item>
                                      </template>
                                      <template v-slot:selection="{ attrs, item, parent, selected }">
                                        <v-chip
                                            v-if="item === Object(item)"
                                            v-bind="attrs"
                                            :color="`${item.color} lighten-3`"
                                            :input-value="selected"
                                            label
                                            small
                                        >
                                          <span class="pr-2">
                                            {{ item.text }}
                                          </span>
                                          <v-icon
                                              small
                                              @click="parent.selectItem(item)"
                                          >
                                            $delete
                                          </v-icon>
                                        </v-chip>
                                      </template>
                                      <template v-slot:item="{ index, item }">
                                        <v-text-field
                                            v-if="editing === item"
                                            v-model="editing.text"
                                            autofocus
                                            flat
                                            background-color="transparent"
                                            hide-details
                                            solo
                                            @keyup.enter="edit(index, item)"
                                        ></v-text-field>
                                        <v-chip
                                            v-else
                                            :color="`${item.color} lighten-3`"
                                            dark
                                            label
                                            small
                                        >
                                          {{ item.text }}
                                        </v-chip>
                                        <v-spacer></v-spacer>
                                        <v-list-item-action @click.stop>
                                          <v-btn
                                              icon
                                              @click.stop.prevent="edit(index, item)"
                                          >
                                            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                                          </v-btn>
                                        </v-list-item-action>
                                      </template>
                                    </v-combobox>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                  <v-expansion-panel-header>
                                    关联
                                    <template v-slot:actions>
                                      <v-switch
                                          color="deep-purple darken-2"
                                          class="mt-0 pt-0"
                                          dense
                                          hide-details
                                          :value="ifineventExpanValue(3)"
                                      >
                                      </v-switch>
                                    </template>
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-combobox
                                        v-model="eventForm.eventRelationListIPMP"
                                        :items="eventRelationLists"
                                        label="关联IPMP任务"
                                        placeholder="选择IPMP任务"
                                        outlined
                                        multiple
                                        chips
                                        color="red darken-2"
                                    >
                                      <template v-slot:selection="data">
                                        <v-chip
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"

                                        >
                                          <v-avatar
                                              color="red darken-2"
                                              class=" white--text"
                                              left
                                              v-text="data.item.slice(0,1).toUpperCase()"

                                          >
                                          </v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                    <v-combobox
                                        v-model="eventForm.eventRelationListOKR"
                                        :items="eventRelationLists"
                                        label="关联OKR重点项目"
                                        outlined
                                        multiple
                                        chips
                                        color="red darken-2"
                                        
                                    >
                                      <template v-slot:selection="data">
                                        <v-chip
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"

                                        >
                                          <v-avatar
                                              color="red darken-2"
                                              class=" white--text"
                                              left
                                              v-text="data.item.slice(0,1).toUpperCase()"
                                          >
                                          </v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                  <v-expansion-panel-header>
                                    团队
                                    <template v-slot:actions>
                                      <v-switch
                                      class="mt-0 pt-0"
                                      dense
                                      hide-details
                                      :value="ifineventExpanValue(4)"
                                      color="cyan darken-2"
                                      >
                                      </v-switch>
                                    </template>
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-combobox
                                        v-model="eventForm.eventTeamList"
                                        :items="eventTeamLists"
                                        label="选择团队成员"
                                        outlined
                                        multiple
                                        chips
                                    >
                                      <template v-slot:selection="data">
                                        <v-chip
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"
                                        >
                                          <v-avatar
                                              class="accent white--text"
                                              left
                                              v-text="data.item.slice(0, 1).toUpperCase()"
                                          ></v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>

                              <v-sheet class="d-flex ma-2 pb-2">
                                <v-btn outlined elevation="2" color="red darken-2" @click="cancelAdd">
                                  取消
                                  <v-icon>
                                    mdi-minus-circle
                                  </v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn :disabled="eventForm.eventName == null || eventForm.eventName == ''" outlined elevation="2" color="teal darken-2" @click="add">
                                  新建
                                  <v-icon>
                                    mdi-plus-circle
                                  </v-icon>
                                </v-btn>
                              </v-sheet>
                            </v-sheet>
                          </div>
                        </v-expand-transition>
                    </v-card>


                    <v-divider class="mt-4"></v-divider>
                    <v-row
                        class="my-1"
                        align="center"
                    >
                      <strong class="mx-4 error--text text--darken-2">
                        {{ computertype }}总计: {{ events.length }}
                      </strong>

                      <v-divider vertical></v-divider>

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
                    <v-card v-if="events.length > 0">
                      <v-slide-y-transition
                          class="py-0"
                          group
                      >
                        <template  v-for="(event, i) in events">
                          <v-divider
                              v-if="i !== 0"
                              :key="`${i}-divider`"
                          ></v-divider>
                            <v-list-item :key="`${i}-${event.name}`">
                              <v-list-item-action>
                                <v-checkbox
                                    v-model="event.done"
                                    :color="event.done && 'grey' || 'primary'"
                                >
                                  <template v-slot:label>
                                    <div
                                        :class="event.done && 'grey--text' || 'primary--text'"
                                        class="ml-2"
                                        v-text="event.name"
                                    ></div>
                                    <v-spacer></v-spacer>
                                    <div :class="event.done && 'grey--text' || 'primary--text'"
                                         class="ml-2"
                                         v-text="event.start">
                                    </div>
                                  </template>
                                </v-checkbox>
                              </v-list-item-action>
                            <v-spacer></v-spacer>
                            <v-scroll-x-transition>
                              <v-icon
                                  v-if="event.done"
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
                <v-tab-item key="3" class="px-2 py-3">
                  <strong class="mx-1 indigo--text text--darken-2">
                    IPMP工时管理
                  </strong>
                  <v-divider></v-divider>
                  <v-row
                      class="my-1"
                      align="center"
                  >

                    <strong class="ml-4 mr-2 error--text text--darken-2">
                      {{ computertype }}总计: {{ ipmpAll }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 info--text text--darken-2">
                      {{ computertype }}剩余: {{ ipmpShenyu }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 success--text text--darken-2">
                      {{ computertype }}已完成: {{ ipmpAlready }}
                    </strong>

                  </v-row>

                  <v-select
                      :items="ipmpNameList"
                      label=" 任务集名称"
                      outlined
                      hide-details
                      class="my-3"
                      dense
                      v-model="ipmpName"
                  ></v-select>
                  <v-select
                      :items="ipmpUnitList"
                      label="需求实施单元内容"
                      v-model="ipmpUnit"
                      outlined
                      hide-details
                      class="my-3"
                      dense
                  ></v-select>
                  <v-textarea
                      outlined
                      name="input-7-4"
                      label="工作内容"
                      v-model="ipmpWorkContent"
                      hide-details
                      class="my-3"
                      dense
                  ></v-textarea>
                  <v-row>
                    <v-col >
                      <v-text-field
                          label="工时"
                          placeholder="最多8小时"
                          outlined
                          v-model="ipmpWorkTime"
                          hide-details
                          class="my-3"
                          dense
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                          :items="ipmpWorktypeList"
                          label="工作类型"
                          outlined
                          v-model="ipmpWorktype"
                          hide-details
                          class="my-3"
                          dense
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-select
                      chips
                      multiple
                      :items="events.map((item,index)=>{return item.name}).join(',').split(',')"
                      label="关联待办事项"
                      v-model="ipmpRelation"
                      outlined
                      hide-details
                      class="my-3"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-btn
                        color="text--darken-4 indigo--text"
                        @click="reserve"
                        elevation="1"
                    >
                      <v-icon left>
                        mdi-pencil
                      </v-icon>
                      提交
                    </v-btn>

                </v-tab-item>
                <v-tab-item key="4" class="px-2 py-3">
                  <strong class="mx-1 teal--text text--darken-2">
                    邮件管理
                  </strong>
                  <v-divider></v-divider>
                  <v-row
                      class="my-1"
                      align="center"
                  >
                    <strong class="ml-4 mr-2 error--text text--darken-2">
                      {{ computertype }}总计: {{ emailAll }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 info--text text--darken-2">
                      {{ computertype }}未读: {{ emailShenyu }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 success--text text--darken-2">
                      {{ computertype }}已读: {{ emailAlready }}
                    </strong>
                  </v-row>
                </v-tab-item>
                <v-tab-item key="5" class="px-2 py-3">
                  <strong class="mx-1 purple--text text--darken-3">
                    团队待办事项
                  </strong>
                  <v-divider></v-divider>
                  <v-row
                      class="my-1"
                      align="center"
                  >
                    <strong class="ml-4 mr-2 error--text text--darken-2">
                      {{ computertype }}总计: {{ ipmpAll }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 info--text text--darken-2">
                      {{ computertype }}未完成: {{ ipmpShenyu }}
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 success--text text--darken-2">
                      {{ computertype }}已完成: {{ ipmpAlready }}
                    </strong>
                  </v-row>
                  <v-timeline
                      align-top
                      dense
                  >
                    <v-timeline-item
                        color="green"
                        small
                    >
                      <v-row class="pt-1">
                        <v-col cols="3">
                          <strong>09：15</strong>
                        </v-col>
                        <v-col>
                          <strong>团队站会</strong>
                          <div class="text-caption">
                            站会具体涉及内容
                          </div>
                        </v-col>
                      </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                        color="cyan darken-2"
                        small
                    >
                      <v-row class="pt-1">
                        <v-col cols="3">
                          <strong>3-4pm</strong>
                        </v-col>
                        <v-col>
                          <strong>代码评审</strong>
                          <div class="text-caption mb-2">
                            XX系统需求代码评审
                          </div>
                          <div class="text-caption mb-2">
                            参与者
                          </div>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars2.png"
                            ></v-img>
                          </v-avatar>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars1.png"
                            ></v-img>
                          </v-avatar>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars3.png"
                            ></v-img>
                          </v-avatar>
                        </v-col>
                      </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                        color="red"
                        small
                    >
                      <v-row class="pt-1">
                        <v-col cols="3">
                          <strong>31日晚</strong>
                        </v-col>
                        <v-col>
                          <strong>日常变更</strong>
                        </v-col>
                      </v-row>
                    </v-timeline-item>

                    <v-timeline-item
                        color="teal lighten-3"
                        small
                    >
                      <v-row class="pt-1">
                        <v-col cols="3">
                          <strong>7日9点</strong>
                        </v-col>
                        <v-col>
                          <strong>团建</strong>
                          <div class="text-caption">
                            参与者
                          </div>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars2.png"
                            ></v-img>
                          </v-avatar>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars3.png"
                            ></v-img>
                          </v-avatar>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars.png"
                            ></v-img>
                          </v-avatar>
                          <v-avatar>
                            <v-img
                                src="~@/assets/avataaars1.png"
                            ></v-img>
                          </v-avatar>
                        </v-col>
                      </v-row>
                    </v-timeline-item>
                    <v-timeline-item
                        color="teal lighten-3"
                        small
                    >
                      <v-row class="pt-1">
                        <v-col cols="3">
                          <strong>XXX</strong>
                        </v-col>
                        <v-col>
                          <strong>XX</strong>
                          <div class="text-caption">
                            xxx
                          </div>
                        </v-col>
                      </v-row>
                    </v-timeline-item>
                  </v-timeline>
                </v-tab-item>
                <v-tab-item key="6" class="px-2 py-3">
                  <strong class="mx-1 cyan--text text--darken-4">
                    统计报告
                  </strong>
                  <v-divider></v-divider>
                  <v-row
                      class="my-1"
                      align="center"
                  >
                    <strong class="ml-4 mr-2 error--text text--darken-2">
                      今日完成率: 80%
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 info--text text--darken-2">
                      本周完成率: 34%
                    </strong>

                    <v-divider vertical></v-divider>

                    <strong class="mx-2 success--text text--darken-2">
                      本月完成率: 22%
                    </strong>
                  </v-row>
                  <v-card
                      class="mt-4 mx-auto"

                  >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan darken-4"
                        elevation="2"
                    >
                      <v-sparkline
                          :labels="xlabels"
                          :value="yvalue"
                          color="white"
                          line-width="2"
                          padding="16"
                      ></v-sparkline>
                    </v-sheet>

                    <v-card-text class="pt-2">
                      <div class="text-h6  mb-2">
                          {{ computertype }}完成趋势
                      </div>
                      <div class="subheading grey--text d-flex">
                        为自己打分
                        <v-spacer></v-spacer>
                        <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            size="14"
                        ></v-rating>
                      </div>
                      <v-divider class="my-2"></v-divider>
                      <div class="text-h6  mb-2">
                        本周小结
                      </div>
                      <v-textarea
                          v-model="chart1"
                          :rules="rules1"
                          auto-grow
                          rows="1"
                          row-height="15"
                          counter="100"
                          label="本周你完成了那些工作？最有成就感的是什么？"
                      ></v-textarea>
                      <v-textarea
                          v-model="chart2"
                          :rules="rules2"
                          auto-grow
                          rows="1"
                          row-height="15"
                          counter="100"
                          label="下周你计划做什么？要完成哪些目标？"
                      ></v-textarea>
                      <v-textarea
                          v-model="chart3"
                          :rules="rules3"
                          auto-grow
                          rows="1"
                          row-height="15"
                          counter="100"
                          label="本周工作你遇到的困难是什么？需要哪些帮助？"
                      ></v-textarea>
                      <v-textarea
                          v-model="chart4"
                          :rules="rules4"
                          auto-grow
                          rows="1"
                          row-height="15"
                          counter="100"
                          label="本周工作中，有什么需要和团队分享的？"
                      ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="text--darken-4 cyan--text"
                          @click="reserve"
                          elevation="1"
                      >
                        <v-icon left>
                          mdi-pencil
                        </v-icon>
                        提交
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
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
    events: [
      {
        done: false,
        name: '开会',
        start: '2022-10-11 15:00:00',
        end: '2022-10-10 17:00:00',
        color: 'indigo',
        timed: true
      },
      {
        done: false,
        name: '发邮件',
        start: '2022-10-14 09:00:00',
        end: '2022-10-14 17:00:00',
        color: 'teal',
        timed: true
      },
      {
        done: false,
        name: '填工时',
        start: '2022-10-17 09:00:00',
        end: '2022-10-21 17:00:00',
        color: 'blue',
        timed: true
      },
    ],
    showNewEvent: false,
    eventContentRules: [v => v.length <= 50 || 'Max 50 characters'],
    eventExpanValue: [],
    eventRepeat: ['每天','每个工作日','每周今天','每月今天'],
    activator: null,
    attach: null,
    colors: ['blue', 'indigo', 'deep-purple','teal', 'cyan', 'green', 'orange', 'grey darken-1'],
    editing: null,
    editingIndex: -1,
    items: [
      {
        text: '重要',
        color: 'blue',
      },
      {
        text: '紧急',
        color: 'deep-purple',
      },
      {
        text: '隐私',
        color: 'red',
      },
    ],
    nonce: 1,
    menu: false,
    x: 0,
    search: null,
    y: 0,
    eventRelationLists: ['一号任务','二号任务','三号任务','四号任务'],
    eventTeamLists: ['蒋冠初','尹叶龙','张伟男','郭燕燕'],
    eventForm: {
      eventId: '',
      eventName: null,
      eventContent: '',
      eventDates: [],
      eventTime: ['', ''],
      eventRepeats: '',
      eventModel: [],
      eventRelationListOKR:[],
      eventRelationListIPMP: [],
      eventTeamList: [],
      done: false
    },
    //ipmp
    ipmpName: '',
    ipmpUnit: '',
    ipmpWorkContent: '',
    ipmpWorkTime: '',
    ipmpWorktype: '',
    ipmpRelation: [],
    ipmpNameList: ['A系统2022维护任务集','B系统2022维护任务集'],
    ipmpUnitList: ['xx系统功能开发优化','xx系统日常测试任务','xx系统日常维护任务'],
    ipmpWorktypeList: ['需求开发','需求优化','需求设计','安全测试','性能测试', '投产准备', '代码评审', '项目管理', '日常工作', '其他工作'],
    //email
    //team
    //chart

    chart1: '',
    chart2: '',
    chart3: '',
    chart4: '',
    rules1: [v => v.length <= 100 || '超过100字'],
    rules2: [v => v.length <= 100 || '超过100字'],
    rules3: [v => v.length <= 100 || '超过100字'],
    rules4: [v => v.length <= 100 || '超过100字'],

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
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

    //

  }),
  computed: {
    completedTasks () {
      return this.events.filter(event => event.done).length
    },
    progress () {
      return this.completedTasks / this.events.length * 100
    },
    remainingTasks () {
      return this.events.length - this.completedTasks
    },
    computertype () {
      if(this.type == 'month'){
        return '本月'
      }else if (this.type == 'week'){
        return '本周'
      }else {
        return '今天'
      }
    },
    ipmpAll(){
      if(this.type == 'month'){
        return 144
      }else if (this.type == 'week'){
        return 56
      }else {
        return 8
      }
    },
    ipmpShenyu(){
      return this.ipmpAll - this.ipmpAlready
    },
    ipmpAlready(){
      if(this.type == 'month'){
        return 16
      }else if (this.type == 'week'){
        return 16
      }else {
        return 0
      }
    },
    emailAll(){
      if(this.type == 'month'){
        return 80
      }else if (this.type == 'week'){
        return 30
      }else {
        return 10
      }
    },
    emailShenyu(){
      return this.emailAll - this.emailAlready
    },
    emailAlready(){
      if(this.type == 'month'){
        return 62
      }else if (this.type == 'week'){
        return 18
      }else {
        return 0
      }
    },
    xlabels(){
      if(this.type == 'month'){
        return ['1', '5', '10', '15', '20', '25', '30']
      }else if (this.type == 'week'){
        return ['1', '2', '3', '4', '5', '6', '7']
      }else {
        return ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm']
      }
    },
    yvalue(){
      if(this.type == 'month'){
        return [100, 82, 55, 43, 22, 9, 0,]
      }else if (this.type == 'week'){
        return [70, 65, 62, 32, 22, 3, 0, 0,]
      }else {
        return [10, 10, 10, 10, 7, 4, 0, 0,]
      }
    },
  },
  watch:{
    'eventForm.eventModel' (val, prev) {
      if (val.length === prev.length) return

      this.eventForm.eventModel = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
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
    add(){
      let  event = {}
      event.name = this.eventForm.eventName
      event.start = this.eventForm.eventTime[0]
      event.end = this.eventForm.eventTime[1]
      event.color = this.colors[this.rnd(0, this.colors.length - 1)]
      event.timed = true
      console.log(this.eventForm)
      console.log(this.eventForm.eventTime)
      this.events.push(event)
      console.log(this.events)
    },
    cancelAdd(){
      this.showNewEvent = false
    },
    expandNewEvent(){
      this.showNewEvent = true
    },
    ifineventExpanValue(v){
      return this.eventExpanValue.indexOf(v) > -1
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
    reserve(){

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
      // this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    addEvent(){
      console.log('addEvent')
    },
    preAdd(day){
      console.log('preAdd',day)
      // let preEvent = {
      //   name: '新建事项',
      //   start: day.date + ' 00:00',
      //   end: day.date + ' 23:59',
      //   color: 'grey',
      //   timed: false
      // }
      // this.events.push(preEvent)

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
/deep/ .v-expansion-panel-content__wrap{
  padding: 0px 0px;
}
/deep/ .v-expansion-panel-content{
  padding: 8px 8px;
}
/deep/ .el-input__inner{
    border: 2px solid #DCDFE6;
}
/deep/ .el-input.is-focus{
  border-color: rgb(167, 14, 214);
}
</style>