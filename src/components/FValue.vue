<template>
  <div :class="'col-lg-'+w">
    <b-form-input    v-if="ftype == 'fixed'"
                     :name="f+postfix" :id="f+postfix" :required="freq" :state="fstate"
                     type="text" :value="fvalue" readonly/>
    <b-form-input    v-if="ftype == 'text'" v-model="value"
                     :name="f+postfix" :id="f+postfix" :required="freq" :state="fstate"
                     value=""/>
    <b-form-input    v-if="ftype == 'date'" v-model="dvalue"
                     :name="f+postfix" :id="f+postfix" :required="freq" :state="fstate"
                     type="date" value=""/>
    <b-form-select   v-if="ftype == 'choice'" v-model="value"
                     :name="f+postfix" :id="f+postfix" required="required" :state="fstate"
                     type="date" value="" :options="foptions"/>
    <b-form-textarea v-if="ftype == 'memo'" v-model="value"
                     :name="f+postfix" :id="f+postfix" :required="freq" :state="fstate"
                     rows="3"/>
  </div>
</template>

<script>
export default {
  name: 'FValue',
  data() { return {
    value: '', dvalue: new Date().toISOString().slice(0, 10)
  } },
  props: {'f': String, 'w': String, 'n': {type: Number, default: -1}},
  computed: {
    postfix() { return this.n>=0 ? `#${this.n}` : ''},
    ftype()  {
      const state = this.$store.state;
      return state.schema[this.f].type},
    freq()   { return this.n<1 ? this.$store.state.schema[this.f].required : false},
    fvalue() { return this.$store.state.schema[this.f].value},
    fstate() {
      const state = this.$store.state;
      const checked = state.checked,
            required = this.n==0 ? state.schema[this.f].required : false;
      return (checked && required) ? this.value.length > 0 : null},
    foptions() {
      const state = this.$store.state;
      return state.schema[this.f].options}}}
</script>
