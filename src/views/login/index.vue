<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="4" placeholder="请输入图形验证码" type="text" v-model="captchaCode">
          <img :src="codeImg" alt="" v-if="codeImg">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <button @click="getSmsCode">获取验证码</button>
        </div>
      </div>

      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getCaptchaCode, getSmsCode } from '@/api/login'

export default {
  name: 'LoginIndex',
  data() {
    return {
      codeImg: '',
      mobile: '',
      captchaCode: '',
      captchaKey: '',
      smsCode: ''
    }
  },
  async created () {
    const { data: { base64, key } } = await getCaptchaCode()
    this.codeImg = base64
    this.captchaKey = key
  },
  methods: {
    validation() {
      // 手机号正则表达式
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$toast.fail({
          message: '请填写正确的手机号',
          forbidClick: true
        })
        return false
      }
      if (!/^[A-Za-z\d]{4}$/.test(this.captchaCode)) {
        this.$toast.fail({
          message: '请填写4位数验证码',
          forbidClick: true
        })
        return false
      }
      return true
    },

    async getSmsCode() {
      if (!this.mobile) {
        return alert('请填写手机号')
      }

      if (this.mobile.length !== 11) {
        return alert('请填写正确的手机号')
      }

      if (!this.captchaCode) {
        return alert('请填写图形验证码')
      }

      if (this.captchaCode.length !== 4) {
        return alert('请输入4位图形验证码')
      }

      const { message } = await getSmsCode({
        captchaKey: this.captchaKey,
        mobile: this.mobile,
        captchaCode: this.captchaCode
      })

      return alert(message)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
