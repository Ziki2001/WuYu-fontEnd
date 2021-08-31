<template>
    <div >
      <div class='container' v-loading.fullscreen.lock="fullscreenLoading">
          <div class="guide-container" style="margin-bottom: 100px; width: 90%" >
            <div style="width:600px">
                <svg width="100%" height="300" class="text" style="margin-bottom: 40px">
                  <!-- 定义渐变颜色 -->
                  <defs>
                    <linearGradient id="geekColor" gradientTransform="rotate(90)">
                      <stop offset="0%" stop-color="rgb(163, 197, 240)">
                        <!-- 渐变动画 -->
                        <animate
                          attributeName="stop-color"
                          values="rgb(163,197,240);RGB(29,54,118);rgb(163,197,240)"
                          dur="4s"
                          begin="3s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop offset="100%" stop-color="rgb(163, 197, 240)">
                        <animate
                          attributeName="stop-color"
                          values="rgb(163, 197, 240);RGB(29,54,118);rgb(163, 197, 240)"
                          dur="4s"
                          begin="3s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                    </linearGradient>
                  </defs>
                  <text class="logo_text" x="140" y="180">
                    Welcome
                  </text>
                  <text class="logo_text" x="140" y="270">
                    to 素拓仓库
                  </text>
                </svg>
                <transition name="tip">
                  <p class="tip_1" v-show="tip">Tips: 管理员在注册登录后即可在数据管理窗口对数据进行管理</p>
                </transition>
                <transition name="tip">
                   <p class="tip_2" v-show="tip">普通成员浏览数据可一键复制数据内容，方便数据收集</p>
                </transition>
            </div>
            <div>
              <img :src='bannerImg' alt="" style="width:650px; height: 550px; margin-right: 50px">
            </div>
          </div>
          <div v-for="value in tableData" :key="value.content" class="card">
            <el-image :src="`/api/educationItem/image/2021/?type=${value.type}&content=${value.content}&date=${value.date}.jpeg`" class="card-img">
            </el-image>
            <p >材料类型：{{value.type}}<i class="el-icon-document-copy" @click="copy(value.type)"></i></p>
            <p >材料内容：{{value.content}}<i class="el-icon-document-copy" @click="copy(value.content)"></i></p>
            <p >日期：{{value.date}}<i class="el-icon-document-copy" @click="copy(value.date)"></i></p>
          </div>
          <el-backtop></el-backtop>
      </div>
    </div>
</template>

<script>
import bannerImg from '../../../assets/banner.png'
export default {
  name: 'Index',
  data () {
    return {
      tableData: [],
      fullscreenLoading: true,
      bannerImg: bannerImg,
      tip: false
    }
  },
  created () {
    this.gettableData()
    setTimeout(() => {
      this.fullscreenLoading = false
    }, 700)
    setTimeout(() => {
      this.tip = true
    }, 7000)
  },
  methods: {
    async gettableData () {
      const { data: res } = await this.$http({
        method: 'GET',
        url: '/api/getAllItems'
      })
      console.log(res)
      this.tableData = res.reverse()
    },
    copy (value) {
      const input = document.createElement('input')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
      this.$message.success('已经复制好啦')
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
/* 渐变标题 */
.logo_text {
  font-family: "PingFang SC";
  font-size: 74px;
  fill: none;
  stroke: url("#geekColor");
  stroke-width: 1;
  stroke-dasharray: 10 800;
  stroke-dashoffset: 10;
  animation: 5s linear 2s drawing forwards;
}

/* 绘画动画 */
@keyframes drawing {
  to {
    stroke-dasharray: 800;
    stroke-dashoffset: 0;
  }
}
.guide-container {
  width: 95%;
  height: 500px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.tip-enter-active, .tip-leave-active {
    transition: opacity 2s
}
.tip-enter, .tip-leave-to {
    opacity: 0
}
.tip_1 {
  text-align: left;
  padding-left: 150px;
  font-size: 14px;
  margin: 0;
  color: rgb(122, 122, 122);
}
.tip_2 {
  text-align: left;
  padding-left: 185px;
  font-size: 14px;
  margin: 0;
  color: rgb(122, 122, 122);
}
.card {
  width: 30%;
  height: 370px;
  background-color: white;
  border-radius: 10px;
  margin-left: 2.5%;
  margin-bottom: 40px;
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  transition-duration: 0.3s;
  transition-property: transform;
}
.card:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  transition-duration: 0.3s;
  transition-property: transform, opacity;
}
.card:hover, .card:focus, .card:active {
  transform: translateY(-5px);
}
.card:hover:before, .card:focus:before, .card:active:before {
  opacity: 1;
  transform: translateY(5px);
}
.card-img {
  margin-top: 10px;
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.card p {
  margin-top: 5px;
  margin-bottom: 2px;
  font-size:14px;
  color: rgb(144,147,153);
  font-weight: bold;
}
.el-icon-document-copy:hover {
  cursor: pointer;
}
</style>
