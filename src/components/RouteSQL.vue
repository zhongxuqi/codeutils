<template>
  <form class="cu-sql-form" autocomplete="off">
    <div class="cu-sql-form-body">
      <div class="cu-sql-form-body-left">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="leftValue"
          v-on:input="onInput($event, 'left')"
        ></codemirror>
      </div>
      <div class="cu-sql-form-body-right">
        <div class="cu-sql-form-body-right-menu">
          <div class="cu-sql-form-body-right-actions">
            <RightActions height="3" v-bind:currAction="action" v-bind:actions="actions" v-on:select="onActionChange"/>
          </div>
          <b-button variant="outline-warning" size="sm" style="margin: 0rem 1rem" v-on:click="onIsBug">{{textIsThisBug}}</b-button>
        </div>
        <div class="cu-sql-form-body-right-body">
          <codemirror v-bind:class="{'cu-errormsg':rightError!=''}"
            v-bind:options="codeMirrorOptions"
            v-bind:value="rightError!=''?rightError:rightValue"
            v-on:input="onInput($event, 'right')"
          ></codemirror>
        </div>
      </div>
    </div>
    <b-modal ref="modal-sql-bug" v-bind:title="textSubmitBug" v-on:ok="sendBug">
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

export default {
  name: 'RouterSQL',
  components: {
    RightActions,
  },
  data: function() {
    return {
      textSqlFormat: Language.getLanguageText('sql_format'),
      textSqlCompress: Language.getLanguageText('sql_compress'),
      textIsThisBug: Language.getLanguageText('is_this_bug'),
      textSubmitBug: Language.getLanguageText('submit_bug'),
      textInputBugHint: Language.getLanguageText('input_bug_hint'),
      textThankBug: Language.getLanguageText('thank_bug'),

      actions: [{
        action: 'formatSql',
        text: Language.getLanguageText('sql_format'),
      }, {
        action: 'compressSql',
        text: Language.getLanguageText('sql_compress'),
      }],

      leftValue: '',
      rightValue: '',
      rightError: '',
      action: 'formatSql',

      codeMirrorOptions: {
        mode: {
          name: 'text/x-sql',
          json: true,
        },
        lineNumbers: true,
        theme: 'idea',
        lineWrapping: true,
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
      this.$refs['modal-sql-bug'].show()
    },
    sendBug: function() {
      this.$http.post('/openapi/codeutils', {
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
.cu-sql-form {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.cu-sql-form-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-sql-form-body-left {
  flex: 40;
  width: 0rem;
  height: 100%;
}

.cu-sql-form-body-right {
  flex: 60;
  width: 0rem;
  height: 100%;
}

.cu-sql-form-body-right-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cu-sql-form-body-right-actions {
  flex: 1;
  border-bottom: 1px solid #eee;
}

.cu-sql-form-body-right-body {
  height: calc(100% - 3rem);
  width: 100%;
}
</style>