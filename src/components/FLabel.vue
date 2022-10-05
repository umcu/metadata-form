<template>
  <label :for="f+postfix" :class="'col-form-label col-lg-'+w">
    {{flabel}}
    <b-button v-if="n==0" size="sm" class="py-0 my-0 px-1" @click="inc" variant="primary">
      <b-icon icon="file-plus"></b-icon>
    </b-button>
    <b-button v-if="n==0" size="sm" class="py-0 my-0 px-1" @click="dec" variant="primary">
      <b-icon icon="file-minus"></b-icon>
    </b-button>
  </label>
</template>

<script>
export default {
  name: 'FLabel',
  props: {'f': String, 'w': String, 'n': {type: Number, default: -1}},
  methods: {
    inc() {
      const event = (this.f.startsWith('author') ? 'incauthor' :
          (this.f.startsWith('keyword') ? 'inckeyword' :'increlated'));
      this.$store.commit(event)},
    dec() {
      const event = (this.f.startsWith('author') ? 'decauthor' :
          (this.f.startsWith('keyword') ? 'deckeyword' :'decrelated'));
      this.$store.commit(event)}},
  computed: {
    postfix() { return this.n>=0 ? `#${this.n}` : ''},
    flabel() {
      const state = this.$store.state;
      const n = this.n, field = state.schema[this.f],
            required = this.n < 1 ? state.schema[this.f].required : false;
      if (n == -1) {
        return field.label + (required ? ' *' : '')}
      else {
        return (n == 0 ? field.label : (n+1).toString()) + (required ? ' *' : '')}}}}
</script>
