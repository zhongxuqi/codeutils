<template>
  <div class="cu-sidebar-item clearfix" v-bind:class="{active:active===true}" v-on:click="onclick">
    <div class="cu-sidebar-item-icon"><i class="iconfont" v-bind:class="iconClass" v-bind:style="{'font-size':iconSize+'rem'}"></i></div>
    <div class="cu-sidebar-item-text">{{ title }}</div>
    <div class="cu-sidebar-item-cursor"></div>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    title: String,
    icon: String,
    iconSize: String,
    active: Boolean,
  },
  computed: {
    iconClass: function() {
      var c = {}
      c[this.icon] = true
      return c
    },
  },
  methods: {
    onclick: function() {
      this.$emit('select')
    },
  },
}
</script>

<style>
.cu-sidebar-item {
  font-size: 1.0rem;
  box-sizing: border-box;
  vertical-align: middle;
  color: black;
  background-color: white;
}

.cu-sidebar-item:hover {
  background-color: #f4f4f5;
}

.cu-sidebar-item.active {
  background-color: #f4f4f5;
}

.cu-sidebar-item-icon {
  float: left;
  line-height: 3rem;
  margin-left: 2rem;
  margin-right: 0.5rem;
}

.cu-sidebar-item-text {
  float: left;
  line-height: 3rem;
}

.cu-sidebar-item-cursor {
  float: right;
  height: 3rem;
  background-color: #111111;
}

.cu-sidebar-item.active .cu-sidebar-item-cursor {
  width: 0.2rem;
}
</style>