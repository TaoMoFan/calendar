<template>
  <v-card width="30%">
    <v-row justify="center">
      <v-expansion-panels accordion focusable multiple v-model="eventExpanValue">
        <v-expansion-panel
            v-for="(item,i) in items"
            :key="i"
        >
          <v-expansion-panel-header>{{ item.tab }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ item.content }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      type: '1',
      tab: null,
      eventExpanValue: [],
      eventFormc: {
        eventName: null,
        eventContent: '',
        eventDates: [],
        eventTime: ['', ''],
        eventRepeats: '',
        eventModel: [],
        eventRelationListOKR:[],
        eventRelationListIPMP: [],
        eventTeamList: [],
      },
      items: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Two', content: 'Tab 2 Content' },
        { tab: 'Three', content: 'Tab 3 Content' },
        { tab: 'Four', content: 'Tab 4 Content' },
        { tab: 'Five', content: 'Tab 5 Content' },
        { tab: 'Six', content: 'Tab 6 Content' },
        { tab: 'Seven', content: 'Tab 7 Content' },
        { tab: 'Eight', content: 'Tab 8 Content' },
        { tab: 'Nine', content: 'Tab 9 Content' },
        { tab: 'Ten', content: 'Tab 10 Content' },
      ],
    }
  },
  methods: {
    change(type){
      this.type = type
    },
    prependIconCallback(){
      alert('12')
    }
  }
}
</script>
