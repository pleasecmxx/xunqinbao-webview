<template>
  <div class="page">
    <div class="bg-content">
      <img src="./../assets/login_bg.png"
           class="login-bg" />
      <img :src="headImg"
           class="user-logo" />
    </div>
    <div class="my-row">
      <p class="user-name">{{name}}</p>
      <van-notice-bar 
        color="#1989fa"
        class="my-line"
        background="#ecebeb"
        :speed="80"
        left-icon="info-o">
        通过定位找到男朋友的位置&nbsp;&nbsp;&nbsp;&nbsp;通过定位找到老婆的位置&nbsp;&nbsp;&nbsp;&nbsp;通过定位找到孩子的位置
      </van-notice-bar>
    </div>
    <div class="input-box">
      <img src="./../assets/account-icon.png"
           class="input-icon" />
      <input 
        placeholder="请输入手机号"
        type="number"
        class="row-input" 
        v-model="phone"
      />
    </div>
    <div class="code-row">
      <div class="code-row-left">
        <img class="input-icon"
             src="./../assets/pass-icon.png" />
        <input 
          placeholder="验证码"
          class="code-input" 
          v-model="code"
        />
      </div>
      <div @click="sendCode" class="code-btn" v-if="!optionLoading">获取验证码</div>
      <div v-else>
        <div style="opacity: 0.72" class="code-btn" v-if="showTime">
          {{codeTime}}秒后重试
        </div>
        <div style="opacity: 0.72" class="code-btn" v-else>请稍等</div>
      </div>
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
    <div @click="goTodownload" class="jump-btn">快去APP快速定位</div>
    <p class="small-text">一键定位，快速找人</p>
  </div>
</template>

<script>
import { postRequrst, GetQueryString, getUrlKey } from "./../model//model";
import { Icon, Toast, Row, Col } from "vant";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",
      loading: false,
      time: 20000000,
      codeTime: 60,
      headImg: null,
      name: "",
      optionLoading: false,
      showTime: false,
      delayhandle: null
    };
  },
  created() {
    let _headImg = getUrlKey("head_img");
    this.name = getUrlKey("name");
    console.log(_headImg);
    if (_headImg) {
      this.headImg = _headImg;
    } else {
    }
  },
  beforeDestroy() {
    this.delayhandle && clearTimeout(this.delayhandle);
  },
  methods: {
    goTodownload() {
      if (this.phone === "" || this.phone.length !== 11) {
        return Toast("请输入正确的手机号");
      }
      if (this.code === "") {
        return Toast("请输入验证码");
      }
      Toast.loading({
        message: "请稍等...",
        forbidClick: true,
        loadingType: "circular",
        duration: 0
      });
      let params = {
        mobile: this.phone,
        code: getUrlKey("code"),   
        yzm: this.code,
        register_source: 1
      };
      console.log("参数", params);
      postRequrst("/api/Apilogin/registerWeb", params)
        .then(res => {
          Toast.clear();
          console.log(res);
          if (res.code === 1) {
            window.location.href = "https://dingwei.appdingwei.com/download.html";
          } else if (res.code === 104) {
            Toast("您已注册，快去下载App吧！");
            setTimeout(() => {
              window.location.href = "https://dingwei.appdingwei.com/download.html";
            }, 200);
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          Toast.clear();
          Toast(err + "");
        });
    },

    sendCode() {
      if (this.phone === "" || this.phone.length !== 11) {
        Toast("请输入正确的手机号");
      } else {
        let params = {
          mobile: this.phone
        };
        this.optionLoading = true;
        postRequrst("/api/Apilogin/sendCode", params)
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              Toast("验证码已发送，请注意查收");
              this.showTime = true;
              this.counterTimer();
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
            Toast(err + "");
          });
      }
    },

    counterTimer() {
      this.delayhandle = setTimeout(() => {
        if (this.codeTime === 0) {
          this.optionLoading = false;
          this.showTime = false;
          this.codeTime = 60;
          return false;
        } else {
          this.codeTime = this.codeTime - 1;
          this.counterTimer();
        }
      }, 1000);
    }
  }
};
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
  box-sizing: border-box;
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
  width: 4.2rem;
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
  background-color: rgb(17, 63, 133);
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
  width: 100px;
  overflow: hidden;
  /* background-color: red; */
  font-size: 18px;
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
  margin: 12px auto;
}

.small-text {
  font-size: 12px;
  color: #7c7a7a;
  text-align: center;
  margin-top: 24px;
}
</style>
