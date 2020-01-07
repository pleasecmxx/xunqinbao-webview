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
              <p class="name">{{this.data.name}}</p>
              <p class="time">时间：{{this.data.time}}</p>
            </div>
          </div>
          <p style="font-size: 14px; color:#333;margin: 0;margin-bottom: 3px;">阅读：197</p>
        </div>
        <div v-for="item in this.data.content"
             :key="item.index">
          <img :src="item.val"
               class="content-img"
               v-if="item.type === 1" />
          <p class="content-text"
             v-else>{{item.val}}</p>
        </div>
      </div>
      <div @click="showpop"
           class="bottom-line"
           v-if="this.commentList.length === 0">留下热心线索</div>
      <div v-else>
        <div class="list-head">
          <p class="close-text"
             style="font-size: 14px;">好心留言</p>
          <P @click="showpop"
             class="close-text"
             style="text-align: right; font-size: 14px;">写留言</P>
        </div>
        <div class="comment-line"
             v-for="item in this.commentList"
             :key="item.index">
          <img :src="item.logo"
               class="comment-logo" />
          <div class="comment-right">
            <div class="box">
              <p class="comment-name">{{item.name}}</p>
              <P class="comment-content">{{item.content}}</P>
            </div>
            <p class="comment-time">{{item.time}}</p>
          </div>
        </div>
        <div class="footer">————— 到底了 —————</div>
      </div>
    </div>
    <van-popup v-model="show"
               position="bottom"
               round
               :style="{ height: '40%' }">
      <div class="pop-head">
        <p @click="closePop"
           class="close-text">关闭</p>
        <p style="font-size: 16px;text-align:center; width: 100%;margin: 10px 0;">写留言</p>
        <button @click="sendComment"
                class="my-btn"
                v-if="!this.optionLoading">提交</button>
        <button class="my-btn"
                style="opacity: 0.72"
                v-else>提交中</button>
      </div>
      <textarea class="input"
                placeholder="请输入留言"
                v-model="comment"
                rows="100" />
      </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { postRequrst, GetQueryString } from './../model//model'
import { Icon, Toast, Row, Col } from 'vant';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      data: {},
      commentList: [],
      loading: true,
      show: false,
      comment: '',
      optionLoading: false,
      page: 0,
    }
  },
  created () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'circular',
      duration: 0
    });
    postRequrst('/api/Apiindex/releaseLocationUpperDetails', { luid: GetQueryString('luid') })
      .then(res => {
        console.log(res);
        if (res.code === 1) {
          this.loading = false;
          this.data = res.list;
          this.getComment()
        } else {
          Toast(res.msg)
        }
      })
      .catch(err => {
        Toast("网络出错了，请稍后重试");
      })
  },

  methods: {
    closePop () {
      this.show = false
    },

    getComment () {
      let params = {
        page: this.page,
        luid: GetQueryString('luid')
      };
      postRequrst('/api/Apiindex/locationUpperComment', params)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.commentList = res.list;
            Toast.clear()
          } else {
            Toast(res.msg)
          }
        })
        .catch(err => {
          Toast("网络出错了，请稍后重试")
        })
    },

    showpop () {
      this.show = true
    },

    sendComment () {
      if (this.comment === '') {
        return Toast("请先输入您的评论")
      }
      this.optionLoading = true;
      let params = {
        luid: GetQueryString('luid'),
        content: this.comment,
      };
      postRequrst('/api/Apiindex/releaseLocationUpperComment', params)
        .then(res => {
          console.log(res)
          this.optionLoading = false
          this.show = false;
          if (res.code === 1) {
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
              loadingType: 'circular',
              duration: 0
            });
            this.getComment();
            Toast("评论成功");
            this.comment = ''
          } else {
            Toast(res.msg)
          }
        })
        .catch(err => {
          this.optionLoading = false
          this.show = false;
          Toast("网络出错了，请稍后重试")
        })
    }
  }
}
</script>
<style scoped>
.home {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.content-text {
  font-size: 14px;
  color: '#000';
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
  margin: 12px 0;
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
</style>
