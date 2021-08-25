<template>
    <div>
      <div class="footer">
        <h1>友情连接</h1>
          <span><a href="https://blog.xiaotao233.top/" target="_blank">咸鱼的窝</a></span>
          <span><a href="https://blog.diyxi.top/" target="_blank">DIY熙的窝</a></span>
          <span><a href="https://blog.farmer233.top/" target="_blank">Farmer的窝</a></span>
          <span><a href="https://blog.ziki2333.top/" target="_blank">Ziki's blog</a></span>
          <span class="last">Copyright © 2021 Created by Ziki</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>
h1 {
  margin: 0;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size:20px
}
span {
  margin-right:20px
}
a {
  text-decoration:none;
  font-size: 15px;
  color: rgb(144,147,153);
}
.last {
  display: block;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size:15px
}
</style>
