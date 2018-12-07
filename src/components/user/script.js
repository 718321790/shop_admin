export default {
  data () {
    return {
      userlist: [],
      totalnum: 0,
      pagesize: 3,
      searchTxt: '',
      curPage: 1,
      isSearched: false,
      dialogFormVisible: false,
      userAddform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      assignRoleForm: {
        username: '',
        id: -1,
        rid: ''
      },
      rolesList: [],
      editDialogFormVisible: false,
      userEditform: {
        id: -1,
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1[345678]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        email: [
          {
            pattern: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1[345678]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
          }
        ]
      },
      assignDialogFormVisible: false
    }
  },
  created () {
    this.getUserList()
    this.getRoles()
  },
  methods: {
    async submitAssignForm () {
      // console.log(this.assignRoleForm.id)
      // console.log(this.assignRoleForm.rid)
      const res = await this.axios.put(`users/${this.assignRoleForm.id}/role`, {
        rid: this.assignRoleForm.rid
      })
      // console.log(res)
      const { status, msg } = res.data.meta
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.assignDialogFormVisible = false
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    async getRoles () {
      const res = await this.axios.get('roles')
      const newobj = res.data.data
      this.rolesList = newobj
      // console.log(this.rolesList)
    },
    async submitForm () {
      try {
        await this.$refs.userAddform.validate()
        const res = await this.axios.post('users', this.userAddform)
        // console.log(res)
        const {
          meta: { msg, status }
        } = res.data
        if (status === 201) {
          this.$message({
            type: 'success',
            message: msg,
            duration: 800
          })
          this.dialogFormVisible = false
          this.getUserList(this.curPage)
        } else {
          this.$message({
            type: 'error',
            message: msg,
            duration: 1000
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async submitEditForm () {
      try {
        await this.$refs.userEditform.validate()
        const { email, mobile } = this.userEditform
        const res = await this.axios.put(`users/${this.userEditform.id}`, {
          email,
          mobile
        })
        console.log(res)
        const {
          meta: { msg, status }
        } = res.data
        if (status === 200) {
          this.$message({
            message: msg,
            type: 'success',
            duration: 800
          })
          this.editDialogFormVisible = false
          this.getUserList(this.curPage)
        } else {
          this.$message({
            message: msg,
            type: 'error',
            duration: 1000
          })
        }
      } catch (err) {}
    },
    closeAddUserDialog () {
      this.$refs.userAddform.resetFields()
    },
    closeeditUserDialog () {
      this.$refs.userEditform.resetFields()
    },
    async openAssignDialog (id) {
      this.assignDialogFormVisible = true
      const res = await this.axios.get(`users/${id}`)
      // console.log(res)
      const { status } = res.data.meta
      if (status === 200) {
        const { data } = res.data
        data.rid = data.rid === -1 ? '' : data.rid
        for (const k in this.assignRoleForm) {
          this.assignRoleForm[k] = data[k]
        }
        // console.log(this.assignRoleForm)
      }
    },
    search () {
      this.getUserList(1, this.searchTxt)
      if (this.searchTxt !== '') {
        this.isSearched = true
      } else {
        this.isSearched = false
      }
    },
    async showEditUserDialog (data) {
      this.editDialogFormVisible = true
      const res = await this.axios.get(`users/${data.id}`)
      console.log(res)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        const { data } = res.data
        const myUserEditform = this.userEditform
        for (const k in myUserEditform) {
          myUserEditform[k] = data[k]
        }
      } else {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    showAddUserDialog () {
      this.dialogFormVisible = true
    },
    pageChange (page) {
      if (this.isSearched) {
        this.getUserList(page, this.searchTxt)
      } else {
        this.getUserList(page)
      }
      this.curPage = page
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
        const maxPage = Math.ceil(this.totalnum / this.pagesize)
        let curPage = 0
        if (maxPage === this.curPage && this.totalnum % this.pagesize === 1) {
          curPage = this.curPage - 1
        } else {
          curPage = this.curPage
        }
        if (this.isSearched) {
          this.getUserList(curPage, this.searchTxt)
        } else {
          this.getUserList(curPage)
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
