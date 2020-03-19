<template>
  <div class="container">
    <h1 class="text-center">Sign In/Sign Up</h1>
    <div id="auth-container" class="row">
      <div class="col-sm-4 offset-sm-4">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="signup-tab"
              data-toggle="tab"
              href="#signup"
              role="tab"
              aria-controls="signup"
              aria-selected="true"
            >
              Sign Up
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="signin-tab"
              data-toggle="tab"
              href="#signin"
              role="tab"
              aria-controls="signin"
              aria-selected="false"
            >
              Sign In
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="signup"
            role="tabpanel"
            aria-labelledby="signin-tab"
          >
            <form @submit.prevent="signUp">
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    v-model="username"
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    v-model="password1"
                    type="password"
                    class="form-control"
                    id="password1"
                    placeholder="Password1"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    v-model="password2"
                    type="password"
                    class="form-control"
                    id="password2"
                    placeholder="Password2"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toc"
                    required
                  />
                  <label class="form-check-label" for="gridCheck">
                    Accept terms and Conditions
                  </label>
                </div>
              </div>
               <input type="hidden" name="csrfmiddlewaretoken" v-model="csrfmiddlewaretoken" /> 
              <button type="submit" class="btn btn-block btn-primary">
                Sign up
              </button>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="signin"
            role="tabpanel"
            aria-labelledby="signin-tab"
          >
            <form @submit.prevent="signIn">
              <div class="form-group">
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password1"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
                <input type="hidden" name="csrfmiddlewaretoken" v-model="csrfmiddlewaretoken" />    
              </div>
              <button type="submit" class="btn btn-block btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = window.jQuery;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default {
  data() {
    return {
      email: "",
      username: "",
      password1: "",
      password2: "",
      csrfmiddlewaretoken: getCookie('csrftoken'),
    };
  },
  methods: {
    signUp() {
      $.post(
        "/api/dj-rest-auth/registration/",
        this.$data,
        data => {
          //this.signIn(data);
          this.$router.push("/chat");
        }
      ).fail(response => {
        alert(response.responseText);
      });
    },
    signIn(data) {
      const credentials = { username: this.username, password: this.password1, csrfmiddlewaretoken: this.csrfmiddlewaretoken };
      window.console.log(data.auth_token);
      $.post("/api/dj-rest-auth/login/", credentials, data => {
        sessionStorage.setItem("authToken", data.auth_token);
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("password", this.password1);
        this.$router.push("/chat");
      }).fail(response => {
        alert(response.responseText);
      });
    }
  }
};
</script>

<style scoped>
#auth-container {
  margin-top: 50px;
}
.tab-content {
  padding-top: 20px;
}
</style>
