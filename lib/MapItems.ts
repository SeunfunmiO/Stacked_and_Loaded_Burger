import { DashboardStats, RecentOrder, RevenueData, Staff, StaffOrder, Stats, SystemUser, TopProduct } from "@/lib/type";

export const burgerMenus = [
    {
        id: 'beef', image: 'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/beef-burger.png',
        name: 'Beef Burger', tagline: 'Burger for the body is not enough there must be a burger for the soul',
        price: '4500'
    },
    {
        id: 'fish', image: 'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/fish-burger.png',
        name: 'Fish Burger', tagline: 'Burger for the body is not enough there must be a burger for the soul',
        price: '3500'
    },
    {
        id: 'veggie', image: 'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/veggie-burger.png',
        name: 'Veggie Burger', tagline: 'Roses are red, violets are blue. The burger costs less than dinner for two',
        price: '6500'
    }
];

export const foodMenus = [
    {
        id: 1, name: 'Tuna Roast Source', ingredient: 'Tuna / Potatoes / Rice', price: "12,000.00"
    },
    {
        id: 2, name: 'Prawn Sausage Cassoulet', ingredient: 'Prawn / Sausage / Tomatos', price: "30,500.00"
    },
    {
        id: 3, name: 'Roast Pork (4 Sticks)', ingredient: 'Pork / Veggies / Shoyu', price: "10,500.00"
    },
    { id: 4, name: 'Bacon - Wrapped Shrimp with Garlic', ingredient: 'Bacon / Shrimp / Garlic', price: "19,000.00" },
    { id: 5, name: 'Salted Fried Chicken', ingredient: 'Chicken / Olive Oil / Salt', price: "20,100.00" },
    {
        id: 6, name: 'Roasted Red Potatoes with Rosemary', ingredient: 'Potatoes / Rosemary / Butter', price: "12,800.00"
    },
    {
        id: 7, name: 'Imported Salmon Steak', ingredient: "Salmon / Veggies / Oil", price: "18,000.00"
    },
    {
        id: 8, name: 'Crab With Curry Sources', ingredient: 'Crab / Potatoes / Rice', price: "26,500.00"
    },
    {
        id: 9, name: 'Baked Potato Pizza', ingredient: 'Potato / Bread / Cheese', price: "10,000.00"
    },
    {
        id: 11, name: 'Wild Mushroom Bucatini with Kale', ingredient: 'Mushroom / Veggie / White Sources', price: "10,200.00"
    },
    { id: 10, name: 'Lemon and Garlic Green Beans', ingredient: 'Lemon / Garlic / Beans', price: "5,000.00" },

    { id: 12, name: 'Lamb - Beef Kofka Skewers with Tzatziki', ingredient: 'Lamb / Wine / Butter', price: "24,000.00" }
];

export const stats: Stats = {
    totalOrders: 156,
    activeOrders: 12,
    revenue: '₦4,235',
    customers: 89,
    ordersTrend: '+12%',
    revenueTrend: '+8%'
};

// export const orders: StaffOrder[] = [
//     { id: '#ORD-001', customerName: 'John Smith', items: 'Classic Burger x2, Fries', total: '₦28.99', status: 'pending', time: '2 min ago', priority: 'urgent' },
//     { id: '#ORD-003', customerName: 'Mike Wilson', items: 'Bacon Burger, Onion Rings', total: '₦22.00', status: 'ready', time: '8 min ago', priority: 'normal' },
//     { id: '#ORD-005', customerName: 'David Brown', items: 'Classic Burger, Salad', total: '₦18.99', status: 'completed', time: '15 min ago', priority: 'normal' }
// ];

export const staffMembers: Staff[] = [
    { id: '1', name: 'Alex Turner', role: 'Head Chef', avatar: '👨‍🍳', status: 'active', ordersCompleted: 45 },
    { id: '2', name: 'Maria Garcia', role: 'Chef', avatar: '👩‍🍳', status: 'active', ordersCompleted: 38 },
    { id: '3', name: 'James Lee', role: 'Server', avatar: '👨‍💼', status: 'active', ordersCompleted: 52 },
    { id: '4', name: 'Lisa Chen', role: 'Cashier', avatar: '👩‍💼', status: 'offline', ordersCompleted: 41 }
];

export const adminStats: DashboardStats = {
    totalRevenue: '$24,567.89',
    totalOrders: 1247,
    activeUsers: 856,
    averageOrderValue: '$19.71',
    revenueTrend: 12.5,
    ordersTrend: 8.2,
    usersTrend: 15.3,
    aovTrend: -2.4
};

export const recentOrders: RecentOrder[] = [
    { id: '#ORD-1247', customer: 'John Smith', items: 3, total: '$45.99', status: 'completed', time: '2 min ago', rider: 'Mike R.' },
    { id: '#ORD-1246', customer: 'Sarah Johnson', items: 2, total: '$28.50', status: 'processing', time: '5 min ago', rider: 'James L.' },
    { id: '#ORD-1245', customer: 'Emily Davis', items: 5, total: '$67.25', status: 'pending', time: '8 min ago', rider: 'Unassigned' },
    { id: '#ORD-1244', customer: 'Mike Wilson', items: 2, total: '$32.00', status: 'completed', time: '12 min ago', rider: 'Lisa C.' },
    { id: '#ORD-1243', customer: 'David Brown', items: 1, total: '$15.99', status: 'cancelled', time: '15 min ago', rider: 'N/A' }
];

export const topProducts: TopProduct[] = [
    { name: 'Classic Burger', orders: 342, revenue: '$4,446', trend: 12, icon: '🍔' },
    { name: 'Cheese Burger', orders: 298, revenue: '$4,169', trend: 8, icon: '🧀' },
    { name: 'Bacon Burger', orders: 256, revenue: '$4,352', trend: -3, icon: '🥓' },
    { name: 'Double Burger', orders: 189, revenue: '$3,402', trend: 15, icon: '🍔' }
];

export const systemUsers: SystemUser[] = [
    { id: 'USR-001', name: 'Alex Turner', role: 'staff', status: 'active', lastActive: '2 min ago', ordersCompleted: 145 },
    { id: 'USR-002', name: 'Maria Garcia', role: 'rider', status: 'active', lastActive: '5 min ago', ordersCompleted: 234 },
    { id: 'USR-003', name: 'James Lee', role: 'staff', status: 'active', lastActive: '10 min ago', ordersCompleted: 198 },
    { id: 'USR-004', name: 'Lisa Chen', role: 'rider', status: 'inactive', lastActive: '2 hours ago', ordersCompleted: 167 }
];

export const revenueData: RevenueData[] = [
    { day: 'Mon', revenue: 2400 },
    { day: 'Tue', revenue: 2800 },
    { day: 'Wed', revenue: 3200 },
    { day: 'Thu', revenue: 2900 },
    { day: 'Fri', revenue: 3800 },
    { day: 'Sat', revenue: 4200 },
    { day: 'Sun', revenue: 3900 }
];

