export interface jwtPayload {
  _id?: string
  iat?: number
  exp?: number
  success: boolean
}

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  points: number;
  level: string;
}


export interface FavoriteItem {
  name: string;
  price: string;
  image: string;
  rating: number;
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  pointsRequired: number;
}

export type TabType = 'overview' | 'orders' | 'favorites' | 'rewards' | 'settings';

export interface StaffOrder {
  id: string;
  customerName: string;
  items: string;
  total: string;
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  time: string;
  priority: 'normal' | 'urgent';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'offline';
  ordersCompleted: number;
}

export interface Stats {
  totalOrders: number;
  activeOrders: number;
  revenue: string;
  customers: number;
  ordersTrend: string;
  revenueTrend: string;
}

export type StaffTabType = 'orders' | 'manage-menu' | 'manage-menu-options' | 'analytics';

export interface DashboardStats {
  totalRevenue: string;
  totalOrders: number;
  activeUsers: number;
  averageOrderValue: string;
  revenueTrend: number;
  ordersTrend: number;
  usersTrend: number;
  aovTrend: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: 'completed' | 'pending' | 'cancelled' | 'processing';
  time: string;
  rider: string;
}

export interface TopProduct {
  name: string;
  orders: number;
  revenue: string;
  trend: number;
  icon: string;
}

export interface SystemUser {
  id: string;
  name: string;
  role: 'customer' | 'staff' | 'rider' | 'admin';
  status: 'active' | 'inactive';
  lastActive: string;
  ordersCompleted?: number;
}

export interface RevenueData {
  day: string;
  revenue: number;
}

export type AdminTabType = 'overview' | 'orders' | 'users' | 'products' | 'riders' | 'analytics' | 'settings';

export interface MenuItem {
  // id: string;
  name: string;
  description: string;
  categories: string[];
  category: string;
  price: string;
  image: string;
  available: boolean;
  tagline: string;
  buntypes: string[],
  toppings: string[],

  // preparationTime: number;
  // calories?: number;
  // ingredients: string[];
  // rating: number;
  // soldCount: number;
  // featured: boolean;
}

export type CategoryType = 'all' | 'burgers' | 'sides' | 'drinks' | 'desserts';

export interface FormData {
  picture: string,
  name: string,
  tagline: string,
  price: string,
  categories: string[],
  buntypes: string[],
  toppingsName: string,
  toppingsPrice: string,
  description: string,
  available: boolean
}

export interface Products {
  _id: string,
  picture: string,
  name: string,
  tagline: string,
  price: string,
  categories: [],
  category: string,
  buntypes: string[],
  toppingsName: string,
  toppingsPrice: string,
  description: string,
  available: boolean,
  featured?: boolean
}

export interface IToppingForm {
  name: string
  price: number
}

export interface IOptionsForm {
  meatTypes: string
  sides: string
  beverages: string
  categories: string
  toppings: IToppingForm[]
}

export interface IProduct {
  picture: string
  name: string
  tagline: string
  price: string
  categories: string[]
  buntypes: string[]
  description: string
  available: boolean
  preparationTime: number
  rating: number
  soldCount: number
}


export interface SelectedOptions {
  meatType: string
  side: string
  beverage: string
  toppings: IToppingForm[]
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  options: SelectedOptions
  subtotal: number
  image: string
}

export interface CartProduct {
  _id: string
  name: string
  price: number
  toppings?: IToppingForm
}

export interface OrderItemPayload {
  productId: string
  name: string
  price: number
  quantity: number
  meatType: string
  side: string
  beverage: string
  note?: string
  itemTotal: number
  toppings: {
    name: string
    price: number
  }[]
}

export interface PlaceOrderPayload {
  userId: string
  items: OrderItemPayload[]
  deliveryFee: number
  delivery: string
  note: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  options: {
    meatType: string
    side: string
    beverage: string
    toppings: IToppingForm[]
  }
  subtotal: number
}

export interface CartItemPayload {
  productId: string
  quantity: number
  options: {
    meatType?: string
    side?: string
    beverage?: string
    toppings: {
      name: string
      price: number
    }[]
  }
  itemTotal: number
  subtotal: number
}

export type PaymentMethod = 'card' | 'transfer' | 'cash'
export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface CreateOrderInput extends PlaceOrderPayload {
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentReference?: string
  customer: {
    name: string
    email: string
    phone: string
  }
}


export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled'

export interface updateOrderStatusInput {
  orderId: string
  status: OrderStatus
  userId: string
  isAdmin?: boolean
}


export interface IOrder {
  _id: string
  user: string
  items: OrderItemPayload[]
  delivery: string
  deliveryFee: number
  subtotal: number
  total: number
  picture: string
  paymentMethod: 'card' | 'transfer' | 'cash'
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
  paymentReference:string
  status: 'pending'
  | 'confirmed'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';
}
export type GetOrdersResponse = {
  success: boolean
  orders: IOrder[]
  message?: string
}



export interface ICustomerOrder {
  paymentReference: string,
  paymentStatus: string,
  customer: {
    name: string,
    email: string,
    phone: string
  },
  delivery: string,
  note: string,
  items: OrderItemPayload[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  paymentMethod: string,
  createdAt: string,
  estimatedDelivery: string,
  rider: string
} 