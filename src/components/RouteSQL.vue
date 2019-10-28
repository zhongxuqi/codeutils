<template>
  <form class="cu-sql-form" autocomplete="off">
    <div class="clearfix cu-sql-form-cell" style="height:100%" v-for="(jsonCell, index) in jsonCells" :key='index'>
      <div class="cu-sql-form-textarea" v-bind:class="{'cu-errormsg':jsonCell.errmsg!=''}">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="jsonCell.errmsg!=''?jsonCell.errmsg:jsonCell.value"
          v-on:input="onInput($event, index)"
        ></codemirror>
      </div>
      <div class="cu-sql-form-actions">
        <div class="cu-sql-form-actions-list">
          <div class="cu-sql-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='formatSql'" v-on:click="onActionChange(index, 'formatSql')">{{textSqlFormat}}</b-button>
          </div>
          <div class="cu-sql-form-actions-item">
            <b-button variant="outline-primary" :pressed="jsonCell.action=='compressSql'" v-on:click="onActionChange(index, 'compressSql')">{{textSqlCompress}}</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix cu-sql-form-cell" style="height:100%">
      <div class="cu-sql-form-textarea disable" style="margin-right:1rem">
        <codemirror
          v-bind:options="codeMirrorOptionsReadOnly"
          style="background-color:grey"
        ></codemirror>
      </div>
    </div>
  </form>
</template>

<script>
import Language from '../utils/language'
import Action from '../utils/Action'

export default {
  name: 'RouterSQL',
  data: function() {
    return {
      textSqlFormat: Language.getLanguageText('sql_format'),
      textSqlCompress: Language.getLanguageText('sql_compress'),

      jsonCells: [{
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
      },

      codeMirrorOptionsReadOnly: {
        mode: {
          name: 'text/x-sql',
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
    }
  },
}
</script>

<style>
.cu-sql-form {
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: 100vh;
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
  width: 30rem;
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