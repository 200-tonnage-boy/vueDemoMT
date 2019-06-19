<template>
  <div class="page-login">
    <header class="login-header">
      <div class="header-wraper">
        <a href="/" class="nav_index">LOGO</a>
      </div>
    </header>
    <div class="login-form">
      <span v-if="err">{{err}}</span>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '请输入你的用户名!' },
                        {min: 3, max: 6, message: '长度不正确', trigger: 'blur'}] }
            ]"
            placeholder="用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入你的密码!' },
                        { min: 6, max: 10, message: '密码长度不正确', trigger: 'blur' 
                }] }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            class="login-checkbox"
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              }
            ]"
          >
            记住我
          </a-checkbox>
          <a
            class="login-form-forgot"
            href=""
          >
            忘记密码？
          </a>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button login-btn"
          >
            登录
          </a-button>
           <a href="/register">
            立即注册
          </a>
        </a-form-item>
      </a-form>
      <button @click="test">dian</button>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: "blank",
  data () {
    return {
      err: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    test () {
      this.$axios.get('/geo/getPosition')
      .then((res) => {
        console.log(res)
      })
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.$axios.post('/users/signin',{
            username:window.encodeURIComponent(values.userName),
            password:CryptoJS.MD5(values.password).toString()
          }).then(({status,data})=>{
            if(status===200){
              if(data&&data.code===0){
                location.href='/'
              }else{
                this.err=data.msg
              }
            }else{
              this.err=`服务器出错`
            }
          })
        }
      });
    },
  },
};
</script>
<style>
@import '@/assets/login/login.scss';
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>