<template>
  <form class="cu-json-form" autocomplete="off">
    <div class="cu-json-form-body">
      <div class="cu-json-form-body-left">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="leftValue"
          v-on:input="onInput($event, 'left')"
        ></codemirror>
      </div>
      <div class="cu-json-form-body-right">
        <div class="cu-json-form-body-right-actions">
          <RightActions height="3" v-bind:currAction="action" v-bind:actions="actions" v-on:select="onActionChange"/>
        </div>
        <div class="cu-json-form-body-right-body">
          <codemirror v-bind:class="{'cu-errormsg':rightError!=''}"
            v-bind:options="codeMirrorOptions"
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
  </form>
</template>

<script>
import Language from '../utils/language'
import Action from '../utils/Action'
import RightActions from './RightActions'

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
      }],

      leftValue: '',
      rightValue: '',
      rightError: '',
      action: 'formatJson',

      codeMirrorOptions: {
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
      },

      bugIndex: 0,
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
    onIsBug: function(index) {
      this.bugIndex = index
      this.$refs['modal-json-bug'].show()
    },
    sendBug: function() {
      this.$http.post('/openapi/codeutils', {
        type: 2,
        context: JSON.stringify({
          index: this.bugIndex,
          cells: this.jsonCells,
        }),
        message: this.bugMessage,
      }).then((function() {
        this.bugIndex = 0
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
  height: 100%;
}

.cu-json-form-body-right {
  flex: 60;
  height: 100%;
}

.cu-json-form-body-right-actions {
  border-bottom: 1px solid #eee;
}

.cu-json-form-body-right-body {
  height: calc(100% - 3rem);
  width: 100%;
}
</style>