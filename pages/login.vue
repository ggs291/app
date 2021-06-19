<template>
  <div :style="{ backgroundImage: `url(${image})`}">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="container login-page">
      <div class="col-lg-4 col-md-6 ml-auto mr-auto">
        <card class="card-login card-white">
          <template slot="header">
            <img src="img//card-info.png" alt="" />
            <h1 class="card-title">IoTVen</h1>
          </template>

          <div>
            <base-input
              name="email"
              v-model="user.email"
              placeholder="Email"
              addon-left-icon="tim-icons icon-email-85"
            >
            </base-input>

            <base-input
              name="password"
              v-model="user.password"
              type="password"
              placeholder="Password"
              addon-left-icon="tim-icons icon-lock-circle"
            >
            </base-input>
          </div>

          <div slot="footer">
            <base-button
              native-type="submit"
              type="info"
              class="mb-3"
              size="lg"
              @click="login()"
              block
            >
              Login
            </base-button>
            <div class="pull-left">
              <h6>
                <nuxt-link class="link footer-link" to="/register">
                  Create Account
                </nuxt-link>
              </h6>
            </div>

            <div class="pull-right">
              <h6><a href="#help!!!" class="link footer-link">Need Help?</a></h6>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a
            href="https://misiot.000webhostapp.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            IoT Ven
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://misiot.000webhostapp.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
            align="center"
          >
            About Us
          </a>
        </li>
        <li class="nav-item">
          <a
            href="https://misiot.000webhostapp.com"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            Blog
          </a>
        </li>
      </ul>
      <div class="copyright" align="right">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        
        <a
          href="https://www.creative-tim.com/?ref=pdf-vuejs"
          target="_blank"
          rel="noopener"
          >Creative Tim</a
        >
        for a better web.
      </div>
    </div>
    <a href="https://misiot.000webhostapp.com">   IoTVen</a>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import bgImg from "static/img/bg2.jpg"
export default {
  middleware: 'notAuthenticated',
  name: "login-page",
  layout: "auth",
  data() {
    return {
      year: new Date().getFullYear(),
      image: bgImg,
      user: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    
  },
  methods: {
    login(){
      this.$axios.post("/login", this.user)
      .then ((res) => {
        //SUCCESS - USUARIO CREADO
        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: "Hello! " + res.data.userData.name + " Welcome!"
          })

            console.log(res.data)

            const auth = {
              token: res.data.token,
              userData: res.data.userData
            }
            //token to store - token a la tienda
            this.$store.commit('setAuth', auth)

            //Set auth object in localStorage - Grabamos el token en localStorage
            localStorage.setItem('auth', JSON.stringify(auth))

            $nuxt.$router.push('/dashboard')

          return
        }
      })
      .catch(e => {
        console.log(e.response.data)

        if (e.response.data.error.errors.email.kind == "unique"){
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: "User already exist :("
          })
          return
        }else{
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Error creating user..."
          })
          return
        }
      })
    }
  }
};
</script>

<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>