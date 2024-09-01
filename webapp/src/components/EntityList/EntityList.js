import { ref } from 'vue'
import { fetchData, isValidJsonSchema, error_notify, success_notify } from '../Utils.js'
import entitiesSchema from '../../schemes/entities.schema.json'

export default {
  setup() {
    const filter = ref('')
    const filterRef = ref(null)
    let reader = ref(null)
    reader = new FileReader()
    reader.onload = function () {
      console.log(reader.result)
      if (reader.result) {
        try {
          const entities = JSON.parse(reader.result)
          localStorage.setItem('entities', JSON.stringify(entities))
        } catch (error) {
          console.log(error)
        }
      }
    }
    reader.onerror = function () {
      console.log(reader.error)
    }

    return {
      filter,
      filterRef,
      reader,
      resetFilter() {
        filter.value = ''
        filterRef.value.focus()
      }
    }
  },

  data() {
    return {
      entities: [],
      id: null
    }
  },

  beforeMount() {
    if (localStorage.getItem('entities')) {
      this.entities = JSON.parse(localStorage.getItem('entities'))
      this.validateCurrentEntities()
    } else {
      // fetchData(import.meta.env.VITE_ENTITIES_URL).then((data) => {
      //   this.entities = data
      //   console.log('Loaded entities from remote server')
      // })
    }
  },

  created() {
    let urlParams = new URLSearchParams(window.location.search)
    this.id = urlParams.get('id')
  },

  methods: {
    clearEntities() {
      localStorage.removeItem('entities')
      window.location.reload()
    },

    updateFile(file) {
      this.reader.readAsText(file)
      window.location.reload()
    },

    filteredCount() {
      return this.entities.entities.filter((entity) =>
        entity.name.toLowerCase().includes(this.filter.toLowerCase())
      ).length
    },

    validateCurrentEntities() {
      const error = isValidJsonSchema(this.entities, entitiesSchema)
      if (error !== null) {
        error_notify('Entities are not valid: ' + error)
        localStorage.removeItem('entities')
      } else {
        success_notify('Entities are successfully loaded')
      }
    }
  }
}
