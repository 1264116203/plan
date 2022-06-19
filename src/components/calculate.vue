<template>
  <div>
    <a-form-model :model="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }">
      <a-form-model-item label="4G小区信息表">
        <a-upload
            v-model="uploadFile"
            :accept="accept"
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
      <a-form-model-item label="省份" >
        <a-select v-model="form.province" placeholder="请选择省份">
          <a-select-option :value="item" v-for="(item,index) in provinces" :key="index">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="年度">
        <a-select v-model="form.year" :default-value="years[0].value" placeholder="请选择年度">
          <a-select-option :value="item.value" v-for="(item,index) in years" :key="index" >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="流量增长倍数">
        <a-input v-model="form.TrafficGrowthMult" placeholder="请填写流量增长倍数（%）" />
      </a-form-model-item>
      <a-space>
        <a-button type="primary" @click="calculate">
          计算
        </a-button>
        <a-button type="primary" @click="exportData">
          导出
        </a-button>
      </a-space>
    </a-form-model>
    <a-table :columns="columns" :data-source="data">

    </a-table>
  </div>
</template>

<script>
import XLSX from 'xlsx'   //引入

export default {
  name: 'CalculateModel',
  data() {
    return {
      /** 上传文件可以接受的文件类型 */
      accept: '.xls, .xlsx',
      uploadFile: '',
      /** 上传的文件列表 */
      fileList: [],
      /** 省份 */
      provinces: ['黑龙江','辽宁','吉林','河北','山西','陕西','山东','江苏','浙江','河南','湖北','安徽','湖南','江西','云南','海南','四川','台湾','贵州','广东','甘肃','青海','福建'],
      defaultValue:"2022",
      /** 年份 */
      years: [
        {
          label:"2018",
          value:"2018"
        },
        {
          label:"2019",
          value:"2019"
        },
        {
          label:"2020",
          value:"2020"
        },
        {
          label:"2021",
          value:"2021"
        },
        {
          label:"2022",
          value:"2022"
        },
      ],
      /** 增长倍率 */
      growthRate: 0,
      /** 测试数据表数据 */
      testSheetData: [],
      /** 基本信息表数据 */
      baseInfoSheetData: [],
      /** 竞对信息表数据 */
      rivalInfoSheetData: [],
      form: {
        province: undefined,
        year: undefined,
        TrafficGrowthMult: 0
      },
      columns: [
        {
          title: '省份',
          dataIndex: 'province',
          key: 'province'
        },
        {
          title: '线路',
          dataIndex: 'route',
          key: 'route'
        },
        {
          title: '覆盖方式',
          dataIndex: 'overlay',
          key: 'overlay'
        },
        {
          title: '2.6GHz基站',
          dataIndex: '2.6GHz',
          key: '2.6GHz'
        },
        {
          title: '700MHz基站',
          dataIndex: '700MHz',
          key: '700MHz'
        }
      ],
      data: []

    }
  },
  methods: {
    /** 拦截上传事件 */
    beforeUpload(file, fileList) {
      if (fileList.length <= 1) {
        this.fileList = fileList
        this.uploadFile = file

        //表格导入
        const fileReader = new FileReader()
        fileReader.onload = ev => {
          try {

            const data = ev.target.result
            const workbook = XLSX.read(data, {
              type: 'binary'
            })
            for (const sheetName of workbook.SheetNames) {
              switch (sheetName) {
                case '基本信息表':
                  this.baseInfoSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
                  break
                case '测试数据':
                  this.testSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
                  break
                case '竞对信息':
                  this.rivalInfoSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
                  break
              }

            }
            console.log('基本信息表', this.baseInfoSheetData)
            console.log('测试数据', this.testSheetData)
            console.log('竞对信息', this.rivalInfoSheetData)
          } catch (e) {
            return false
          }
        }
        fileReader.readAsBinaryString(fileList[0])
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

    /** 计算 */
    calculate() {





    },
    /** 导出数据 */
    exportData() {
      console.log('导出数据')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
