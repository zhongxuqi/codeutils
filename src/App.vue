<template>
  <b-container class="cu-app" fluid style="padding:0rem">
    <b-row style="height:100%;width:100%;padding:0rem;margin:0rem">
      <b-col class="cu-app-sidebar" style="padding:0rem">
        <h4 class="cu-app-sidebar-logo"><b>Code</b>Utils</h4>
        <SideBarItem v-bind:title="textJsonUtils" icon="icon-json" iconSize="1" v-bind:active="route==='json'" v-on:select="changeRoute('json')"/>
        <SideBarItem v-bind:title="textSQLUtils" icon="icon-database" iconSize="1" v-bind:active="route==='sql'" v-on:select="changeRoute('sql')"/>
        <SideBarItem v-bind:title="textStringUtils" icon="icon-code" iconSize="1" v-bind:active="route==='string'" v-on:select="changeRoute('string')"/>
        <SideBarItem v-bind:title="textGoLangUtils" icon="icon-google" iconSize="1" v-bind:active="route==='golang'" v-on:select="changeRoute('golang')"/>
      </b-col>
      <b-col cols="10" class="cu-app-body" style="padding:0rem">
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SideBarItem from './components/SideBarItem'
import Language from './utils/language'

export default {
  name: 'app',
  components: {
    SideBarItem,
  },
  data: function() {
    return {
      textJsonUtils: Language.getLanguageText('json_utils'),
      textSQLUtils: Language.getLanguageText('sql_utils'),
      textStringUtils: Language.getLanguageText('string_utils'),
      textGoLangUtils: Language.getLanguageText('golang_utils'),

      route: 'json',
    }
  },
  methods: {
    changeRoute: function(newRoute) {
      this.route = newRoute
      this.$router.push(this.route)
    },
  },
  mounted: function() {
    this.route = this.$router.history.current.fullPath.split('/')[1]
  },
  watch: {
    
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

.cu-app-body {
  overflow-x: scroll;
}

.cu-app-body::-webkit-scrollbar {
  width: 0 !important;
}

.vue-codemirror-wrap {
  height: 100%;
}

.CodeMirror {
  border: 1px solid #eee;
  height: 100% !important;
}

.cu-errormsg .CodeMirror {
  color: #dc3545;
}
</style>
