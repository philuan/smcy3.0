import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/home/Home')
const Classification = () => import('@/components/classification/Classification')
const ShoppingCart = () => import('@/components/ShoppingCart/ShoppingCart')
const Order = () => import('@/components/order/Order')
const Mine = () => import('@/components/mine/Mine')

// 首页二级页面： 消息、搜索、搜索结果、医院、项目列表
const Message = () => import('@/components/home/Message')
const Lsearch = () => import('@/components/home/lsearch/Lsearch')
const SearchResult = () => import('@/components/home/lsearch/SearchResult')
const Hospital = () => import('@/components/home/hospital/Hospital')
const ProjectList = () => import('@/components/home/ProjectList')

// 购物车二级页面： 订单确认、支付
const OrderConfirm = () => import('@/components/ShoppingCart/OrderConfirm')
const PaySuccess = () => import('@/components/ShoppingCart/PaySuccess')

// 订单二级页面 立即预约、查看报告、评论、订单详情、预约确认
const ImmediaterReservation = () => import('@/components/order/tlpage/ImmediaterReservation')
const ViewReport = () => import('@/components/order/tlpage/ViewReport')
const Comment = () => import('@/components/order/tlpage/Comment')
const OrderDetail = () => import('@/components/order/tlpage/OrderDetail')
const AppointmentConfirm = () => import('@/components/order/tlpage/AppointmentConfirm')
// 分类二级页面
const ProjectDetail = () => import('@/components/classification/tlpage/ProjectDetail')

// 个人中心二级页面
const Extension = () => import('@/components/mine/tlpage/Extension')
const Setting = () => import('@/components/mine/tlpage/Setting')
const PersionalInformation = () => import('@/components/mine/tlpage/PersionalInformation')
const Integral = () => import('@/components/mine/tlpage/Integral')
const Appointment = () => import('@/components/mine/tlpage/Appointment')
const MyReport = () => import('@/components/mine/tlpage/MyReport')
const PatientList = () => import('@/components/mine/tlpage/PatientList')
const MyComment = () => import('@/components/mine/tlpage/MyComment')
const Help = () => import('@/components/mine/tlpage/Help')
const Coupon = () => import('@/components/mine/tlpage/Coupon')
const MyFollow = () => import('@/components/mine/tlpage/MyFollow')
const AddPatient = () => import('@/components/mine/tlpage/AddPatient')
const Refund = () => import('@/components/mine/tlpage/Refund')
Vue.use(Router)
// meta下边的roleCode通过状态值跟后端匹配，判断用户访问权限, 暂时权限code对应信息还没定
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        roleCode: 1
      }
    },
    {
      path: '/classification',
      name: 'Classification',
      component: Classification,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/projectdetail/:uuid/:type',
      name: 'ProjectDetail',
      component: ProjectDetail,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/shoppingcart',
      name: 'ShoppingCart',
      component: ShoppingCart,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/extension',
      name: 'Extension',
      component: Extension,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/persionalinformation',
      name: 'PersionalInformation',
      component: PersionalInformation,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/integral',
      name: 'Integral',
      component: Integral,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/myreport',
      name: 'MyReport',
      component: MyReport,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/patientlist',
      name: 'PatientList',
      component: PatientList,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/mycomment',
      name: 'MyComment',
      component: MyComment,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/myfollow',
      name: 'MyFollow',
      component: MyFollow,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/addpatient',
      name: 'AddPatient',
      component: AddPatient,
      meta: {
        roleCode: 2
      }
    },
    {
      path: '/immediaterreservation',
      name: 'ImmediaterReservation',
      component: ImmediaterReservation,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/viewreport',
      name: 'ViewReport',
      component: ViewReport,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/appointmentconfirm',
      name: 'AppointmentConfirm',
      component: AppointmentConfirm,
      meta: {
        roleCode: 5
      }
    },
    {
      path: '/refund',
      name: 'Refund',
      component: Refund,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/lsearch',
      name: 'Lsearch',
      component: Lsearch,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/searchresult/:keywords_uuid/:from',
      name: 'SearchResult',
      component: SearchResult,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/hospital/:uuid',
      name: 'Hospital',
      component: Hospital,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/orderconfirm',
      name: 'OrderConfirm',
      component: OrderConfirm,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/paysuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        roleCode: 1
      }
    },
    {
      path: '/projectlist/:id/:name/:leaf',
      name: 'ProjectList',
      component: ProjectList,
      meta: {
        roleCode: 1
      }
    }
  ]
})
