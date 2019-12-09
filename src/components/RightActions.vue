<template>
  <div class="cu-right-actions" v-bind:style="{'height': height+'rem'}">
    <div class="cu-right-actions-item" v-for="actionItem in actions" v-bind:key="actionItem.action">
      <BtnAction v-bind:text="actionItem.text" v-bind:lineheight="height" v-bind:active="currAction===actionItem.action" v-on:select="onActionChange(actionItem.action)"/>
    </div>
  </div>
</template>

<script>
import BtnAction from './BtnAction'

export default {
  name: 'RightActions',
  components: {
    BtnAction,
  },
  props: {
    height: String,
    currAction: String,
    actions: Array,
  },
  methods: {
    onActionChange: function(action) {
      this.$emit('select', {
        action: action,
      })
    },
  },
}
</script>

<style>
.cu-right-actions {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  vertical-align: middle;
}

.cu-right-actions::-webkit-scrollbar {
  display: none !important;
}

.cu-right-actions-item {
  display: inline-block;
}
</style>