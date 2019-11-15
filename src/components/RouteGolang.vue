<template>
  <form class="cu-golang-form" autocomplete="off">
    <div class="clearfix cu-golang-form-cell" style="height:100%" v-for="(textareaCell, index) in textareaCells" :key='index'>
      <FormTextarea v-bind:codeMirrorOptions="textareaCell.options" v-bind:errmsg="textareaCell.errmsg" 
        v-bind:value="textareaCell.errmsg!=''?textareaCell.errmsg:textareaCell.value"
        v-bind:enableClose="false"
        v-on:textchange="onInput($event, index)"/>
      <div class="cu-golang-form-actions" v-if="index<textareaCells.length-1">
        <div class="cu-golang-form-actions-list">
          <div class="cu-golang-form-actions-item">
            <b-button variant="outline-primary" :pressed="textareaCell.action=='jsonToGolang'" v-on:click="onActionChange(index, 'jsonToGolang')">{{textJsonToGolang}}</b-button>
          </div>
          <div class="cu-golang-form-actions-item">
            <b-button variant="outline-primary" :pressed="textareaCell.action=='sqlToGolang'" v-on:click="onActionChange(index, 'sqlToGolang')">{{textSqlToGolang}}</b-button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Language from '../utils/language'
import Action from '../utils/Action'
import FormTextarea from './FormTextarea'

export default {
  name: 'RouterGolang',
  components: {
    FormTextarea,
  },
  data: function() {
    return {
      textJsonToGolang: Language.getLanguageText('json_to_golang'),
      textSqlToGolang: Language.getLanguageText('sql_to_golang'),

      textareaCells: [{
        value: '',
        action: '',
        errmsg: '',
        options: {
          mode: {
            name: 'text',
          },
          lineNumbers:true,
        },
      }, {
        value: '',
        action: '',
        errmsg: '',
        options: {
          mode: {
            name: 'text/x-go',
          },
          lineNumbers: true,
        },
      }],
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
      if (newAction == 'jsonToGolang') {
        textareaCells[index].options = {
          mode: {
            name: 'text/javascript',
            json: true,
          },
          lineNumbers:true,
          foldGutter: true,
          gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
          lint: true,
        }
      } else if (newAction == 'sqlToGolang') {
        textareaCells[index].options = {
          mode: {
            name: 'text/x-sql',
            json: true,
          },
          lineNumbers: true,
        }
      }
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
    }
  },
}
</script>

<style>
.cu-golang-form {
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  white-space: nowrap;
  vertical-align: top;
}

.cu-golang-form-cell {
  display: inline-block;
  height: 100%;
  vertical-align: top;
}

.cu-golang-form-textarea {
  width: 40rem;
  height: 100% !important;
  display: inline-block;
}

.cu-golang-form-actions {
  display: inline-block;
  height: 100%;
  margin: 0rem 2rem;
  vertical-align: top;
}

.cu-golang-form-actions-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:Center;
}

.cu-golang-form-actions-item {
  padding: 0rem;
  margin-bottom: 2rem;
}

.cu-golang-form-actions-item:last-child {
  margin-bottom: 0rem;
}

.cu-golang-form-textarea.disable .CodeMirror {
  background-color: #e9ecef;
}
</style>