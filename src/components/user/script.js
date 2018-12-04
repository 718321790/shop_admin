export default {
  data () {
    return {
      userlist: [],
      totalnum: 0,
      pagesize: 3,
      searchTxt: '',
      isSearched: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    search () {
      this.getUserList(1, this.searchTxt)
      if (this.searchTxt !== '') {
        this.isSearched = true
      } else {
        this.isSearched = false
      }
    },
    pageChange (page) {
      if (this.isSearched) {
        this.getUserList(page, this.searchTxt)
      } else {
        this.getUserList(page)
      }
    },
    async changeState (data) {
      console.log(data.mg_state, data.id)
      const res = await this.axios.put(
        `users/${data.id}/state/${data.mg_state}`
      )
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$message({
          message: msg,
          type: 'success',
          duration: 800
        })
      } else {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    async delUser (data) {
      const res = await this.axios.delete(`users/${data.id}`)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$message({
          message: msg,
          type: 'success',
          duration: 800
        })
        if (this.isSearched) {
          this.getUserList(1, this.searchTxt)
        } else {
          this.getUserList(1)
        }
      } else {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    async getUserList (pagenum = 1, txt = '') {
      const res = await this.axios.get('users', {
        params: {
          pagesize: this.pagesize,
          pagenum,
          query: txt
        }
      })
      const {
        meta: { status, msg }
      } = res.data
      if (status === 401) {
        this.$message({
          message: msg,
          type: 'warning',
          duration: 1000
        })
        this.$router.push('/login')
      } else {
        const {
          data: { users, total }
        } = res.data
        // this.pagenum = data.pagenum
        this.userlist = users
        this.totalnum = total
      }
    }
  }
}
