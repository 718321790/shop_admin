export default {
  data () {
    return {
      tableData: [],
      roleAssignData: [],
      aleadyAssignd: [],
      curAssignId: -1,
      assignDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async updateAssign () {
      const newArr1 = this.$refs.tree.getCheckedKeys()
      // console.log(newArr1)
      const newArr2 = this.$refs.tree.getHalfCheckedKeys()
      const myArr = newArr1.concat(newArr2)
      const res = await this.axios.post(`roles/${this.curAssignId}/rights`, {
        rids: myArr.join(',')
      })
      const { status, msg } = res.data.meta
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.assignDialogVisible = false
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    async getAssignData () {
      const res = await this.axios.get(`rights/tree`)
      // console.log(res)
      const { status, msg } = res.data.meta
      if (status === 200) {
        this.roleAssignData = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 1000
        })
      }
    },
    async getAlreadyAssigned () {
      // this.aleadyAssignd = []
      const res = await this.axios.get('roles')
      let temparr = []
      const { data } = res.data
      this.$nextTick(() => {
        // console.log(data)
        const keys = data.find(item => item.id === this.curAssignId).children
        console.log(keys)
        keys.forEach(v1 => {
          v1.children.forEach(v2 => {
            v2.children.forEach(v3 => {
              temparr.push(v3.id)
              // console.log(v3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(temparr)
      })
    },
    async getRoleList () {
      const res = await this.axios.get('roles')
      // console.log(res.data.data)
      const { meta } = res.data
      if (meta.status === 200) {
        this.tableData = res.data.data
      }
    },
    assignDialog (id) {
      this.assignDialogVisible = true
      this.curAssignId = id
      // console.log(this.curAssignId)
      this.getAlreadyAssigned()
    },
    assignDialogClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    indexMethod (index) {
      return index
    },
    async handleClose (roleId, rightId) {
      const res = await this.axios.delete(`roles/${roleId}/rights/${rightId}`)
      // console.log(res)
      const { msg, status } = res.data.meta
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg,
          duration: 800
        })
        this.tableData.find(item => item.id === roleId).children = res.data.data
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 1000
        })
      }
    }
  },
  async created () {
    this.getRoleList()
    this.getAssignData()
  }
}
