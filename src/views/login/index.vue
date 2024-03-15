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
          <img :src="codeImg" alt="" v-if="codeImg" @click="getCaptchaCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="smsCode" maxlength="6">
          <button @click="buttonHandler" ref="btn">{{ buttonTips }}</button>
        </div>
      </div>

      <div class="login-btn" @click="sendLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { fetchCaptchaCode, fetchSmsCode, login } from '@/api/login'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginIndex',
  data() {
    return {
      codeImg: '',
      mobile: '',
      captchaCode: '',
      captchaKey: '',
      smsCode: '',
      countDown: 60,
      intervalId: null,
      buttonTips: '获取验证码'
    }
  },
  async created () {
    await this.getCaptchaCode()
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

    async buttonHandler() {
      // if (!this.validation()) {
      //   this.$refs.btn.disabled = true
      //   if (!this.intervalId) {
      //     this.getSmsCode()
      //     this.triggerCountDown()
      //   }
      //   // await this.getCaptchaCode()
      // }
      if (!this.validation()) {
        return
      }
      // 没有intervalId并且请求获取验证码成功时才进行倒计时
      // 异步函数如果不使用await关键字的话会被当做是一个方法，直接当true判断
      if (!this.intervalId && await this.getSmsCode()) {
        this.$refs.btn.disabled = true
        this.triggerCountDown()
      }
    },

    async getSmsCode() {
      const { status, message } = await fetchSmsCode({
        captchaKey: this.captchaKey,
        mobile: this.mobile,
        captchaCode: this.captchaCode
      })

      if (status === 200) {
        this.$toast.success({
          message: '发送成功',
          forbidClick: true
        })
        return true
      } else {
        this.$toast.fail({
          message,
          forbidClick: true
        })
        return false
      }
    },

    async getCaptchaCode() {
      const { data: { base64, key } } = await fetchCaptchaCode()
      this.codeImg = base64
      this.captchaKey = key
    },

    triggerCountDown() {
      this.buttonTips = `${this.countDown}秒后重新获取`

      this.intervalId = setInterval(() => {
        this.countDown--
        this.buttonTips = `${this.countDown}秒后重新获取`

        if (this.countDown === 0) {
          this.countDown = 60
          clearInterval(this.intervalId)
          this.intervalId = null
          this.buttonTips = '获取验证码'
          this.$refs.btn.disabled = false
        }
      }, 1000)
    },

    async sendLogin() {
      if (this.validation() && /^[\d]{6}$/.test(this.smsCode)) {
        const { status, data } = await login({
          isParty: false,
          mobile: this.mobile,
          partyData: {},
          smsCode: this.smsCode
        })

        if (status === 200) {
          this.setUserInfo(data)
          this.$toast.success({
            message: '登录成功',
            forbidClick: true
          })
          // 实现toast弹窗关闭后再跳转
          setTimeout(() => {
            // this.$toast.clear(true)
            this.$router.push('/home')
          }, 1000)
        } else {
          this.$toast.fail({
            message: '验证码错误，请重试',
            forbidClick: true
          })
        }
      }
    },
    ...mapMutations('user', ['setUserInfo'])
  },
  destroyed () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
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
    button:disabled {
      color: gray; /* 文字颜色 */
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
