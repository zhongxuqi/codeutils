<template>
  <form class="cu-string-form" autocomplete="off">
    <div class="cu-string-form-body">
      <div class="cu-string-form-body-left">
        <codemirror
          v-bind:options="codeMirrorOptionsLeft"
          v-bind:value="leftValue"
          v-on:input="onInput($event, 'left')"
        ></codemirror>
      </div>
      <div class="cu-string-form-body-right">
        <div class="cu-string-form-body-right-menu">
          <div class="cu-string-form-body-right-actions">
            <RightActions height="2.5" v-bind:currAction="action" v-bind:actions="actions" v-on:select="onActionChange"/>
          </div>
          <b-button variant="outline-warning" size="sm" style="margin: 0rem 0.5rem" v-on:click="onIsBug">{{textIsThisBug}}</b-button>
        </div>
        <div class="cu-string-form-body-right-body">
          <codemirror v-bind:class="{'cu-errormsg':rightError!=''}"
            v-bind:options="codeMirrorOptionsRight"
            v-bind:value="rightError!=''?rightError:rightValue"
            v-on:input="onInput($event, 'right')"
          ></codemirror>
        </div>
      </div>
    </div>

    <b-modal ref="modal-string-bug" v-bind:title="textSubmitBug" v-on:ok="sendBug">
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
  name: 'RouterString',
  components: {
    RightActions,
  },
  data: function() {
    return {
      textEncodeURL: Language.getLanguageText('encode_url'),
      textDecodeURL: Language.getLanguageText('decode_url'),
      textEncodeUnicode: Language.getLanguageText('encode_unicode'),
      textDecodeUnicode: Language.getLanguageText('decode_unicode'),
      textIsThisBug: Language.getLanguageText('is_this_bug'),
      textSubmitBug: Language.getLanguageText('submit_bug'),
      textInputBugHint: Language.getLanguageText('input_bug_hint'),
      textThankBug: Language.getLanguageText('thank_bug'),

      actions: [{
        action: 'encodeURL',
        text: Language.getLanguageText('encode_url'),
      }, {
        action: 'decodeURL',
        text: Language.getLanguageText('decode_url'),
      }, {
        action: 'encodeUnicode',
        text: Language.getLanguageText('encode_unicode'),
      }, {
        action: 'decodeUnicode',
        text: Language.getLanguageText('decode_unicode'),
      }],

      leftValue: '',
      rightValue: '',
      rightError: '',
      action: 'encodeURL',

      codeMirrorOptionsLeft: {
        mode: {
          name: 'text',
          json: true,
        },
        lineNumbers: true,
        theme: 'idea',
        lineWrapping: true,
      },
      codeMirrorOptionsRight: {
        mode: {
          name: 'text',
          json: true,
        },
        lineNumbers: true,
        theme: 'idea',
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
      this.$refs['modal-string-bug'].show()
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
        this.bugIndex = 0
        this.bugMessage = ''
        this.$snotify.success(Language.getLanguageText('thank_bug'))
      }).bind(this))
    },
  },
}
</script>

<style>
.cu-string-form {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.cu-string-form-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-string-form-body-left {
  flex: 40;
  width: 0rem;
  height: 100%;
}

.cu-string-form-body-right {
  flex: 60;
  width: 0rem;
  height: 100%;
}

.cu-string-form-body-right-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-string-form-body-right-actions {
  flex: 1;
  width: 0rem;
  border-right: 1px solid #eee;
}

.cu-string-form-body-right-body {
  height: calc(100% - 2.5rem);
  width: 100%;
}
</style>