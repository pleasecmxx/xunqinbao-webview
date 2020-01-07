<template>
  <div class="page">
    <div class="bg-content">
      <img src="./../assets/login_bg.png"
           class="login-bg" />
      <img src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2224702878,3024512157&fm=85&app=63&f=JPEG?w=121&h=75&s=9000A2F90C5696CE1410383A03001050"
           class="user-logo" />
    </div>
    <div class="my-row">
      <p class="user-name">用户</p>
      <van-notice-bar color="#1989fa"
                      class="my-line"
                      background="#ecebeb"
                      speed="80"
                      left-icon="info-o">
        通过定位找到男朋友的位置&nbsp;&nbsp;&nbsp;&nbsp;通过定位找到老婆的位置&nbsp;&nbsp;&nbsp;&nbsp;通过定位找到孩子的位置
      </van-notice-bar>
    </div>
    <div class="input-box">
      <img src="./../assets/account-icon.png"
           class="input-icon" />
      <input placeholder="请输入手机号"
             type="number"
             class="row-input" />
    </div>
    <div class="code-row">
      <div class="code-row-left">
        <img class="input-icon"
             src="./../assets/pass-icon.png" />
        <input placeholder="验证码"
               class="code-input" />
      </div>
      <div class="code-btn">获取验证码</div>
    </div>
    <div style="margin-top: 54px;" class='row'>
      <img src="./../assets/timer-icon.png"
           class="timer-icon" />
      <van-count-down 
                      :time="time"
                      class="test"
                      format="HH:mm:ss" />
    </div>
    <p class='notice'>后链接将会失效，赶快去体验吧</p>
    <div class="jump-btn">快去APP快速定位</div>
    <p class="small-text">一键定位，快速找人</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      password: '',
      loading: false,
      time: 20000000
    }
  }
}
</script>

<style>
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  overflow-y: scroll;
}
div {
  box-sizing: border-box
}

.bg-content {
  position: relative;
}

.login-bg {
  width: 10rem;
  height: auto;
  /* background-color: #000 */
}

.user-logo {
  position: absolute;
  bottom: -0.4rem;
  left: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.my-row {
  width: 10rem;
  height: 60px;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.4rem;
  padding-left: 1.65rem;
  margin-bottom: 24px;
}

.my-line {
  width: 5rem;
  height: 22px;
  border-radius: 6px;
  margin-left: 12px;
  user-select: none;
}

.row-input {
  width: 5rem;
  height: 40px;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 18px;
}

.row-input::placeholder {
  color: #7c7a7a;
}

.input-box {
  width: 7.6rem;
  height: 52px;
  background-color: #ecebeb;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 6px;
  margin: 0 auto;
}

.input-icon {
  width: 28px;
  height: 28px;
  margin: auto 12px;
}

.code-row {
  width: 7.6rem;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px auto;
}

.code-row-left {
  width: 4.2rem;
  height: 52px;
  background-color: #ecebeb;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.code-btn {
  width: 3rem;
  height: 42px;
  background-color: rgb(0, 90, 224);
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 42px;
  border-radius: 24px;
  transition: all ease 0.35s;
}

.code-btn:active {
  background-color: rgb(7, 82, 194);
}

.code-input {
  width: 2.8rem;
  height: 52px;
  background-color: transparent;
  font-size: 18px;
  outline: none;
  border: none;
}

.code-input::placeholder {
  color: #7c7a7a;
}

.user-name {
  color: #000;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 5px;
}

.row {
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-icon {
  width: 18px;
  height: 18px;
  margin-bottom: 4px;
  margin-right: 4px;
}

.test {
  font-size: 18px;
  color: rgb(7, 82, 194);
}

.notice {
  font-size: 14px;
  color: #7c7a7a;
  text-align: center;
  margin-top: -2px;
  margin-bottom: 24px;
}

.jump-btn {
  width: 6rem;
  height: 52px;
  background-color: rgb(7, 82, 194);
  border-radius: 6px;
  line-height: 52px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin: 12px auto
}

.small-text {
  font-size: 12px;
  color:#7c7a7a;
  text-align: center;
  margin-top: 24px;
}
</style>
