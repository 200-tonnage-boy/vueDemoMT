<template>
  <div class="page-register">
    <header class="register-header">
      <div class="header-wraper">
        <a href="/" class="nav_index">LOGO</a>
        <div class="header-login">
          <span>已有账号？</span>
          <a href="/login" class="header-login-a">登录</a>
        </div>
      </div>
    </header>
    <div class="register-form">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          v-bind="formItemLayout"
        >
          <span slot="label">
            昵称&nbsp;
            <a-tooltip title="可用于日后登录">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'nickname',
              {
                rules: [{ required: true, message: '请输入昵称！', whitespace: true 
                },{min: 3, max: 6, message: '长度在3-6个字符', trigger: 'blur'
                }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="邮箱"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: '请输入正确的邮箱!',
                }, {
                  required: true, message: '请输入正确的邮箱!',
                }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="验证码"
        >
          <a-row :gutter="8">
            <a-col :span="8">
              <a-input
                v-decorator="[
                  'captcha',
                  {rules: [{ min: 4, max: 4, message: '长度错误', trigger: 'blur',
                  required: true}]}
                ]"
              />
            </a-col>
            <a-col :span="16">
              <a-button @click="senMsg">发送验证码</a-button>
              <span v-if="myMsg.restTime" class="myTips">{{myMsg.restTime}}</span>
            </a-col>
          </a-row>
          
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="密码"
        >
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: '请输入您的密码!',
                }, {
                  validator: validateToNextPassword,
                },{ min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur' 
                },{type: 'number'&&'string', message: '错了'}
                ],
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="确认密码"
        >
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [{
                  required: true, message: '请确认您的密码!',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox
            @change="handleSelectChange"
            
            v-decorator="['agreement',
              {valuePropName: 'checked'},
            ]"
          >
            仔细阅读并同意 <a href="">
              条款
            </a>
          </a-checkbox>
          <span class="myTips" v-if="myMsg.checkTag">请仔细阅读并同意条款！</span>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button
            type="primary"
            html-type="submit"
            class="form-submit"
          >
            提交注册
          </a-button>
          <span class="myTips commit-err" v-if="err">{{err}}</span>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'// 用于对密码加密
export default {
  layout: "blank",
    data () {
    return {
      err:'',
      myMsg: {
        restTime: '',
        checkBox: '',
        count: 0,
        checkTag: false
      },
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    senMsg () {// 发送验证邮件
      let reqName='',reqEmail=''
      if (this.timerid) {// 一分钟内不允许重新发送
        return false
      } 
      this.myMsg.restTime=''
      this.form.validateFields(['email','nickname'], (err,value) => {
        if(!err) {
          reqName = value.nickname
          reqEmail = value.email 
        }
      })
      if(reqName.length&&reqEmail.length) {
        this.$axios.post('/users/verify',{
          username:encodeURIComponent(reqName), email:reqEmail
        })
        .then(({status,data}) => {//结构赋值，获取返回的数据
          if(status===200&&data&&data.code===0) {//成功
            this.myMsg.restTime = data.msg
            this.count = 60
            this.timerid = setInterval(()=>{
              this.myMsg.restTime = `剩余时间：${this.count--}`
              if(this.count===0) {
                clearInterval(this.timerid)
                this.myMsg.restTime=''
                this.timerid=null
              }
            },1000)
          } else {
            this.myMsg.restTime= data.msg
          }
        })
      }
    },
    handleSelectChange (value) {// CheckBox的change事件
      this.myMsg.checkTag = !value.target.checked
    },
     handleSubmit  (e) {// 表单提交
       e.preventDefault();
       this.form.validateFieldsAndScroll((err, values) => {//验证所有区域
         if (!err) {
           if(!values.agreement) {//检测CheckBox是否选中
              this.myMsg.checkTag = true
              return false
           } else {//注册
            console.log(values)
            this.$axios.post('/users/signup',{
              username: window.encodeURIComponent(values.nickname), 
              password: CryptoJS.MD5(values.password).toString(), 
              email: values.email, 
              code: values.captcha
            }).then(({status, data}) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/'
                } else {
                  this.err = data.msg
                }
              } else {
                this.err = `服务器出错，错误码:${status}`
              }
              setTimeout(function () {
                this.err = ''
              }, 1500)
            })
           }
         }
       });
     },
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不同！');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/register/register.scss';
</style>
