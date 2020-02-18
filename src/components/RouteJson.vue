<template>
  <form class="cu-json-form" autocomplete="off">
    <div class="cu-json-form-body">
      <div class="cu-json-form-body-left">
        <codemirror
          v-bind:options="codeMirrorOptionsLeft"
          v-bind:value="leftValue"
          v-on:input="onInput($event, 'left')"
        ></codemirror>
      </div>
      <div class="cu-json-form-body-right">
        <div class="cu-json-form-body-right-menu">
          <div class="cu-json-form-body-right-actions">
            <RightActions height="2.5" v-bind:currAction="action" v-bind:actions="actions" v-on:select="onActionChange"/>
          </div>
          <b-button variant="outline-warning" size="sm" style="margin: 0rem 0.5rem" v-on:click="onIsBug">{{textIsThisBug}}</b-button>
        </div>
        <div class="cu-json-form-body-right-body">
          <codemirror v-bind:class="{'cu-errormsg':rightError!=''}"
            v-bind:options="codeMirrorOptionsRight"
            v-bind:value="rightError!=''?rightError:rightValue"
            v-on:input="onInput($event, 'right')"
          ></codemirror>
        </div>
      </div>
    </div>
    <b-modal ref="modal-json-bug" v-bind:title="textSubmitBug" v-on:ok="sendBug">
      <b-form-textarea
        v-model="bugMessage"
        v-bind:placeholder="textInputBugHint"
      ></b-form-textarea>
    </b-modal>
    <vue-snotify></vue-snotify>
  </form>
</template>

<script>
import Language from '../utils/language'
import Action from '../utils/Action'
import RightActions from './RightActions'
import Consts from '../common/Consts'

export default {
  name: 'RouterJson',
  components: {
    RightActions,
  },
  data: function() {
    return {
      textInputJsonHint: Language.getLanguageText('input_json_hint'),
      textJsonFormat: Language.getLanguageText('json_format'),
      textJsonCompress: Language.getLanguageText('json_compress'),
      textJsonEscape: Language.getLanguageText('json_escape'),
      textJsonUnescape: Language.getLanguageText('json_unescape'),
      textFullScreen: Language.getLanguageText('full_screen'),
      textIsThisBug: Language.getLanguageText('is_this_bug'),
      textSubmitBug: Language.getLanguageText('submit_bug'),
      textInputBugHint: Language.getLanguageText('input_bug_hint'),
      textThankBug: Language.getLanguageText('thank_bug'),

      actions: [{
        action: 'formatJson',
        text: Language.getLanguageText('json_format'),
      }, {
        action: 'compressJson',
        text: Language.getLanguageText('json_compress'),
      }, {
        action: 'escapeJson',
        text: Language.getLanguageText('json_escape'),
      }, {
        action: 'unescapeJson',
        text: Language.getLanguageText('json_unescape'),
      }, {
        action: 'unescapeAndFormatJson',
        text: Language.getLanguageText('json_unescape_and_format'),
      }, {
        action: 'compressAndEscapeJson',
        text: Language.getLanguageText('json_compress_and_escape'),
      }],

      leftValue: '',
      rightValue: '',
      rightError: '',
      action: 'formatJson',

      codeMirrorOptionsLeft: {
        mode: {
          name: 'text/javascript',
          json: true,
        },
        lineNumbers:true,
        foldGutter: true,
        gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
        lint: true,
        theme: 'idea',
        matchBrackets: true,
        lineWrapping: true,
      },
      codeMirrorOptionsRight: {
        mode: {
          name: 'text/javascript',
          json: true,
        },
        lineNumbers:true,
        foldGutter: true,
        gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
        lint: true,
        theme: 'idea',
        matchBrackets: true,
        lineWrapping: true,
        // readOnly: true,
      },

      bugMessage: '',
    }
  },
  methods: {
    onInput: function(value, type) {
      if (type == 'left') {
        this.leftValue = value
        this.refreshValues()
      } else {
        this.rightValue = value
      }
    },
    onActionChange(e) {
      this.action = e.action
      this.refreshValues()
    },
    refreshValues: function() {
      if (this.leftValue == '') {
        this.rightValue = ''
        this.rightError = ''
        return
      }
      var actionRet = ''
      var errmsg = ''
      try {
        actionRet = Action.do(this.leftValue, this.action)
      } catch (e) {
        errmsg = e.message
      }
      this.rightValue = actionRet
      this.rightError = errmsg
    },
    onIsBug: function() {
      this.$refs['modal-json-bug'].show()
    },
    sendBug: function() {
      this.$http.post('/openapi/codeutils', {
        app_id: Consts.AppID,
        type: 2,
        context: JSON.stringify({
          leftValue: this.leftValue,
          rightValue: this.rightValue,
          rightError: this.rightError,
          action: this.action,
        }),
        message: this.bugMessage,
      }).then((function() {
        this.bugMessage = ''
        this.$snotify.success(Language.getLanguageText('thank_bug'))
      }).bind(this))
    },
  },
}
</script>

<style>
.cu-json-form {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.cu-json-form-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-json-form-body-left {
  flex: 40;
  width: 0rem;
  height: 100%;
}

.cu-json-form-body-right {
  flex: 60;
  width: 0rem;
  height: 100%;
}

.cu-json-form-body-right-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-json-form-body-right-actions {
  flex: 1;
  width: 0rem;
  border-right: 1px solid #eee;
}

.cu-json-form-body-right-body {
  height: calc(100% - 2.5rem);
  width: 100%;
}
</style>