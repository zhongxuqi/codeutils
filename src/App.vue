<template>
  <b-container class="cu-app" fluid style="padding:0rem">
    <b-row style="height:100%;width:100%;padding:0rem;margin:0rem">
      <b-col class="cu-app-sidebar" style="padding:0rem">
        <h4 class="cu-app-sidebar-logo">
          <i class="iconfont icon--daimashengcheng" style="font-size:2rem;margin-right:1rem"></i>
          <b>Code</b>Utils
        </h4>
        <SideBarItem v-bind:title="textJsonUtils" icon="icon-json" iconSize="1" v-bind:active="route==='json'" v-on:select="changeRoute('json')"/>
        <SideBarItem v-bind:title="textSQLUtils" icon="icon-database" iconSize="1" v-bind:active="route==='sql'" v-on:select="changeRoute('sql')"/>
        <SideBarItem v-bind:title="textStringUtils" icon="icon-code" iconSize="1" v-bind:active="route==='string'" v-on:select="changeRoute('string')"/>
        <SideBarItem v-bind:title="textGoLangUtils" icon="icon-google" iconSize="1" v-bind:active="route==='golang'" v-on:select="changeRoute('golang')"/>
        <SideBarItem v-bind:title="textAdvise" icon="icon-help" iconSize="1" v-on:select="openAdvise"/>
      </b-col>
      <b-col cols="10" class="cu-app-body" style="padding:0rem">
        <router-view></router-view>
      </b-col>
    </b-row>
    <b-modal ref="modal-advise" v-bind:title="textAdvise" v-on:ok="sendAdviseMessage">
      <b-form-textarea
        v-model="adviseValue"
        v-bind:placeholder="textInputAdviseHint"
      ></b-form-textarea>
    </b-modal>
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
      textAdvise: Language.getLanguageText('advise'),
      textInputAdviseHint: Language.getLanguageText('input_advise_hint'),
      textThankAdvise: Language.getLanguageText('thank_advise'),

      route: 'json',

      adviseValue: '',
    }
  },
  methods: {
    changeRoute: function(newRoute) {
      this.route = newRoute
      this.$router.push(this.route)
    },
    openAdvise: function() {
      this.$refs['modal-advise'].show()
    },
    sendAdviseMessage: function() {
      if (this.adviseValue == '') return
      this.$http.post('/openapi/codeutils', {
        type: 1,
        context: '',
        message: this.adviseValue,
      }).then((function() {
        this.adviseValue = ''
        this.$snotify.success(Language.getLanguageText('thank_advise'))
      }).bind(this))
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
