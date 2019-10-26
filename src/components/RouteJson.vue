<template>
  <form class="cu-json-form clearfix" autocomplete="off">
    <div class="clearfix cu-json-form-cell" style="height:100%" v-for="(jsonCell, index) in jsonCells" :key='index'>
      <b-form-textarea
        id="textarea-default"
        class="cu-json-form-textarea"
        v-bind:placeholder="textInputJsonHint"
        v-bind:value="jsonCell.value"
        no-resize
      ></b-form-textarea>
      <div class="cu-json-form-actions">
        <div class="cu-json-form-actions-item">
          <b-button variant="outline-primary">{{textJsonFormat}}</b-button>
        </div>
        <div class="cu-json-form-actions-item">
          <b-button variant="outline-primary">{{textJsonCompress}}</b-button>
        </div>
        <div class="cu-json-form-actions-item">
          <b-button variant="outline-primary">{{textJsonEscape}}</b-button>
        </div>
        <div class="cu-json-form-actions-item">
          <b-button variant="outline-primary">{{textJsonUnescape}}</b-button>
        </div>
      </div>
    </div>
    <div class="clearfix cu-json-form-cell" style="height:100%">
      <b-form-textarea
        id="textarea-default"
        class="cu-json-form-textarea"
        no-resize
        disabled
      ></b-form-textarea>
    </div>
  </form>
</template>

<script>
import Language from '../utils/language'

export default {
  name: 'RouterJson',
  data: function() {
    return {
      textInputJsonHint: Language.getLanguageText('input_json_hint'),
      textJsonFormat: Language.getLanguageText('json_format'),
      textJsonCompress: Language.getLanguageText('json_compress'),
      textJsonEscape: Language.getLanguageText('json_escape'),
      textJsonUnescape: Language.getLanguageText('json_unescape'),

      jsonCells: [{
        value: '',
        action: '',
      }],
    }
  },
  methods: {

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
}

.cu-json-form-cell {
  float: left;
}

.cu-json-form-textarea {
  width: 30rem;
  height: 100% !important;
  float: left;
}

.cu-json-form-actions {
  float: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:Center;
  box-sizing: border-box;
  margin: 0rem 2rem;
}

.cu-json-form-actions-item {
  list-style-type: none;
  padding: 0rem;
  margin-bottom: 2rem;
}

.cu-json-form-actions-item:last-child {
  margin-bottom: 0rem;
}
</style>