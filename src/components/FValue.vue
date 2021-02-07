<template>
  <div :class="'col-lg-'+w">
    <b-form-select   v-if="ftype == 'menu'" v-model="value"
                     :name="f" :id="f" :required="freq" :state="fstate"
                     :options="menu"/>
    <b-form-input    v-if="ftype == 'fixed'"
                     :name="f" :id="f" :required="freq" :state="fstate"
                     type="text" :value="fvalue" readonly/>
    <b-form-input    v-if="ftype == 'text'" v-model="value"
                     :name="f" :id="f" :required="freq" :state="fstate"
                     value=""/>
    <b-form-input    v-if="ftype == 'date'" v-model="value"
                     :name="f" :id="f" :required="freq" :state="fstate"
                     type="date" value=""/>
    <b-form-textarea v-if="ftype == 'memo'" v-model="value"
                     :name="f" :id="f" :required="freq" :state="fstate"
                     rows="3"/>
  </div>
</template>

<script>
export default {
  name: 'FValue',
  data() { return {value: ''} },
  props: ['f', 'w'],
  computed: {
    menu()   { return this.$store.state.menu[this.f] },
    ftype()  { return this.$store.state.schema[this.f].type},
    freq()   { return this.$store.state.schema[this.f].required},
    fvalue() { return this.$store.state.schema[this.f].value},
    fstate() {
      let checked = this.$store.state.checked,
          required = this.$store.state.schema[this.f].required;
      return (checked && required) ? this.value.length > 0 : null
    }
  }
}
</script>
