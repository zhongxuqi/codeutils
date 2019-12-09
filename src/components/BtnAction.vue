<template>
  <div class="cu-btn-action" v-bind:class="{active:active===true}" v-on:click="onclick" v-bind:style="{'line-height':lineheight+'rem'}">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'BtnAction',
  props: {
    lineheight: String,
    text: String,
    active: Boolean,
  },
  methods: {
    onclick: function() {
      this.$emit('select')
    },
  },
}
</script>

<style>
.cu-btn-action {
  box-sizing: border-box;
  vertical-align: middle;
  color: #999;
  background-color: white;
  cursor: pointer;
  padding: 0rem 1rem;
}

.cu-btn-action:hover {
  color: #4CAF50;
}

.cu-btn-action.active {
  color: #4CAF50;
}
</style>