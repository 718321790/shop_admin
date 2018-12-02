import axios from 'axios'
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
    getUserList (pagenum = 1, txt = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            pagesize: this.pagesize,
            pagenum,
            query: txt
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res)
          const data = res.data.data
          if (res.data.meta.status === 401) {
            this.$message({
              message: res.data.meta.msg,
              type: 'warning',
              duration: 1000
            })
            this.$router.push('/login')
          } else {
            // this.pagenum = data.pagenum
            this.userlist = data.users
            this.totalnum = data.total
          }
        })
    }
  }
}
