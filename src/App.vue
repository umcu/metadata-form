<template>
  <b-container class="mx-3 compact">
    <h1>Metadata form</h1>
    <form class="form-horizontal">
      <f-row>
        <fl w="2"  f="Title"/><fv w="10" f="Title"/>
      </f-row>
      <f-row>
        <fl w="2"  f="ContactName"/><fv w="10" f="ContactName"/>
      </f-row>
      <f-row>
        <fl w="2" f="ContactEmail"/><fv w="4" f="ContactEmail"/>
        <fl w="2" f="ContactAffiliation"/><fv w="4" f="ContactAffiliation"/>
      </f-row>
      <f-row>
        <fl w="2"  f="DescriptionText"/><fv w="10" f="DescriptionText"/>
      </f-row>
      <f-row>
        <fl w="2" f="Subject"/><fv w="4" f="Subject"/>
        <fl w="2" f="Language"/><fv w="4" f="Language"/>
      </f-row>
      <f-row>
        <fl w="2" f="DepositorName"/><fv w="10" f="DepositorName"/>
      </f-row>
      <f-row>
        <fl w="2" f="DepositorDepartment"/><fv w="4" f="DepositorDepartment"/>
        <fl w="2" f="DepositorDivision"/><fv w="4" f="DepositorDivision"/>
      </f-row>
      <f-row>
        <fl w="2" f="DepositDate"/><fv w="10" f="DepositDate"/>
      </f-row>
      <f-row>
        <fl w="2" f="timePeriodCoveredStart"/><fv w="4" f="timePeriodCoveredStart"/>
        <fl w="2" f="timePeriodCoveredEnd"/><fv w="4" f="timePeriodCoveredEnd"/>
      </f-row>
      <f-author  v-for="n in author"  :n="n" :key="'authg'+n"/>
      <f-keyword v-for="n in keyword" :n="n" :key="'kwdg'+n"/>
      <b-button-group class="mt-4">
        <b-button size="sm" class="py-0 mr-2" pill @click="download" variant="primary">
          <b-icon icon="cloud-arrow-down"></b-icon>Download
        </b-button>
        <b-button size="sm" class="py-0 mr-2" pill @click="reset" variant="primary">
          <b-icon icon="chevron-double-left"></b-icon>Reset
        </b-button>
      </b-button-group>
    </form>
    <p v-if="warn" class="mt-3 text-warning">Please enter all required fields!</p>
  </b-container>
</template>

<script>
import FLabel   from './components/FLabel'
import FValue   from './components/FValue'
import FRow     from './components/FRow'
import FAuthor  from './components/FAuthor'
import FKeyword from './components/FKeyword'
export default {
  name: 'App',
  computed: {
    author()  {return this.$store.state.author},
    keyword() {return this.$store.state.keyword},
    warn()    {return this.$store.state.checked && !this.$store.state.valid},
  },
  methods: {
    download() {
      let obj = {}, valid=true, form = new FormData(document.querySelector('form'));
      this.$store.commit('setchecked', true);
      for (const [key, value] of form.entries()) {
        obj[key] = value; const required = this.$store.state.schema[key].required;
        valid = valid && (!required || value.length > 0)
      }
      this.$store.commit('setvalid', valid);
      if (!valid) return;
      let payload = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)),
          node = document.createElement('a');
      node.setAttribute('href', payload);
      node.setAttribute('download', 'metadata.json');
      document.body.appendChild(node); node.click(); node.remove();
    },
    reset() {
      document.querySelector('form').reset();
      this.$store.commit('setchecked', false); this.$store.commit('setvalid', false);
    }
  },
  components: {
    'f-author':  FAuthor,
    'f-row':     FRow,
    'fl':        FLabel,
    'fv':        FValue,
    'f-keyword': FKeyword
  }
}
</script>

