<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
   <div class="app-brand demo">
      <a href="./index.jsp" class="app-brand-link">
         <span class="app-brand-logo demo">
            <img src="./assets/img/logo.png" alt="">
         </span>
      </a>
      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
         <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
   </div>
   <div class="menu-inner-shadow"></div>
   <ul class="menu-inner py-1">
      <!-- Menu Items -->
      <li class="menu-item" id="menu-overview">
         <a href="./index.jsp" class="menu-link">
            <i class="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Overview</div>
         </a>
      </li>
      <li class="menu-item" id="menu-managements">
         <a href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Managements">Managements</div>
         </a>
         <ul class="menu-sub">
            <li class="menu-item" id="menu-managements-categories">
               <a href="./categories.jsp" class="menu-link">
                  <div data-i18n="Without menu">Categories</div>
               </a>
            </li>
            <li class="menu-item" id="menu-managements-products">
               <a href="./products.jsp" class="menu-link">
                  <div data-i18n="Without navbar">Products</div>
               </a>
            </li>
            <li class="menu-item" id="menu-managements-orders">
            <a href="./orders.jsp" class="menu-link">
               <div data-i18n="Without navbar">Orders</div>
            </a>
         </li>
         </ul>
      </li>
      <li class="menu-item" id="menu-account">
         <a href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="menu-icon tf-icons bx bx-dock-top"></i>
            <div data-i18n="Account Settings">Account</div>
         </a>
         <ul class="menu-sub">
            <li class="menu-item" id="menu-account-profile">
               <a href="./account-profile.jsp" class="menu-link">
                  <div data-i18n="Account">Profile</div>
               </a>
            </li>
         </ul>
      </li>
   </ul>
</aside>