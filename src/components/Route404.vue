<template>
  <div class="cu-404">
    <h1 style="font-size:6rem;font-family: 'Abril Fatface', cursive;;text-align:center;">4 0 4</h1>
    <div style="font-size:2rem;margin-top:1rem;text-align:center;">{{textPageNotFound}}</div>
    <div style="height:10rem"></div>
  </div>
</template>

<script>
import Language from '../utils/language'

export default {
  name: 'Router404',
  data: function() {
    return {
      textPageNotFound: Language.getLanguageText('page_not_found'),
    }
  },
  methods: {
    
  },
}
</script>

<style>
.cu-404 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>