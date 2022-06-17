<template>
  <a-form-model class="calculator">
    <a-form-model-item label="CSV文件" prop="uploadFile">

    4G小区信息表
    <a-upload
        v-model="uploadFile"
        :accept="true"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :remove="remove"
    >
      <a-button>
        <a-icon type="upload" />
        点击上传
      </a-button>
    </a-upload>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import csv from 'csvtojson'

export default {
  name: 'HelloWorld',
  data() {
    return {
      uploadFile: '',
      /** 上传的文件列表 */
      fileList: [],
    }
  },
  methods: {
    /** 拦截上传事件 */
    beforeUpload(file, fileList) {
      if (fileList.length <= 1) {
        this.fileList = fileList
        this.uploadFile = file
        const fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = (even) => {
          const csvString = even.target.result
          const newCsvString = csvString
              .replace('登录账号', 'account')
              .replace('用户姓名', 'realName')
              .replace('用户昵称', 'name')
              .replace('密码', 'password')
              .replace('手机号', 'phone')
              .replace('电子邮箱', 'email')
          // 使用第三方库将csv转为object
          csv().fromString(newCsvString).then(formDataList => {
            this.formDataList = formDataList
          })
        }
      }
      // 返回false则不执行上传操作
      return false
    },
    /** 移除文件时的回调函数 */
    remove() {
      this.uploadFile = ''
      this.fileList = []
      return true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
