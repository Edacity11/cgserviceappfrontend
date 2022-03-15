import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SessionManager from '../components/user/SessionManager.vue'

//User Views
import SignUpView from '../views/user/SignUpView.vue'
import SignInView from '../views/user/SignInView.vue'

//Category Views
import CategoryView from '../views/category/CategoryView.vue'
import EditCategoryView from '../views/category/EditCategoryView.vue'

//Service Views
import ServiceView from '../views/service/ServiceView.vue'
import AddServiceView from '../views/service/AddServiceView.vue'
import EditServiceView from '../views/service/EditServiceView.vue'

//Booking Views
import BookingView from '../views/booking/BookingView.vue'
import UserBookingsView from '../views/booking/UserBookingsView.vue'

//Admin Dashboard View
import UserRegistrationsView from '../views/admindashboard/UserRegistrations.vue'
import BookingHistoryView from '../views/admindashboard/BookingHistory.vue'
import BookingTrackerView from '../views/admindashboard/BookingTracker.vue'

//Cart Views
import CartView from '../views/cart/CartView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  //User Routes
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignInView
  },

  //Category Routes
  {
    path: '/AddCategory',
    name: 'AddCategoryView',
    component: CategoryView
  },
  {
    path: '/EditCategory/:id',
    name: 'EditCategoryView',
    component: EditCategoryView
  },

  //Services Routes
  {
    path: '/Services/:id',
    name: 'Services',
    component: ServiceView
  },
  {
    path: '/AddService/:id',
    name: 'AddServiceView',
    component: AddServiceView
  },
  {
    path: '/EditService/:id',
    name: 'EditServiceView',
    component: EditServiceView
  },

  //Booking Routes
  {
    path: '/Booking/:id',
    name: 'BookingView',
    component: BookingView
  },
  {
    path: '/YourBookings/:id',
    name: 'UserBookingsView',
    component: UserBookingsView
  },

  //Admin Dashboard Routes
  {
    path: '/UserRegistrations',
    name: 'UserRegistrationsView',
    component: UserRegistrationsView
  },
  {
    path: '/BookingHistory',
    name: 'BookingHistoryView',
    component: BookingHistoryView
  },
  {
    path: '/BookingTracker',
    name: 'BookingTrackerView',
    component: BookingTrackerView
  },

  //Cart Routes
  {
    path: '/Cart/',
    name: 'CartView',
    component: CartView
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
