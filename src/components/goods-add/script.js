import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      options: [],
      steps: 1,
      stepName: 'info',
      propsObj: {
        value: 'cat_id',
        label: 'cat_name'
      },
      GoodsCategoriesData: {
        goods_name: '',
        goods_cat_arr: [],
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        is_promote: '',
        pics: [],
        goods_introduce: ''
      },
      // 图片
      fileList2: [],
      uploadHeader: {
        Authorization: ''
      },
      // 内容
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
    async getCategoryAddList () {
      const res = await this.axios.get('categories', {
        params: {
          type: 3
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
    changeTaps (tab) {
      this.steps = +tab.index + 1
    },
    nextStep (step, name) {
      this.steps = step
      this.stepName = name
    },
    // 图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    getRes (res, file, fileList) {
      console.log(res)
      const { status, msg } = res.meta
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg,
          duration: 800
        })
        const data = {
          pic: res.data.tmp_path
        }
        this.GoodsCategoriesData.pics.push(data)
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 1000
        })
      }
    },
    async addGoods () {
      /* eslint-disable camelcase */
      const {
        goods_name,
        goods_cat_arr,
        goods_price,
        goods_weight,
        goods_number,
        is_promote,
        pics,
        goods_introduce
      } = this.GoodsCategoriesData
      const res = await this.axios.post('goods', {
        goods_name,
        goods_cat: goods_cat_arr.join(','),
        goods_price,
        goods_weight,
        goods_number,
        is_promote,
        pics,
        goods_introduce,
        attrs: []
      })
      console.log(res)
      const { status, msg } = res.data.meta
      if (status === 201) {
        this.$message({
          type: 'success',
          message: msg,
          duration: 800
        })
      } else {
        this.$message({
          type: 'error',
          message: msg,
          duration: 1000
        })
      }
    }
  },
  created () {
    this.getCategoryAddList()
    this.uploadHeader.Authorization = localStorage.getItem('token')
  }
}
