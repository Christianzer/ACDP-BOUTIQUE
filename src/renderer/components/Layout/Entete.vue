<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <h2 class="h3 mb-0 text-gray-800 text-primary text-left">{{nom}} {{prenoms}} ({{typeUtil}})</h2>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Entete",
  data() {
    return {
      typeUtil: '',
      nom:'',
      prenoms:''
    }
  },
  methods: {
    roleUtilisateur(typedata) {
      if (typedata === 1) {
        this.typeUtil = 'MANAGER PVC'
      } else {
        this.typeUtil = 'CAISSIER PVC'
      }
    }
  },
  created() {
    this.nom = JSON.parse(localStorage.getItem('nom'))
    this.prenoms = JSON.parse(localStorage.getItem('prenoms'))
    var type_util = parseInt(JSON.parse(localStorage.getItem('type')))
    this.roleUtilisateur(type_util)
  },

}
</script>

<style scoped>

</style>