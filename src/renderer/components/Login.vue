<template>
  <div id="login" class="container-fluid">
    <form>
      <div class="imgcontainer">
        <img src="@/components/Logo.png" alt="Avatar" class="avatar">
      </div>

      <div>
        <label><b>Nom utilisateur</b></label>
        <b-form-input type="text" placeholder="Entrer nom utilisateur" v-model="input.username" />

        <label><b>Mot de passe</b></label>
        <b-form-input type="password" placeholder="Entrer mot de passe" v-model="input.password" />

        <div class="text-center">
          <b-button variant="success" type="button" @click="Loading = true,login()" :disabled="Loading">
            CONNEXION
          </b-button>
        </div>

      </div>
    </form>
    <b-overlay :show="Loading" no-wrap>
    </b-overlay>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      Loading : false,
      input: {
        username: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters([
      'type','valeurs','nom',
      'prenoms','matricule','statut_caissier'
    ])
  },
  methods: {
    async login() {
      var today = moment().format('YYYY-MM-DD')
      var hier = moment(today).add(-1,'days').format('YYYY-MM-DD')
      const data = {
        today : today,
        hier : hier
      }
      this.$store.dispatch('connexionutilisateur',this.input).then(() => {
        this.$store.dispatch('informationutilisateur').then(()=>{
          if (this.type === 1){
            localStorage.setItem('type',JSON.stringify(this.type))
            localStorage.setItem('nom',JSON.stringify(this.nom))
            localStorage.setItem('prenoms',JSON.stringify(this.prenoms))
            this.$store.dispatch('initialisation',data).then(()=>{
              this.$router.replace({ name: "menu_manager" });
            }).catch((e) => {
              console.log(e)
            })
          }else {
            if(this.statut_caissier === false){
              this.Loading = false
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Votre caisse n'a pas été activer par le manager! Veuillez le contacter svps",
              })
            }else {
              localStorage.setItem('type',JSON.stringify(this.type))
              localStorage.setItem('nom',JSON.stringify(this.nom))
              localStorage.setItem('prenoms',JSON.stringify(this.prenoms))
              localStorage.setItem('matricule',JSON.stringify(this.matricule))
              var createdtoday = moment().format('YYYY-MM-DD')
              this.$store.dispatch('afficherListe',createdtoday).then(() => {
                localStorage.setItem('articles_prod',JSON.stringify(this.valeurs))
                this.$router.replace({ name: "menu_caissier" });
                console.log('ok')
              }).catch((e) => {
                console.log(e)
              })
            }

          }
        }).catch((e) => {
          console.log(e)
        })
      }).catch((e) => {
        this.Loading = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Identifiant ou mot de passe incorect!',
        })
      })
    }
  }
}
</script>

<style scoped>

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}


/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 20%;
  border-radius: 50%;
}

/* Add padding to containers */
.container-perso {
  padding: 16px;
}


</style>