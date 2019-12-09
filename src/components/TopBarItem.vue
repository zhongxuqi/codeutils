<template>
  <div class="cu-topbar-item" v-bind:class="{active:active===true}" v-on:click="onclick" v-bind:style="{'height':lineheight+'rem','line-height':lineheight+'rem'}">
    <div class="cu-topbar-item-icon"><i class="iconfont" v-bind:class="iconClass" v-bind:style="{'font-size':iconSize+'rem'}"></i></div>
    <div class="cu-topbar-item-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'TopBarItem',
  props: {
    lineheight: String,
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
.cu-topbar-item {
  font-size: 1.0rem;
  box-sizing: border-box;
  vertical-align: middle;
  color: #999;
  background-color: white;
  cursor: pointer;
  position: relative;
  padding: 0rem 0.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0);
  border-bottom: 1px solid #eee;
}

.cu-topbar-item:hover {
  color: #4CAF50;
}

.cu-topbar-item.active {
  color: #4CAF50;
  border-top: 0.1rem solid rgba(0, 0, 0, 0);
  border-bottom: 0.1rem solid #4CAF50;
}

.cu-topbar-item-icon {
  float: left;
  margin-right: 0.2rem;
}

.cu-topbar-item-text {
  float: left;
}
</style>