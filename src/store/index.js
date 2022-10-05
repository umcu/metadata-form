import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    schema: {
      authorName:             {label: 'Author name',        type: 'text',   required: true},
      dateOfDeposit:          {label: 'Deposit date',       type: 'date',   required: true},
      dsDescriptionValue:     {label: 'Description',        type: 'memo',   required: true},
      keywordValue:           {label: 'Keyword term',       type: 'text',   required: true},
      language:               {label: 'Language',           type: 'fixed',  required: false, value: 'English'},
      timePeriodCoveredEnd:   {label: 'Study period end',   type: 'text',   required: false},
      timePeriodCoveredStart: {label: 'Study period start', type: 'text',   required: false},
      title:                  {label: 'Title',              type: 'text',   required: true},
      datasetId:              {label: 'Related datasets',   type: 'text',   required: false},
      typeOfResearch:         {label: 'Type of research',   type: 'choice', required: true,
          options: [
              {text: 'advanced therapeutic medicinal products', value: 30},
              {text: 'investigational medicinal products',      value: 25},
              {text: 'other WMO',                               value: 15},
              {text: 'non-WMO',                                 value: 15},
              {text: 'fundamental/pre-clinical',                value: 10}
          ]},
    },
    valid: null,
    checked: null,
    authorName: [1],
    datasetId: [1],
    keywordValue: [1]
  },
  mutations: {
      setchecked(state, payload) {
          state.checked = payload
      },
      setvalid(state, payload) {
          state.valid = payload
      },
      incauthor(state) {
          const last = state.authorName[state.authorName.length-1];
          state.authorName.push(last+1)
      },
      inckeyword(state) {
          const last = state.keywordValue[state.keywordValue.length-1];
          state.keywordValue.push(last+1)
      },
      increlated(state) {
          const last = state.datasetId[state.datasetId.length-1];
          state.datasetId.push(last+1)
      },
      decauthor(state) {
          const n = state.authorName.length;
          if (n > 1) { state.authorName.pop() }
      },
      decrelated(state) {
          const n = state.datasetId.length;
          if (n > 1) { state.datasetId.pop() }
      },
      deckeyword(state) {
          const n = state.keywordValue.length;
          if (n > 1) { state.keywordValue.pop() }
      },
  }
})

export default store
