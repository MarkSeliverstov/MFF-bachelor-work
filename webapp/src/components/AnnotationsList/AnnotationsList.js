import { ref } from 'vue'
import { fetchData } from '../Utils.js'

const columns = [
  {
    name: 'line',
    align: 'center',
    label: 'Line',
    field: 'lineNumber',
    sortable: true,
    style: 'width: 30px'
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true
  },
  {
    name: 'value',
    align: 'left',
    label: 'Value',
    field: 'value',
    sortable: true,
    format: (val) => val || 'N/A'
  }
]
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
          localStorage.setItem('annotations', JSON.stringify(entities))
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
      columns,
      reader,
      resetFilter() {
        filter.value = ''
        filterRef.value.focus()
      }
    }
  },

  data() {
    return {
      entities: {}
    }
  },
  async beforeMount() {
    if (localStorage.getItem('annotations')) {
      this.entities = JSON.parse(localStorage.getItem('annotations'))
      console.log('Loaded annotations from local storage')
    } else {
      // fetchData(import.meta.env.VITE_ENTITIES_URL).then((data) => {
      //   this.entities = data
      //   console.log('Loaded annotations from remote server')
      // })
    }
  },

  methods: {
    filtredAnnotations(annotations) {
      return annotations.filter((annotation) => {
        if (annotation.value === null) {
          return false
        }
        return annotation.value.toLowerCase().includes(this.filter.toLowerCase())
      })
    },

    filteredCount() {
      return this.entities.filesAnnotations.reduce((acc, file) => {
        return acc + this.filtredAnnotations(file.annotations).length
      }, 0)
    },

    updateFile(file) {
      this.reader.readAsText(file)
      window.location.reload()
    },

    clearEntities() {
      localStorage.removeItem('annotations')
      window.location.reload()
    }
  }
}
