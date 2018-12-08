import ElTreeGrid from 'element-tree-grid'
export default {
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  },
  data () {
    return {
      total: 0,
      pagesize: 6,
      // 分类列表
      tableData: [],
      pagenum: 0,
      addCategoriesDialog: false,
      categoriesData: {
        cat_name: '',
        cat_pid: []
      },
      // 添加分类列表
      options: [],
      propsObj: {
        value: 'cat_id',
        label: 'cat_name'
      },
      // 是否出现loading框
      loading: false
    }
  },
  methods: {
    isShowAddCategory () {
      this.addCategoriesDialog = true
    },
    async addCategory () {
      // console.log(this.categoriesData.cat_pid)
      const index = this.categoriesData.cat_pid.length - 1
      const res = await this.axios.post('categories', {
        cat_pid: this.categoriesData.cat_pid[index],
        cat_name: this.categoriesData.cat_name,
        cat_level: this.categoriesData.cat_pid.length
      })
      // console.log(res)
      const { status, msg } = res.data.meta
      if (status === 201) {
        this.$message({
          type: 'success',
          message: msg,
          duration: 800
        })
        this.getCategoriesList()
        this.$refs.categoriesData.resetFields()
        this.categoriesData.cat_pid = []
        this.addCategoriesDialog = false
      }
    },
    pageChange (page) {
      this.pagenum = page
      this.getCategoriesList(page)
    },
    // handleNodeClick (data) {
    //   console.log(data)
    // }
    async getCategoryAddList () {
      const res = await this.axios.get('categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      const { status } = res.data.meta
      if (status === 200) {
        const { data } = res.data
        console.log(data)
        this.options = data
      }
    },
    async getCategoriesList (curPage = 1) {
      this.loading = true
      const res = await this.axios.get('/categories', {
        params: {
          type: 3,
          pagesize: this.pagesize,
          pagenum: curPage
        }
      })
      this.loading = false
      console.log(res)
      const { status } = res.data.meta
      if (status === 200) {
        const { result, total, pagenum } = res.data.data
        console.log(result)
        this.tableData = result
        this.total = total
        this.pagenum = pagenum + 1
      }
    }
  },
  created () {
    this.getCategoriesList()
    this.getCategoryAddList()
  }
}
