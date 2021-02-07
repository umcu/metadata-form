<template>
  <fieldset class="mt-2">
  <f-row :key="'kwd'+n">
    <fl w="2" f="KeywordTerm" :btn="n==1"/><fv w="4" f="KeywordTerm"/>
    <fl w="2" f="KeywordVocabulary"/><fv w="4" f="KeywordVocabulary"/>
  </f-row>
  </fieldset>
</template>

<script>
import FLabel  from './FLabel'
import FValue  from './FValue'
import FRow    from './FRow'
export default {
  name: 'FKeyword',
  props: ['n'],
  components: {
    fl: FLabel, 'f-row': FRow, fv: FValue
  }
}
</script>
