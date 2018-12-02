<template>

  <el-row
    type="flex"
    class="row-bg login-wrapper"
    justify="center"
    align="middle"
  >
    <el-col
      :xs="14"
      :sm="12"
      :md="10"
      :lg="8"
      :xl="6"
    >
      <div
        class="login"
        @keyup.enter="submitForm('loginForm')"
      >
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item
            label="账号"
            prop="username"
          >
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
            >提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
          if (res.data.meta.status === 400) {
            this.$message({
              message: `错误：${res.data.meta.msg}`,
              type: 'error',
              duration: 2000
            })
          } else if (res.data.meta.status === 200) {
            // console.log(res)
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1500
            })
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
          }
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.login {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
}
.login-wrapper {
  height: 100%;
  background-color: #2c3e50;
}
</style>
