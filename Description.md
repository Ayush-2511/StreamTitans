1.PROJECT DESCRIPTION
Our project is a live commerce platform focused on fashion and thrifting, designed to make
online shopping more interactive, organized, and engaging.
It includes features like:
1. Live Selling
Sellers can go live and showcase their products in real time. Each stream is tagged (like
casualwear, ethnic, home items) and automatically categorized.
2. Smart Filtering System
Users can filter products and streams based on category, price range, and type (live or
listings).
3. Smart Purchase System (Key Feature)
The platform supports two types of buying flows based on product type:
a) For thrift or single-piece items, users can instantly claim products during live streams by
clicking a claim button.(first-come,first-served model)
b) For regular products with multiple stock (like bedsheets or apparel or clothes ), users can
click a dedicated “Buy” button within the live stream interface. This opens a product window
where they can select options like size or color and proceed to purchase.
4. Thrift Marketplace
A dedicated section for second-hand fashion where users can either list products or sell
them through live streams, supporting affordability and sustainability.
5. Real-Time Interaction
Live chat allows buyers to ask questions about size, condition, and pricing, making the
experience similar to in-person shopping.
6. Dual Interface System (Buyer & Seller)
The platform supports two types of users: buyers and sellers. Buyers have a clean interface
focused on discovering streams, interacting, and purchasing products. Sellers have a
dedicated dashboard where they can start live streams, list products, and view basic
analytics such as views and sales.
7. Seller Profile & Trust System
Each seller has a dedicated profile accessible directly from the live stream interface. Users
can view basic details such as seller name, products sold, and categories, along with a
verification badge to establish trust.
8. Live Now Section
A scrollable section that displays all ongoing streams (like stories/reels), helping users
quickly join active sessions and increasing engagement.
9. Smart Recommendations (ML Feature)(optional)
The platform suggests products based on user activity, such as viewed categories and
interactions, making discovery more personalized.
10. Delivery (Future Scope)
We simulate a checkout flow in the current version and plan to integrate with logistics
partners like Ekart for delivery in future versions.
Overall, the platform combines live interaction with structured e-commerce, specifically
targeting the growing fashion and thrift market in India.
2.TECH STACK & IMPLEMENTATION PLAN
• We are using a frontend-focused approach so that we can build a strong and interactive
user experience, while still supporting real-time features using a simple backend.
1. Frontend
• React.js
Used to build the entire application interface. It helps us create different pages like
homepage, live stream, listings, and seller dashboard using reusable components.
• Tailwind CSS
Used for styling. It helps us quickly design a clean and modern UI, including product cards,
buttons, and the reels-style live stream layout.
• React Router
Used for navigation between pages like Home, Live Stream, Listings, Thrift section, and
Seller dashboard.
2. Backend (Firebase)
• We are using Firebase instead of building a complex backend from scratch.
• Firestore (Database)
• Realtime Updates (Firebase listeners)
• Firebase Auth
3. Media Storage
• Cloudinary
Used to store product images and thumbnails for faster loading.
4. Deployment
• Vercel
Used to deploy the frontend and generate a live demo link.
3.PROJECT FLOW
1. Frontend (React + Tailwind)
2. Firebase (Database + Realtime updates)
3. Recommendation logic (client-side)
4. This setup keeps the project simple, fast to build, and easy to scale in future.