<template>
  <form class="cu-json-form" autocomplete="off">
    <div class="clearfix cu-json-form-cell" style="height:100%" v-for="(jsonCell, index) in jsonCells" :key='index'>
      <div class="cu-json-form-textarea" v-bind:class="{'cu-errormsg':jsonCell.errmsg!=''}">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="jsonCell.errmsg!=''?jsonCell.errmsg:jsonCell.value"
          v-on:input="onInput($event, index)"
        ></codemirror>
        <div class="cu-json-form-textarea-actions">
          <b-button size="sm" variant="success" style="margin-right:0.5rem" v-on:click="copyTextarea(index)">
            <i class="iconfont icon-copy-f" style="font-size:1rem"></i>
          </b-button>
          <b-button size="sm" variant="danger" v-if="jsonCells.length>1" v-on:click="closeTextarea(index)">
            <i class="iconfont icon-close" style="font-size:1rem"></i>
          </b-button>
        </div>
      </div>
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
      <div class="cu-json-form-textarea disable" style="margin-right:1rem">
        <codemirror
          v-bind:options="codeMirrorOptionsReadOnly"
          style="background-color:grey"
        ></codemirror>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </form>
</template>

<script>
import Language from '../utils/language'
import Action from '../utils/Action'

export default {
  name: 'RouterJson',
  data: function() {
    return {
      textInputJsonHint: Language.getLanguageText('input_json_hint'),
      textJsonFormat: Language.getLanguageText('json_format'),
      textJsonCompress: Language.getLanguageText('json_compress'),
      textJsonEscape: Language.getLanguageText('json_escape'),
      textJsonUnescape: Language.getLanguageText('json_unescape'),
      textCopied: Language.getLanguageText('copied'),
      textCopyFail: Language.getLanguageText('copy_fail'),

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
        lineNumbers: true,
      },

      codeMirrorOptionsReadOnly: {
        mode: {
          name: 'text/javascript',
          json: true,
        },
        readOnly: 'nocursor',
      },
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
    copyTextarea: function(index) {
      this.$copyText(this.jsonCells[index].value).then((function() {
        this.$snotify.success(this.textCopied)
      }).bind(this), (function() {
        this.$snotify.error(this.textCopyFail)
      }).bind(this))
    },
    closeTextarea: function(index) {
      var jsonCells = []
      for (var i=0;i<this.jsonCells.length;i++) {
        if (i == index) continue
        jsonCells.push(this.jsonCells[i])
      }
      this.jsonCells = jsonCells
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

.cu-json-form-textarea {
  width: 30rem;
  height: 100% !important;
  display: inline-block;
  position: relative;
}

.cu-json-form-textarea-actions {
  position: absolute;
  top: 0rem;
  left: 30.5rem;
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

.cu-json-form-textarea.disable .CodeMirror {
  background-color: #e9ecef;
}
</style>