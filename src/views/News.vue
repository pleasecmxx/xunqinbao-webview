<template>
  <div>
    <div class="home">
      <p class="content-text"
         v-if="this.loading"></p>
      <div style="padding: 0 0.35rem;"
           v-else>
        <div class="row">
          <div class="row-left">
            <img :src="this.data.portrait"
                 class="user-logo" />
            <div class="row-msg">
              <p class="name">{{this.data.title}}</p>
              <p class="time">时间：{{this.data.time}}</p>
            </div>
          </div>
          <p style="font-size: 14px; color:#333;margin: 0;margin-bottom: 3px;">阅读：197</p>
        </div>
        <div class="content-container" v-html="data.content">
            <!-- {{data.content}} -->
        </div>
      </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {
  postRequrst,
  GetQueryString,
  getUrlKey,
  GetClear
} from "./../model//model";
import { Icon, Toast, Row, Col } from "vant";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      data: {
        content: ""
      },
      commentList: [],
      loading: true,
      show: false,
      comment: "",
      optionLoading: false,
      page: 0
    };
  },
  created() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "circular",
      duration: 0
    });
    postRequrst("/api/Apiindex/articleDetails", { aid: getUrlKey("news_id") })
      .then(res => {
        console.log(res);
        Toast.clear();
        if (res.code === 1) {
          this.loading = false;
        //   let content = res.list.content;
        //   content = GetClear(content);
        //   res.list.content = content;
          this.data = res.list;
        } else {
          Toast(res.msg);
        }
      })
      .catch(err => {
        Toast.clear();
        Toast("网络出错了，请稍后重试");
      });
  },

  methods: {}
};
</script>
<style scoped>
.home {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
  padding: 0;
  padding-bottom: 52px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.content-text {
  font-size: 15px;
  color: "#000";
  margin: 0px;
  line-height: 22px;
  margin-bottom: 12px;
}

.content-img {
  width: 9.3rem;
  height: auto;
  margin: 12px 0;
}

.user-logo {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.row {
  width: 100%;
  /* height: 52px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  /* margin: 12px 0; */
  padding: 12px;
  box-sizing: border-box;
}

.row-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.row-msg {
  height: 42px;
  margin-left: 6px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* background-color: red */
}

.name {
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  margin: 0;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: none;
  word-break: keep-all;
  height: 21px;
  line-height: 21px;
}

.time {
  font-size: 12px;
  color: #999999;
  margin: 0px;
  margin-top: 3px;
}

.bottom-line {
  width: 100%;
  height: 96px;
  background-color: #eeebeb;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  display: inherit;
}

.pop-head {
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.35rem;
}

.input {
  width: 9.3rem;
  height: auto;
  max-height: calc(100% - 100px);
  max-height: 72%;
  outline: none;
  border: none;
  overflow-y: scroll;
  margin-left: 0.35rem;
  font-size: 15px;
  color: #000000;
  line-height: 22px;
  padding: 0;
  word-wrap: break-word;
}

.close-text {
  width: 88px;
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
  text-align: left;
  /* background-color: red */
}

.my-btn {
  width: 88px;
  height: 32px;
  padding: 0;
  font-size: 15px;
  color: #ffffff;
}

.list-head {
  width: 10rem;
  height: 52px;
  /* background-color: red; */
  display: flex;
  padding: 0 0.35rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-top: -12px;
}

.comment-line {
  width: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 0.35rem;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.comment-logo {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
}

.comment-right {
  width: 8.4rem;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.comment-name {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.comment-content {
  font-size: 14px;
  color: #333;
  margin: 0;
  width: 5.6rem;
}

.comment-time {
  width: 120px;
  font-size: 12px;
  color: #999999;
  margin: 0;
  /* background-color: bisque; */
  /* margin-top: 24px; */
  margin-right: -10px;
}

.box {
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: -4px;
  /* background-color: aqua */
}

.footer {
  padding: 0 32px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  padding-bottom: 16px;
  color: #999999;
}

.content-container {
    width: 10rem;
    box-sizing: border-box;
    padding: 12px;
}
</style>
