<template>
  <b-container class="cu-app" fluid style="padding:0rem">
    <div class="cu-app-topbar">
      <h4 class="cu-app-topbar-logo">
        <i class="iconfont icon--daimashengcheng" style="font-size:1.7rem;margin-right:0.5rem"></i>
        <b>Code</b>Utils
      </h4>
      <b-dropdown v-bind:text="textLangDesc" size="sm" variant="outline-success" style="margin-left:1rem">
        <b-dropdown-item v-bind:href="'/'+route+'/en'">English</b-dropdown-item>
        <b-dropdown-item v-bind:href="'/'+route+'/zh'">中文</b-dropdown-item>
      </b-dropdown>
      <div style="flex:1"></div>
      <div class="cu-app-topbar-menu">
        <TopBarItem v-bind:title="textJsonUtils" lineheight="2.5" icon="icon-json" iconSize="1" v-bind:active="route==='json'" v-on:select="changeRoute('json')"/>
        <TopBarItem v-bind:title="textSQLUtils" lineheight="2.5" icon="icon-database" iconSize="1" v-bind:active="route==='sql'" v-on:select="changeRoute('sql')"/>
        <TopBarItem v-bind:title="textStringUtils" lineheight="2.5" icon="icon-code" iconSize="1" v-bind:active="route==='string'" v-on:select="changeRoute('string')"/>
        <TopBarItem v-bind:title="textGoLangUtils" lineheight="2.5" icon="icon-google" iconSize="1" v-bind:active="route==='golang'" v-on:select="changeRoute('golang')"/>
        <TopBarItem v-bind:title="textTimestamp" lineheight="2.5" icon="icon-icon-time" iconSize="1" v-bind:active="route==='time'" v-on:select="changeRoute('time')"/>
        <TopBarItem v-bind:title="textTextDiff" lineheight="2.5" icon="icon-compare" iconSize="1" v-bind:active="route==='diff'" v-on:select="changeRoute('diff')"/>
        <TopBarItem v-bind:title="textAdvise" lineheight="2.5" icon="icon-help" iconSize="1" v-on:select="openAdvise"/>
      </div>
    </div>
    <div class="cu-app-content">
      <router-view></router-view>
    </div>
    <div class="cu-app-footer">
      <b-container>
        <b-row style="line-height:1.5rem">
          Copyright © 2019-2020.CodeUtils All rights reserved. <a href="http://www.beian.miit.gov.cn">浙ICP备18002047号-3</a>
        </b-row>
      </b-container>
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
import Consts from './common/Consts'

export default {
  name: 'app',
  components: {
    TopBarItem,
  },
  metaInfo: {
    title: Language.getLanguageText('mate_title'),
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'keywords',
        content: 'golang,json,sql,string,timestamp,diff'
      },
    ]
  },
  data: function() {
    return {
      textLangDesc: Language.getLanguageDesc(),
      textJsonUtils: Language.getLanguageText('json_utils'),
      textSQLUtils: Language.getLanguageText('sql_utils'),
      textStringUtils: Language.getLanguageText('string_utils'),
      textGoLangUtils: Language.getLanguageText('golang_utils'),
      textAdvise: Language.getLanguageText('advise'),
      textInputAdviseHint: Language.getLanguageText('input_advise_hint'),
      textThankAdvise: Language.getLanguageText('thank_advise'),
      textTimestamp: Language.getLanguageText('timestamp'),
      textTextDiff: Language.getLanguageText('text_diff'),

      route: 'json',

      adviseValue: '',
    }
  },
  methods: {
    changeRoute: function(newRoute) {
      this.route = newRoute
      var nextRoute = this.route
      var lang = Language.getLanguage();
      if (lang !== "") {
        nextRoute = nextRoute + "/" + lang
      }
      this.$router.push({path:"/" + nextRoute})
    },
    openAdvise: function() {
      this.$refs['modal-advise'].show()
    },
    sendAdviseMessage: function() {
      if (this.adviseValue == '') return
      this.$http.post('/openapi/codeutils', {
        app_id: Consts.AppID,
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
  height: 2.5rem;
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
  line-height: 2.5rem;
  margin: 0rem;
  padding: 0rem;
  margin-left: 1rem;
  color: #4CAF50;
}

.cu-app-topbar-menu {
  flex: 1;
  height: 2.5rem;
  box-sizing: border-box;
  text-align: right;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.cu-app-topbar-menu::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
}

.cu-app-topbar-menu * {
  display: inline-block;
}

.cu-app-content {
  height: calc(100% - 4rem);
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

.cu-app-footer {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.8rem;
}

.cu-app-footer a {
  display: inline-block;
  margin-left: 1rem;
}

.vue-codemirror-wrap {
  height: 100%;
}

.CodeMirror {
  border: 1px solid #eee;
  height: 100% !important;
  font-size: 0.8rem;
}

.cu-errormsg .CodeMirror {
  color: #dc3545 !important;
}
</style>
