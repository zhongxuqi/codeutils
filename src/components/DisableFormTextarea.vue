<template>
  <div class="cu-form-textarea disable" style="margin-right:1rem">
    <codemirror
      v-bind:options="codeMirrorOptionsReadOnly"
      style="background-color:grey"
    ></codemirror>
  </div>
</template>

<script>
export default {
  name: 'DisableFormTextarea',
  props: {
    
  },
  data: function() {
    return {
      codeMirrorOptionsReadOnly: {
        mode: {
          name: 'text',
          json: true,
        },
        readOnly: 'nocursor',
      },
    }
  },
  methods: {

  },
}
</script>

<style>
.cu-form-textarea {
  width: 40rem;
  height: 100% !important;
  display: inline-block;
  position: relative;
}

.cu-form-textarea.disable .CodeMirror {
  background-color: #e9ecef;
}
</style>