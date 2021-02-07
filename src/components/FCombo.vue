<template>
  <div class="form-group row">
    <label :class="'font-weight-bold col-form-label col-lg-'+lw" :label-for="fname">{{flabel}}</label>
    <div :class="'font-weight-bold col-form-label col-lg-'+w">
    <select v-if="ftype == 'menu'" :name="fname" :id="fname" class="form-control">
      <option v-for="entry in menu" :value="entry">{{entry}}}</option>
    </select>
    <input v-if="ftype == 'fixed'" type="text" disabled="1" :value="fvalue"
      :name="fname" :id="fname" class="form-control"/>
    <input v-if="ftype == 'text'" value=""
      :name="fname" :id="fname" class="form-control"/>
    <input v-if="ftype == 'date'" type="date" value=""
      :name="fname" :id="fname" class="form-control"/>
    <textarea v-if="ftype == 'memo'" rows="4" class="form-control"
      :name="fname" :id="fname"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FCombo',
  props: ['f', 'lw', 'vw'],
  computed: {
    w()      { return parseInt(this.lw)+parseInt(this.vw)},
    flabel() { return this.$schema.schema[this.f].label},
    menu()   { return this.$schema.menu[this.f] },
    ftype()  { return this.$schema.schema[this.f].type},
    fname()  { return this.$schema.schema[this.f].name},
    fvalue() { return this.$schema.schema[this.f].value}
  }
}
</script>
