<template>
   <div>
       <div v-for="item in list" :key="item.index">
            <h5 class="display-name">{{item.displayName}}</h5>
            <video-player 
                class="video-player vjs-custom-skin" 
                :playsinline="true" 
                :options="item">
            </video-player>
        </div>
   </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import { Icon, Toast, Row, Col } from "vant";
import {
  postRequrst,
  GetQueryString,
  getUrlKey,
  GetClear
} from "./../model//model";
import "video.js/dist/video-js.css";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      list: [],
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "" // url地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    };
  },
  created() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "circular",
      duration: 0
    });
    postRequrst("/api/Apipersonal/course", { page: 0 })
      .then(res => {
        console.log(res);
        Toast.clear();
        if (res.code === 1) {
          let _list = [];
          res.list &&
            res.list.forEach(video => {
              console.log(video);
              let item = JSON.parse(JSON.stringify(this.playerOptions));
              item.displayName = video.name;
              item.sources[0].src = video.content;
              _list.push(item);
            });
          console.log(_list);
          this.list = _list;
        } else {
          Toast(res.msg);
        }
      })
      .catch(err => {
        Toast.clear();
        Toast("网络出错了，请稍后重试");
      });
  }
};
</script>

<style>
.video-player {
  margin-bottom: 12px;
}

.display-name {
  font-size: 24px;
  margin: 10px 0;
  margin-top: 12px;
}
</style>
