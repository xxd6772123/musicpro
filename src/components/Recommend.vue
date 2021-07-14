<template>
  <div>
    <Slider></Slider>
    <div class="songListWrap">
    <table class="songList">
      <thead>
        <tr>
          <th>序号</th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>收藏</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song,index) in playList" :key="index" @click="playMusic(song.id)">
          <td>{{index+1}}.</td>
          <td>{{song.name}}</td>
          <td>{{song.artistName}}</td>
          <td  class="collectFontSize" @click.stop="collect({id:song.id,name:song.name,artistName:song.artistName,picUrl:song.picUrl},$event)">
          <span class="red" v-if="song.collect">♥</span>
          <span  v-else>♥</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <Player v-show="isPlay"></Player>
  </div>
</template>

<script>
import Slider from 'base/slider/Slider.vue';
import { mapState } from 'vuex';
import Player from 'base/player/Player.vue';
export default {
  data(){
    return {
      list:[]
    }
  },
  components: {
    Slider,
    Player,
  },
  created() {
    this.$store.dispatch("getRecommendList");
  },
  computed:{
  ...mapState(['playList','isPlay'])
  },
  methods:{
    playMusic(songId){
      this.$store.dispatch("playMusic",songId)
      //含有异步操作，例如向后台提交数据
    },
    collect({id,name,artistName,picUrl},event){
      // console.log(event)
      var item=event.currentTarget
      //currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。
      // item.children[1].style.color='rgb(224, 80, 36)'
      item.classList.add('red')
      this.list=JSON.parse(localStorage.getItem('songList')||'[]')
      var v=this.list.find(v=>v.id==id)
      // console.log({id,name,artistName,picUrl})
      if(!v){
      this.list.unshift({id,name,artistName,picUrl})
      localStorage.setItem('songList',JSON.stringify(this.list))
      }
    }
  }
};
</script>

 <style>
.songListWrap{
  height:60vh;
  overflow: auto;
}

.songList {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.songList tr {
  height: 3rem;
}

.songList > tbody > tr:nth-child(odd) {
  background-color: rgb(222, 250, 233);
}

.songList > tbody > tr:hover {
  background-color: rgb(197, 252, 219);
}

.collectFontSize{
  font-size:1.5rem
}

.red{
  color:rgb(224, 80, 36)
}

</style>
