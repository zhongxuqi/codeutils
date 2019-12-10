<template>
  <form class="cu-time-form" autocomplete="off">
    <div>
      <h5>{{textTimestamp2datetime}}</h5>
      <div class="cu-time-form-row">
        <b-input-group class="cu-time-form-row-left">
          <b-form-input v-model="timestampInput" v-bind:placeholder="textInputTimestampHint"></b-form-input>
          <template v-slot:append>
            <b-dropdown v-bind:text="timestampTypes[timestampTypeIndex].desc" variant="success">
              <b-dropdown-item v-for="(timestampType,index) in timestampTypes" v-bind:key="timestampType.type" v-on:click="onChangeTimestampType(index, 'timestamp')">{{timestampType.desc}}</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-input-group>
        <b-input-group class="cu-time-form-row-right">
          <b-form-input v-model="timestampOutput" style="background-color:white" disabled></b-form-input>
        </b-input-group>
      </div>
    </div>
    <div>
      <h5>{{textDatetime2timestamp}}</h5>
      <div class="cu-time-form-row">
        <b-input-group class="cu-time-form-row-left">
          <b-form-input v-model="datetimeInput" v-bind:placeholder="textInputDatetimeHint"></b-form-input>
        </b-input-group>
        <b-input-group class="cu-time-form-row-right">
          <b-form-input v-model="datetimeOutput" style="background-color:white" disabled></b-form-input>
          <template v-slot:append>
            <b-dropdown v-bind:text="timestampTypes[timestampTypeIndex].desc" variant="success">
              <b-dropdown-item v-for="(timestampType,index) in timestampTypes" v-bind:key="timestampType.type" v-on:click="onChangeTimestampType(index, 'datetime')">{{timestampType.desc}}</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-input-group>
      </div>
      <div style="height:10rem"></div>
    </div>
  </form>
</template>

<script>
import Language from '../utils/language'

export default {
  name: 'RouterTime',
  components: {
    
  },
  data: function() {
    return {
      textTimestamp2datetime: Language.getLanguageText('timestamp2datetime'),
      textDatetime2timestamp: Language.getLanguageText('datetime2timestamp'),
      textInputTimestampHint: Language.getLanguageText('input_timestamp_hint'),
      textInputDatetimeHint: Language.getLanguageText('input_datetime_hint'),

      timestampTypes: [{
        type: 'second',
        desc: Language.getLanguageText('second'),
      }, {
        type: 'milisecond',
        desc: Language.getLanguageText('milisecond'),
      }],
      timestampTypeIndex: 0,

      timestampInput: '',
      timestampOutput: '',

      datetimeTypeIndex: 0,
      datetimeInput: '',
      datetimeOutput: '',
      datetimeFormats: ['YYYY-MM-DD HH:mm:ss.SS', 'YYYY-MM-DD HH:mm:ss']
    }
  },
  methods: {
    onChangeTimestampType: function(index, type) {
      switch (type) {
        case 'timestamp':
          this.timestampTypeIndex = index
          this.refreshTimestampOutput()
          break
        case 'datetime':
          this.datetimeTypeIndex = index
          this.refreshDatetimeoutput()
          break
      }
    },
    refreshTimestampOutput: function() {
      switch (this.timestampTypes[this.timestampTypeIndex].type) {
        case 'second':
          this.timestampOutput = moment.unix(Number(this.timestampInput)).format('YYYY-MM-DD HH:mm:ss.SS')
          break
        case 'milisecond':
          this.timestampOutput = moment(Number(this.timestampInput)).format('YYYY-MM-DD HH:mm:ss.SS')
          break
      }
    },
    refreshDatetimeoutput: function() {
      switch (this.timestampTypes[this.datetimeTypeIndex].type) {
        case 'second':
          this.datetimeOutput = moment(this.datetimeInput).unix()
          break
        case 'milisecond':
          this.datetimeOutput = moment(this.datetimeInput).valueOf()
          break
      }
    },
  },
  watch: {
    timestampInput: function() {
      this.refreshTimestampOutput()
    },
    datetimeInput: function() {
      this.refreshDatetimeoutput()
    },
  },
}
</script>

<style>
.cu-time-form {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cu-time-form-row {
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.cu-time-form-row-left {
  flex: 1;
}

.cu-time-form-row-right {
  width: 18rem;
  margin-left: 1rem;
}
</style>