export default {
  data () {
    return {
      // 是否出现添加商品框
      total: 0,
      loading: false,
      // 数据源
      tableData: [],
      pagesize: 6,
      pagenum: 1
    }
  },
  methods: {
    async getGoodsList (pagenum = 1) {
      this.loading = true
      const res = await this.axios.get('goods', {
        params: {
          pagenum,
          pagesize: this.pagesize,
          query: ''
        }
      })
      // console.log(res)
      const { status } = res.data.meta
      if (status === 200) {
        const { goods, total, pagenum: curpage } = res.data.data
        this.total = total
        this.pagenum = curpage - 0
        this.tableData = goods
      }
      this.loading = false
    },
    pageChange (page) {
      this.$router.push(`/goods/${page}`)
    }
  },
  watch: {
    $route (to, from) {
      this.getGoodsList(to.params.id)
    }
  },
  created () {
    const curPage = this.$route.params.id - 0
    this.getGoodsList(curPage)
  }
}
