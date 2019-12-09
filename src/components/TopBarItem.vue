<template>
  <div class="cu-topbar-item clearfix" v-bind:class="{active:active===true}" v-on:click="onclick" v-bind:styele="{'line-height':lineheight+'rem'}">
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
  color: black;
  background-color: white;
  cursor: pointer;
  position: relative;
  padding: 0rem 0.5rem;
}

.cu-topbar-item:hover {
  background-color: #f4f4f5;
}

.cu-topbar-item.active {
  background-color: #f4f4f5;
  border-top: 0.2rem solid rgba(0, 0, 0, 0);
  border-bottom: 0.2rem solid #111111;
}

.cu-topbar-item-icon {
  float: left;
  line-height: 3rem;
  margin-right: 0.2rem;
}

.cu-topbar-item-text {
  float: left;
  line-height: 3rem;
}
</style>