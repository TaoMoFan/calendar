<template>
  <v-card>
    <v-card-title>
      <v-btn>123</v-btn>
      <v-input
          prepend-icon="mdi-minus"
          hide-details="auto"
          @click:prepend="prependIconCallback"
        >
          Default Slot
        </v-input>
    </v-card-title>
    <v-btn-toggle>
  <v-btn @click="change('1')">1</v-btn>
  <v-btn >1</v-btn>
  <v-btn>1</v-btn>
  <v-btn>1</v-btn>
    </v-btn-toggle>
    <v-sheet v-if="type === '1'" style="background-color: burlywood;height: 100px"></v-sheet>
    
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      type: '1',
      tab: null,
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
