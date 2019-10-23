<template>
  <b-container class="cu-app" fluid style="padding:0rem">
    <b-row style="height:100%">
      <b-col class="cu-app-sidebar" style="padding:0rem">
        <h4 class="cu-app-sidebar-logo"><b>Code</b>Utils</h4>
        <SideBarItem v-bind:title="textJsonUtils" icon="icon-json" iconSize="1.1" v-bind:active="mode==='json'" v-on:select="changeMode('json')"/>
        <SideBarItem v-bind:title="textSQLUtils" icon="icon-database" iconSize="1.1" v-bind:active="mode==='sql'" v-on:select="changeMode('sql')"/>
        <SideBarItem v-bind:title="textGoLangUtils" icon="icon-google" iconSize="1.1" v-bind:active="mode==='golang'" v-on:select="changeMode('golang')"/>
      </b-col>
      <b-col cols="10" class="cu-app-body" style="padding:0rem">2 of 3 (wider)</b-col>
    </b-row>
  </b-container>
</template>

<script>
import SideBarItem from './components/SideBarItem';
import Language from './utils/language';

export default {
  name: 'app',
  components: {
    SideBarItem,
  },
  data: function() {
    return {
      textJsonUtils: Language.getLanguageText('json_utils'),
      textSQLUtils: Language.getLanguageText('sql_utils'),
      textGoLangUtils: Language.getLanguageText('golang_utils'),

      mode: 'json',
    }
  },
  methods: {
    changeMode: function(newMode) {
      this.mode = newMode
    },
  },
}
</script>

<style>
.cu-app {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}

.cu-app-sidebar {
  border-right: 1px solid #eee;
  height: 100%;
  overflow-y: scroll;
}

.cu-app-sidebar::-webkit-scrollbar {
  width: 0 !important;
}

.cu-app-sidebar-logo {
  box-sizing: border-box;
  margin: 1rem;
  text-align: center;
}

.cu-app-body::-webkit-scrollbar {
  width: 0 !important;
}
</style>
