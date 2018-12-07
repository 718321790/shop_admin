export default {
  data () {
    return {
      tableData: []
    }
  },
  async created () {
    const res = await this.axios.get(`rights/list`)
    console.log(res)
    const {
      meta: { status }
    } = res.data
    if (status === 200) {
      this.tableData = res.data.data
    }
  },
  methods: {
    indexMethod (index) {
      return index
    }
  }
}
