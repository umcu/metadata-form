<template>
  <fieldset class="mt-2">
  <f-row :key="'author'+n">
    <fl w="2" f="AuthorName" :btn="n==1"/><fv w="4" f="AuthorName"/>
    <fl w="2" f="AuthorAffiliation"/><fv w="4" f="AuthorAffiliation"/>
  </f-row>
  <f-row :key="'authorid'+n">
    <fl w="2" f="AuthorIdentifier"/><fv w="4" f="AuthorIdentifier"/>
    <fl w="2" f="AuthorIdentifierScheme"/><fv w="4" f="AuthorIdentifierScheme"/>
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
