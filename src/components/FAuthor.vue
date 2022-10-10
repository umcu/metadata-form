<template>
  <fieldset class="mt-2">
  <f-row :key="'authorName'+n">
    <fl w="2" f="authorName" :btn="n==0"/><fv w="4" f="authorName"/>
  </f-row>
  </fieldset>
</template>

<script>
import FLabel  from './FLabel'
import FValue  from './FValue'
import FRow    from './FRow'
export default {
  name: 'FAuthor',
  props: ['n'],
  components: {
    fl: FLabel, 'f-row': FRow, fv: FValue
  }
}
</script>
