<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-row justify="space-between">
        <el-col
          class="txt_left"
          :span="8"
        >
          <div class="grid-content bg-purple">
            <img src="../assets/images/logo.png">
          </div>
        </el-col>
        <el-col
          class="txt_middle"
          :span="8"
        >
          <div class="grid-content bg-purple title">电商后台管理系统</div>
        </el-col>
        <el-col
          class="txt_right"
          :span="8"
        >
          <div class="grid-content bg-purple">欢迎星耀会员<a
              href="javascript:;"
              class="loginout"
              @click="logout"
            >退出</a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="205px">
        <el-row class="tac my_ul">
          <el-col
            :span="24"
            class="my_ul"
          >
            <el-menu
              :router="true"
              :default-active="$route.path.split('/').length === 2 ? $route.path: ('/'+$route.path.split('/')[1])"
              class="el-menu-vertical-demo  my_ul"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="/user">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="/roles">
                  <i class="el-icon-menu"></i>
                  <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="/rights">
                  <i class="el-icon-menu"></i>
                  <span slot="title">权限列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="3-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">分类参数</span>
                </el-menu-item>
                <el-menu-item index="/categories">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品分类</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="4-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">订单列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item index="5-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">数据报表</span>
                </el-menu-item>
              </el-submenu> -->
              <el-submenu
                :index="item.order + ''"
                v-for="item in menu"
                :key="item.id"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item
                  v-for="level2 in item.children"
                  :key="level2.id"
                  :index="'/'+level2.path"
                >
                  <i class="
                  el-icon-menu"></i>
                  <span slot="title">{{level2.authName}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="mainbody">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created () {
    this.getMenu()
  },
  data () {
    return {
      menu: []
    }
  },
  methods: {
    async getMenu () {
      const res = await this.axios.get('menus')
      // console.log(res)
      const { status } = res.data.meta
      if (status === 200) {
        const { data } = res.data
        this.menu = data
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$confirm('确定退出当前账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 1000
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.home {
  .txt_left {
    text-align: left;
  }
  .txt_middle {
    text-align: center;
  }
  .txt_right {
    text-align: right;
  }
  &-header {
    line-height: 60px;
  }
  background-color: #fff;
  height: 100%;
  &-header {
    font-weight: bolder;
    img {
      width: 180px;
      vertical-align: middle;
    }
    background-color: #b3c1cd;
    .title {
      color: #fff;
      font-size: 28px;
    }
    .loginout {
      color: #daa520;
    }
  }
  .my_ul {
    height: 100%;
  }
}
.mainbody {
  background-color: #eaeef1;
}
</style>
