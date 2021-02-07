<template>
  <label :for="f" :class="'col-form-label col-lg-'+w">
    {{flabel}}
    <b-button v-if="btn" size="sm" class="py-0 my-0 px-1" @click="inc" variant="primary">
      <b-icon icon="file-plus"></b-icon>
    </b-button>
    <b-button v-if="btn" size="sm" class="py-0 my-0 px-1" @click="dec" variant="primary">
      <b-icon icon="file-minus"></b-icon>
    </b-button>
  </label>
</template>

<script>
export default {
  name: 'FLabel',
  props: ['f', 'w', 'btn'],
  methods: {
    inc() {
      const event = (this.f.startsWith('Author') ? 'incauthor' : 'inckeyword');
      this.$store.commit(event)
    },
    dec() {
      const event = (this.f.startsWith('Author') ? 'decauthor' : 'deckeyword');
      this.$store.commit(event)
    }
  },
  computed: {
    flabel() {
      const field = this.$store.state.schema[this.f];
      return field.label + (field.required ? ' *' : '')
    }
  }
}
</script>