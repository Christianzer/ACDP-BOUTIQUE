<template>
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
      </router-link>

      <a class="sidebar-heading">
        GESTION PVC
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">


      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'menu_manager'}">
          <span class="text-uppercase">Tableau de bord</span>
        </router-link>
      </li>

      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'gestionstock'}">
          <span class="text-uppercase">Gestion de stock</span>
        </router-link>
      </li>

      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'caisse'}">
          <span class="text-uppercase">Activer Caisse</span>
        </router-link>
      </li>

      <li class="nav-item active">
        <b-button class="nav-link" type="button" @click="deconnexion" style=" background-color: Transparent;background-repeat:no-repeat;border: none;cursor:pointer;overflow: hidden; ">
          <span class="text-uppercase" >Deconnexion</span>
        </b-button>
      </li>


    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <Entete></Entete>
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import Entete from "./Entete";
export default {
  name: "Menu",
  components:{Entete},
  methods: {
    deconnexion(){
      localStorage.removeItem('nom');
      localStorage.removeItem('prenoms');
      localStorage.removeItem('type');
      localStorage.removeItem('produits');
      localStorage.removeItem('articles_prod');
      this.$router.replace({ name: "login" });
    }
  }
}
</script>

<style scoped>

</style>