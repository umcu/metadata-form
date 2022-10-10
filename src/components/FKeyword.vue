<template>
  <fieldset class="mt-2">
  <f-row :key="'keywordValue'+n">
    <fl w="2" f="keywordValue" :btn="n==1"/><fv w="10" f="keywordValue"/>
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
