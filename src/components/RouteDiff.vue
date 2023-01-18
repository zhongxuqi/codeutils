<template>
  <form class="cu-diff-form" autocomplete="off">
    <div class="cu-diff-form-body">
      <div class="cu-diff-form-body-left">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="leftValue"
          v-on:input="onInput($event, 'left')"
        ></codemirror>
      </div>
      <div class="cu-diff-form-body-result">
        <pre id="cu-diff-display"></pre>
      </div>
      <div class="cu-diff-form-body-right">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="rightValue"
          v-on:input="onInput($event, 'right')"
        ></codemirror>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </form>
</template>

<script>
import Language from '../utils/language'

let Diff = window.Diff

export default {
  name: 'RouterDiff',
  data: function() {
    return {
      leftValue: '',
      rightValue: '',

      codeMirrorOptions: {
        mode: {
          name: 'text',
        },
        theme: 'idea',
        lineWrapping: true,
        placeholder: Language.getLanguageText('input_text_hint'),
      },

      codeMirrorOptionsResult: {
        mode: {
          name: 'text/html',
        },
        theme: 'idea',
        lineWrapping: true,
        readOnly: true,
      },
    }
  },
  methods: {
    onInput: function(value, type) {
      if (type == 'left') {
        this.leftValue = value
      } else {
        this.rightValue = value
      }
      this.refreshValues()
    },
    refreshValues: function() {
      var display = document.getElementById('cu-diff-display')
      var fragment = document.createDocumentFragment()
      var diff = Diff.diffLines(this.leftValue, this.rightValue, {})
      diff.forEach(function(part) {
        var span = document.createElement('span')
        if (part.added) {
          span.style.backgroundColor = 'rgba(139,195,74,0.5)'
        } else if (part.removed) {
          span.style.backgroundColor = 'rgba(255,87,34,0.5)'
        }
        span.appendChild(document.createTextNode(part.value))
        fragment.appendChild(span)
      })
      display.innerHTML = ''
      display.appendChild(fragment)
    },
  },
  computed: {
    editor: function() {
      return this.$refs.myEditor.editor
    }
  },
}
</script>

<style>
.cu-diff-form {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.cu-diff-form-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.cu-diff-form-body-left {
  flex: 1;
  width: 0rem;
  height: 100%;
}

.cu-diff-form-body-right {
  flex: 1;
  width: 0rem;
  height: 100%;
}

.cu-diff-form-body-result {
  flex: 1;
  width: 0rem;
  height: 100%;
}

#cu-diff-display {
  white-space: pre-wrap;       /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
  padding: 0.5rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

.CodeMirror pre.CodeMirror-placeholder { color: #999; }
</style>