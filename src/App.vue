<template>
  <b-container class="cu-app" fluid style="padding:0rem">
    <div class="cu-app-topbar">
      <h4 class="cu-app-topbar-logo">
        <i class="iconfont icon--daimashengcheng" style="font-size:1.7rem;margin-right:0.5rem"></i>
        <b>Code</b>Utils
      </h4>
      <div style="flex:1"></div>
      <div class="cu-app-topbar-menu">
        <TopBarItem v-bind:title="textJsonUtils" lineheight="3" icon="icon-json" iconSize="1" v-bind:active="route==='json'" v-on:select="changeRoute('json')"/>
        <TopBarItem v-bind:title="textSQLUtils" lineheight="3" icon="icon-database" iconSize="1" v-bind:active="route==='sql'" v-on:select="changeRoute('sql')"/>
        <TopBarItem v-bind:title="textStringUtils" lineheight="3" icon="icon-code" iconSize="1" v-bind:active="route==='string'" v-on:select="changeRoute('string')"/>
        <TopBarItem v-bind:title="textGoLangUtils" lineheight="3" icon="icon-google" iconSize="1" v-bind:active="route==='golang'" v-on:select="changeRoute('golang')"/>
        <TopBarItem v-bind:title="textAdvise" lineheight="3" icon="icon-help" iconSize="1" v-on:select="openAdvise"/>
      </div>
    </div>
    <div class="cu-app-content">
      <router-view></router-view>
    </div>
    <b-modal ref="modal-advise" v-bind:title="textAdvise" v-on:ok="sendAdviseMessage">
      <b-form-textarea
        v-model="adviseValue"
        v-bind:placeholder="textInputAdviseHint"
      ></b-form-textarea>
    </b-modal>
    <vue-snotify></vue-snotify>
  </b-container>
</template>

<script>
import TopBarItem from './components/TopBarItem'
import Language from './utils/language'

export default {
  name: 'app',
  components: {
    TopBarItem,
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
    if (this.route == "") {
      this.route = "json"
    }
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

.cu-app-topbar {
  box-sizing: border-box;
  height: 3rem;
  padding: 0rem;
  margin: 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.cu-app-topbar-logo {
  box-sizing: border-box;
  line-height: 3rem;
  margin: 0rem;
  padding: 0rem;
  margin-left: 1rem;
  color: #4CAF50;
}

.cu-app-topbar-menu {
  height: 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-app-content {
  height: calc(100% - 3rem);
  width: 100%;
  padding: 0rem;
  margin: 0rem;
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
  color: #dc3545 !important;
}
</style>
