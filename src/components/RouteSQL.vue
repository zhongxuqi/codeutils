<template>
  <form class="cu-sql-form" autocomplete="off">
    <div class="clearfix cu-sql-form-cell" style="height:100%" v-for="(textareaCell, index) in textareaCells" :key='index'>
      <FormTextarea v-bind:codeMirrorOptions="codeMirrorOptions" v-bind:errmsg="textareaCell.errmsg" 
        v-bind:value="textareaCell.errmsg!=''?textareaCell.errmsg:textareaCell.value"
        v-bind:enableClose="textareaCells.length>1"
        v-on:textchange="onInput($event, index)"
        v-on:close="closeTextarea(index)"
        v-on:isbug="onIsBug(index)"/>
      <div class="cu-sql-form-actions">
        <div class="cu-sql-form-actions-list">
          <div class="cu-sql-form-actions-item">
            <b-button variant="outline-primary" :pressed="textareaCell.action=='formatSql'" v-on:click="onActionChange(index, 'formatSql')">{{textSqlFormat}}</b-button>
          </div>
          <div class="cu-sql-form-actions-item">
            <b-button variant="outline-primary" :pressed="textareaCell.action=='compressSql'" v-on:click="onActionChange(index, 'compressSql')">{{textSqlCompress}}</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix cu-sql-form-cell" style="height:100%">
      <DisableFormTextarea/>
    </div>
    <b-modal ref="modal-sql-bug" v-bind:title="textSubmitBug" v-on:ok="sendBug">
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
import FormTextarea from './FormTextarea'
import DisableFormTextarea from './DisableFormTextarea'

export default {
  name: 'RouterSQL',
  components: {
    FormTextarea,
    DisableFormTextarea,
  },
  data: function() {
    return {
      textSqlFormat: Language.getLanguageText('sql_format'),
      textSqlCompress: Language.getLanguageText('sql_compress'),
      textSubmitBug: Language.getLanguageText('submit_bug'),
      textInputBugHint: Language.getLanguageText('input_bug_hint'),
      textThankBug: Language.getLanguageText('thank_bug'),

      textareaCells: [{
        value: '',
        action: 'formatSql',
        errmsg: '',
      }, {
        value: '',
        action: '',
        errmsg: '',
      }],

      codeMirrorOptions: {
        mode: {
          name: 'text/x-sql',
          json: true,
        },
        lineNumbers: true,
        theme: 'idea',
      },

      bugIndex: 0,
      bugMessage: '',
    }
  },
  methods: {
    onInput: function(value, index) {
      var textareaCells = [...this.textareaCells]
      textareaCells[index].value = value
      this.refreshValues(textareaCells, index)
      this.textareaCells = textareaCells
    },
    onActionChange(index, newAction) {
      var textareaCells = [...this.textareaCells]
      textareaCells[index].action = newAction
      this.refreshValues(textareaCells, index)
      this.textareaCells = textareaCells
    },
    refreshValues: function(textareaCells, index) {
      for (var i=index + 1;i<textareaCells.length;i++) {
        if (textareaCells[i-1].action == "") break
        if (textareaCells[i-1].value == "") break
        try {
          textareaCells[i].value = Action.do(textareaCells[i-1].value, textareaCells[i-1].action)
          textareaCells[i].errmsg = ''
        } catch (e) {
          textareaCells[i].errmsg = e.message
          break
        }
      }
      if (index == textareaCells.length - 1) {
        if (textareaCells[index].action == "") return
        var actionRet = ''
        var errmsg = ''
        try {
          actionRet = Action.do(textareaCells[index].value, textareaCells[index].action)
        } catch (e) {
          errmsg = e.message
        }
        textareaCells.push({
          value: actionRet,
          action: '',
          errmsg: errmsg,
        })
      }
    },
    closeTextarea: function(index) {
      var textareaCells = []
      for (var i=0;i<this.textareaCells.length;i++) {
        if (i == index) continue
        textareaCells.push(this.textareaCells[i])
      }
      var startIndex = index - 1
      if (startIndex < 0) {
        startIndex = 0
      }
      this.refreshValues(textareaCells, startIndex)
      this.textareaCells = textareaCells
    },
    onIsBug: function(index) {
      this.bugIndex = index
      this.$refs['modal-sql-bug'].show()
    },
    sendBug: function() {
      this.$http.post('/openapi/codeutils', {
        type: 2,
        context: JSON.stringify({
          index: this.bugIndex,
          cells: this.textareaCells,
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
.cu-sql-form {
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  vertical-align: top;
}

.cu-sql-form-cell {
  display: inline-block;
  height: 100%;
  vertical-align: top;
}

.cu-sql-form-textarea {
  width: 40rem;
  height: 100% !important;
  display: inline-block;
}

.cu-sql-form-actions {
  display: inline-block;
  height: 100%;
  margin: 0rem 2rem;
  vertical-align: top;
}

.cu-sql-form-actions-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:Center;
}

.cu-sql-form-actions-item {
  padding: 0rem;
  margin-bottom: 2rem;
}

.cu-sql-form-actions-item:last-child {
  margin-bottom: 0rem;
}

.cu-sql-form-textarea.disable .CodeMirror {
  background-color: #e9ecef;
}
</style>