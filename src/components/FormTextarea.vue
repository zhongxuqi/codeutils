<template>
  <div class="cu-form-textarea" v-bind:class="{'cu-errormsg':errmsg!=''}">
    <codemirror
      v-bind:options="codeMirrorOptions"
      v-bind:value="currValue"
      v-on:input="onInput($event)"
    ></codemirror>
    <div class="cu-form-textarea-actions">
      <b-button size="sm" variant="success" style="margin-right:0.5rem" v-on:click="copyTextarea">
        <i class="iconfont icon-copy-f" style="font-size:1rem"></i>
      </b-button>
      <b-button size="sm" variant="danger" v-if="enableClose" v-on:click="closeTextarea">
        <i class="iconfont icon-close" style="font-size:1rem"></i>
      </b-button>
      <br/>
      <b-button variant="light"  size="sm" style="margin-top:0.5rem" v-on:click="openFullScreen">
        <i class="iconfont icon-full-screen" style="font-size:1rem"></i>
      </b-button>
    </div>
    <vue-snotify></vue-snotify>
    <FullScreenTextarea v-if="fullscreen" v-bind:text="value" 
      v-bind:codeMirrorOptions="codeMirrorOptions" v-on:textchange="onFullScreenTextChange" v-on:close="closeFullScreen()"/>
  </div>
</template>

<script>
import FullScreenTextarea from './FullScreenTextarea'

export default {
  name: 'FormTextarea',
  components: {
    FullScreenTextarea,
  },
  props: {
    value: String,
    errmsg: String,
    codeMirrorOptions: Object,
    enableClose: Boolean,
  },
  data: function() {
    return {
      currValue: '',
      fullscreen: false,
    }
  },
  methods: {
    onInput: function(value) {
      this.currValue = value
      this.$emit('textchange', value)
    },
    copyTextarea: function() {
      this.$copyText(this.currValue).then((function() {
        this.$snotify.success(this.textCopied)
      }).bind(this), (function() {
        this.$snotify.error(this.textCopyFail)
      }).bind(this))
    },
    closeTextarea: function() {
      this.$emit('close')
    },
    onFullScreenTextChange: function(value) {
      this.currValue = value
      this.$emit('textchange', value)
    },
    openFullScreen: function() {
      this.fullscreen = true
    },
    closeFullScreen: function() {
      this.fullscreen = false
    },
  },
  mounted: function() {
    this.currValue = this.value
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

.cu-form-textarea-actions {
  position: absolute;
  top: 0rem;
  left: 40.5rem;
}
</style>