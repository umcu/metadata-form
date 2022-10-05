<template>
  <b-container class="mx-3 compact">
    <form class="form-horizontal">
      <f-row>
        <fl w="2"  f="title"/><fv w="10" f="title"/>
      </f-row>
      <fieldset class="mb-2">
        <f-row v-for="(auth, n) in authorName" :key="'authorName'+n">
          <fl w="2" f="authorName" :n="n"/><fv w="10" f="authorName" :n="n"/>
        </f-row>
      </fieldset>
      <f-row>
        <fl w="2"  f="dsDescriptionValue"/><fv w="10" f="dsDescriptionValue"/>
      </f-row>
      <f-row>
        <fl w="2" f="language"/><fv w="4" f="language"/>
        <fl w="2" f="dateOfDeposit"/><fv w="4" f="dateOfDeposit"/>
      </f-row>
      <f-row>
        <fl w="2" f="typeOfResearch"/><fv w="10" f="typeOfResearch"/>
      </f-row>
      <f-row>
        <fl w="2" f="timePeriodCoveredStart"/><fv w="4" f="timePeriodCoveredStart"/>
        <fl w="2" f="timePeriodCoveredEnd"/><fv w="4" f="timePeriodCoveredEnd"/>
      </f-row>
      <fieldset class="mt-2">
        <f-row v-for="(kwd, n) in keywordValue" :key="'keywordValue'+n">
          <fl w="2" f="keywordValue" :n="n"/><fv w="10" f="keywordValue" :n="n"/>
        </f-row>
      </fieldset>
      <fieldset class="mt-2">
        <f-row v-for="(dsid, n) in datasetId" :key="'datasetId'+n">
          <fl w="2" f="datasetId" :n="n"/><fv w="10" f="datasetId" :n="n"/>
        </f-row>
      </fieldset>
      <b-button-group class="mt-4">
        <b-button size="sm" class="py-0 mr-2" pill @click="download" variant="primary">
          <b-icon icon="cloud-arrow-down"></b-icon>Download
        </b-button>
        <b-button size="sm" class="py-0 mr-2" pill @click="reset" variant="primary">
          <b-icon icon="chevron-double-left"></b-icon>Reset
        </b-button>
      </b-button-group>
    </form>
    <p v-if="warn" class="mt-3 text-warning">Please enter all required fields! {{message}}</p>
  </b-container>
</template>

<script>
import FLabel   from './components/FLabel'
import FValue   from './components/FValue'
import FRow     from './components/FRow'
export default {
  name: 'App',
  data() { return {message: ''} },
  computed: {
    authorName()   {return this.$store.state.authorName},
    datasetId()    {return this.$store.state.datasetId},
    keywordValue() {return this.$store.state.keywordValue},
    warn()         {return this.$store.state.checked && !this.$store.state.valid},
  },
  methods: {
    download() {
      // validate form
      let obj = {}, valid = true, form = new FormData(document.querySelector('form'));
      this.$store.commit('setchecked', true);
      const state = this.$store.state;
      for (const [key, value] of form.entries()) {
        obj[key] = value; let label = '';
        let required = false;
        if (key.includes('#')) {
          const parts = key.split('#'); label = state.schema[parts[0]].label;
          required = (parts[1] == '0')}
        else {
          label = state.schema[key].label;
          required = state.schema[key].required}
        if (required && value.length == 0) {
          this.message = this.message.concat(`${label} is required. `)}
        valid = valid && (!required || value.length > 0)}
      // map to Dublin Core schema
      let subject = [], creator = [], related = [];
      for (const key in obj) {
        if (key.startsWith('authorName')) {
          creator.push(obj[key])}
        else if (key.startsWith('keywordValue')) {
          subject.push(obj[key])}
        else if (key.startsWith('datasetId')) {
          related.push(obj[key])}}
      let dcobj = {
        "filename": "objects/",
        'dc.title': obj['title'], 'dc.language': obj['language'],
        'dc.description': obj['dsDescriptionValue'],
        'dc.dateSubmitted': obj['dateOfDeposit'],
        'dc.subject': subject, 'dc.creator': creator, 'dc.relation': related
      };
      let temporal = '';
      if ('timePeriodCoveredStart' in obj) {
        temporal = obj['timePeriodCoveredStart']}
      if ('timePeriodCoveredEnd' in obj) {
        temporal = temporal.concat('-'+obj['timePeriodCoveredEnd'])}
      if (temporal) {
        dcobj['dc.temporal'] = temporal}
      // retention period:  dc.coverage name=retention; start=2021-12-17; end=2031-12-17
      const dod=obj['dateOfDeposit'], tor=obj['typeOfResearch'];
      const [year, month, day] = dod.split('-');
      const year2 = parseInt(year)+parseInt(tor);
      dcobj['dc.coverage'] = `name=retention; start=${dod} end=${year2}-${month}-${day}`;
      // download metadata
      this.$store.commit('setvalid', valid);
      if (!valid) return;
      let dc_string = encodeURIComponent(JSON.stringify(dcobj)),
          payload = `data:text/json;charset=utf-8,[${dc_string}]`,
          node = document.createElement('a');
      node.setAttribute('href', payload);
      node.setAttribute('download', 'metadata.json');
      document.body.appendChild(node); node.click(); node.remove()},
    reset() {
      document.querySelector('form').reset();
      this.message = '';
      this.$store.commit('setchecked', false);
      this.$store.commit('setvalid', false)}},
  components: { 'f-row': FRow, 'fl': FLabel, 'fv': FValue}}
</script>
