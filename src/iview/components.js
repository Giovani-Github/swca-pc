// 按需引入iview的组件
import {
  Card,
  Button,
  Table,
  Menu,
  Row,
  Col,
  Icon,
  Input,
  Select,
  Option,
  Modal,
  MenuItem,
  MenuGroup,
  Submenu,
  Tabs,
  TabPane,
  Radio,
  RadioGroup,
  Layout,
  Avatar,
  Carousel,
  CarouselItem,
  Message,
  // 表单(带验证)组件相关
  Form,
  FormItem,
  DatePicker,
  TimePicker,
  CheckboxGroup,
  Checkbox,
  Alert,
  Steps,
  Step,
  Page,
  Sider,
  Breadcrumb,
  BreadcrumbItem,
  Header,
  Tag,
  Tooltip,
  Divider,
  LoadingBar,
  Spin,
  Poptip,
  Upload,
  Badge,
  Time,
  Drawer,
  CellGroup,
  Cell,
} from 'iview';

const iview = {
  install: function (Vue) {
    Vue.component('Card', Card);
    Vue.component('Button', Button);
    Vue.component('Table', Table);
    Vue.component('Menu', Menu);
    Vue.component('Submenu', Submenu);
    Vue.component('MenuGroup', MenuGroup);
    Vue.component('MenuItem', MenuItem);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Select', Select);
    Vue.component('Option', Option);
    Vue.component('Modal', Modal);
    Vue.component('Tabs', Tabs);
    Vue.component('TabPane', TabPane);
    Vue.component('Radio', Radio);
    Vue.component('RadioGroup', RadioGroup);
    Vue.component('Layout', Layout);
    Vue.component('Avatar', Avatar);
    Vue.component('Carousel', Carousel);
    Vue.component('CarouselItem', CarouselItem);
    Vue.component('Form', Form);
    Vue.component('FormItem', FormItem);
    Vue.component('DatePicker', DatePicker);
    Vue.component('TimePicker', TimePicker);
    Vue.component('CheckboxGroup', CheckboxGroup);
    Vue.component('Checkbox', Checkbox);
    Vue.component('Alert', Alert);
    Vue.component('Steps', Steps);
    Vue.component('Step', Step);
    Vue.component('Page', Page);
    Vue.component('Sider', Sider);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('BreadcrumbItem', BreadcrumbItem);
    Vue.component('Header', Header);
    Vue.component('Tag', Tag);
    Vue.component('Tooltip', Tooltip);
    Vue.component('Divider', Divider);
    Vue.component('LoadingBar', LoadingBar);
    Vue.component('Spin', Spin);
    Vue.component('Poptip', Poptip);
    Vue.component('Upload', Upload);
    Vue.component('Badge', Badge);
    Vue.component('Time', Time);
    Vue.component('Drawer', Drawer);
    Vue.component('CellGroup', CellGroup);
    Vue.component('Cell', Cell);
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Select = Select;
  }
}

export default iview
