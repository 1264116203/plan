import Vue from 'vue'
import Antd, {
  AutoComplete,
  DatePicker,
  Layout,
  List,
  Mentions,
  Menu,
  Select,
  Tabs,
  TreeSelect
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

Vue.use(Antd)

// ↓ 注册因为使用了动态组件名所以不能被WebStorm直接识别的组件 ↓
Vue.component('AAutoCompleteOption', AutoComplete.Option)
Vue.component('AAutoCompleteOptGroup', AutoComplete.OptGroup)
Vue.component('ADatePicker', DatePicker)
Vue.component('ALayout', Layout)
Vue.component('ALayoutContent', Layout.Content)
Vue.component('ALayoutFooter', Layout.Footer)
Vue.component('ALayoutHeader', Layout.Header)
Vue.component('ALayoutSider', Layout.Sider)
Vue.component('AListItemMeta', List.Item.Meta)
Vue.component('AMentionsOption', Mentions.Option)
Vue.component('AMenuDivider', Menu.Divider)
Vue.component('AMenuItem', Menu.Item)
Vue.component('AMenuItemGroup', Menu.ItemGroup)
Vue.component('AMenuSubMenu', Menu.SubMenu)
Vue.component('AMonthPicker', DatePicker.MonthPicker)
Vue.component('ASelectOption', Select.Option)
Vue.component('ASelectOptGroup', Select.OptGroup)
Vue.component('ATabContent', Tabs.TabContent)
Vue.component('ATabPane', Tabs.TabPane)
Vue.component('ATreeSelectTreeNode', TreeSelect.TreeNode)
