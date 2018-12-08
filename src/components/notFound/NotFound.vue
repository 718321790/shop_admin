<template>
  <h1>404 NOT FOUND , {{time}}秒后返回首页</h1>
</template>

<script>
export default {
  data () {
    return {
      time: 3
    }
  },
  created () {
    const timer = setInterval(() => {
      this.time--
      if (this.time === 0) {
        clearInterval(timer)
        this.$router.push('/home')
      }
    }, 1000)
  }
}
</script>

<style>
#app {
  background-color: #fff;
}
h1 {
  margin: 0;
  padding: 20px;
}
</style>
