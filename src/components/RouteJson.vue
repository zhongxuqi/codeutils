<template>
  <form class="cu-json-form" autocomplete="off">
    <div class="clearfix cu-json-form-cell" style="height:100%" v-for="(jsonCell, index) in jsonCells" :key='index'>
      <FormTextarea v-bind:codeMirrorOptions="codeMirrorOptions" v-bind:errmsg="jsonCell.errmsg" 
        v-bind:value="jsonCell.errmsg!=''?jsonCell.errmsg:jsonCell.value"
        v-bind:enableClose="jsonCells.length>1"
        v-on:textchange="onInput($event, index)"
        v-on:close="closeTextarea(index)"
        v-on:isbug="onIsBug(index)"/>
      <div class="cu-json-form-actions">
        <div class="cu-json-form-actions-list">
          <div class="cu-json-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='formatJson'" v-on:click="onActionChange(index, 'formatJson')">{{textJsonFormat}}</b-button>
          </div>
          <div class="cu-json-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='compressJson'" v-on:click="onActionChange(index, 'compressJson')">{{textJsonCompress}}</b-button>
          </div>
          <div class="cu-json-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='escapeJson'" v-on:click="onActionChange(index, 'escapeJson')">{{textJsonEscape}}</b-button>
          </div>
          <div class="cu-json-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='unescapeJson'" v-on:click="onActionChange(index, 'unescapeJson')">{{textJsonUnescape}}</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix cu-json-form-cell" style="height:100%">
      <DisableFormTextarea/>
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
import FormTextarea from './FormTextarea'
import DisableFormTextarea from './DisableFormTextarea'

export default {
  name: 'RouterJson',
  components: {
    FormTextarea,
    DisableFormTextarea,
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

      jsonCells: [{
        value: '',
        action: '',
        errmsg: '',
      }],

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
    onInput: function(value, index) {
      var jsonCells = [...this.jsonCells]
      jsonCells[index].value = value
      jsonCells[index].errmsg = ''
      this.refreshValues(jsonCells, index)
      this.jsonCells = jsonCells
    },
    onActionChange(index, newAction) {
      var jsonCells = [...this.jsonCells]
      jsonCells[index].action = newAction
      this.refreshValues(jsonCells, index)
      this.jsonCells = jsonCells
    },
    refreshValues: function(jsonCells, index) {
      for (var i=index + 1;i<jsonCells.length;i++) {
        if (jsonCells[i-1].action == "") break
        if (jsonCells[i-1].value == "") break
        try {
          jsonCells[i].value = Action.do(jsonCells[i-1].value, jsonCells[i-1].action)
          jsonCells[i].errmsg = ''
        } catch (e) {
          jsonCells[i].errmsg = e.message
          break
        }
      }
      if (index == jsonCells.length - 1) {
        if (jsonCells[index].action == "") return
        var actionRet = ''
        var errmsg = ''
        try {
          actionRet = Action.do(jsonCells[index].value, jsonCells[index].action)
        } catch (e) {
          errmsg = e.message
        }
        jsonCells.push({
          value: actionRet,
          action: '',
          errmsg: errmsg,
        })
      }
    },
    closeTextarea: function(index) {
      var jsonCells = []
      for (var i=0;i<this.jsonCells.length;i++) {
        if (i == index) continue
        jsonCells.push(this.jsonCells[i])
      }
      var startIndex = index - 1
      if (startIndex < 0) {
        startIndex = 0
      }
      this.refreshValues(jsonCells, startIndex)
      this.jsonCells = jsonCells
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
  padding: 1rem;
  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  white-space: nowrap;
  vertical-align: top;
}

.cu-json-form-cell {
  display: inline-block;
  height: 100%;
  vertical-align: top;
}

.cu-json-form-actions {
  display: inline-block;
  height: 100%;
  padding: 0rem 2rem;
  vertical-align: top;
}

.cu-json-form-actions-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:Center;
}

.cu-json-form-actions-item {
  padding: 0rem;
  margin-bottom: 2rem;
}

.cu-json-form-actions-item:last-child {
  margin-bottom: 0rem;
}
</style>