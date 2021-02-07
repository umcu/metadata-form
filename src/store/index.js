import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    schema: {
      AuthorName:             {label: 'Author name', type: 'text', required: true},
      AuthorAffiliation:      {label: 'Author affiliation', type: 'text', required: true},
      AuthorIdentifier:       {label: 'Author identifier', type: 'text', required: false},
      AuthorIdentifierScheme: {label: 'Author identifier scheme', type: 'fixed', required: false, value: 'ORCID'},
      ContactAffiliation:     {label: 'Contact affiliation', type: 'fixed', required: false, value: 'UMC Utrecht'},
      ContactEmail:           {label: 'Contact email', type: 'menu', required: true},
      ContactName:            {label: 'Contact name', type: 'text', required: true},
      DepositDate:            {label: 'Deposit date', type: 'date', required: true},
      DepositorDepartment:    {label: 'Depositor department', type: 'text', required: false},
      DepositorDivision:      {label: 'Depositor division', type: 'menu', required: true},
      DepositorName:          {label: 'Depositor name', type: 'text', required: true},
      DescriptionText:        {label: 'Description', type: 'memo', required: false},
      KeywordTerm:            {label: 'Keyword term', type: 'text', required: false},
      KeywordVocabulary:      {label: 'Keyword vocabulary', type: 'text', required: false},
      Language:               {label: 'Language', type: 'fixed', required: false, value: 'English'},
      PublicationDate:        {label: 'Publication date', type: 'date', required: false},
      Subject:                {label: 'Subject', type: 'fixed', required: false, value: 'Medicine, Health and Life Sciences'},
      timePeriodCoveredEnd:   {label: 'Study period end', type: 'text', required: false},
      timePeriodCoveredStart: {label: 'Study period start', type: 'text', required: false},
      Title:                  {label: 'Title', type: 'text', required: true},
    },
    menu: {
      ContactEmail: ['',
        'DHS-Datamanagement@umcutrecht.nl',
        'DatamanagementBeeld@umcutrecht.nl',
        'DatamanagementDHL@umcutrecht.nl',
        'DatamanagementDVF@umcutrecht.nl',
        'IGD-datamanagers@umcutrecht.nl',
        'DatamanagementJC@umcutrecht.nl',
        'DatamanagementKinderen@umcutrecht.nl',
        'dLAB-Datamanagement@umcutrecht.nl',
        'her_dm@umcutrecht.nl',
        'DatamanagementVrouwenBaby@umcutrecht.nl'
      ],
      DepositorDivision: ['',
        'Heart and Lungs',
        'Imaging & Oncology',
        'Internal Medicine and Dermatology',
        'Julius Center',
        'Laboratories, Pharmacy & Biomedical Genetics',
        'Neurosciences',
        'Pediatrics',
        'Surgical Specialties',
        'Vital Functions',
        'Women and Baby'
      ]
    },
    valid: null,
    checked: null,
    author: [1],
    keyword: [1]
  },
  mutations: {
      setchecked(state, payload) {
          state.checked = payload
      },
      setvalid(state, payload) {
          state.valid = payload
      },
      incauthor(state) {
          const last = state.author[state.author.length-1];
          state.author.push(last+1)
      },
      inckeyword(state) {
          const last = state.keyword[state.keyword.length-1];
          state.keyword.push(last+1)
      },
      decauthor(state) {
          const n = state.author.length;
          if (n > 1) { state.author.pop() }
      },
      deckeyword(state) {
          const n = state.keyword.length;
          if (n > 1) { state.keyword.pop() }
      },
  }
})

export default store