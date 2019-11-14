<template>
  <form class="cu-fullscreen-textarea" autocomplete="off" v-on:click="$emit('close')">
    <div class="cu-fullscreen-textarea-body">
      <div class="cu-fullscreen-textarea-body-content" v-on:click.stop="onBodyClick">
        <div style="width:100%;height:100%">
        <codemirror
          v-bind:options="codeMirrorOptions"
          v-bind:value="text"
          v-on:input="onInput($event)"
        ></codemirror>
        </div>
      </div>
      <div class="cu-fullscreen-textarea-body-actions">
        <b-button size="sm" variant="danger" v-on:click="$emit('close')">
          <i class="iconfont icon-close" style="font-size:1rem"></i>
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FullScreenTextarea',
  props: {
    text: String,
    codeMirrorOptions: Object,
  },
  data: function() {
    return {

    }
  },
  methods: {
    onInput: function(value) {
      this.$emit('textchange', value)
    },
    onBodyClick: function() {
      
    },
  },
}
</script>

<style>
.cu-fullscreen-textarea {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  left: 0rem;
  top: 0rem;
  right: 0rem;
  bottom: 0rem;
  padding: 2rem;
}

.cu-fullscreen-textarea-body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.cu-fullscreen-textarea-body-content {
  float: left;
  height: 100%;
  width: calc(100% - 4rem);
}

.cu-fullscreen-textarea-body-actions {
  float: left;
  width: 3rem;
  margin-left: 1rem;
}
</style>