<template>
  <div>
    <div class="search_bar">
        <!-- 搜索歌曲 -->
        <input type="text" autocomplete="off" v-model='query' @keyup.enter="searchMusic()" />
        <img src="../assets/zoom.png" style="position:relative;left:-3.5rem" @click="searchMusic()"/>
      </div>
      <div class="songListWrap" style="height:75vh">
      <table class="songList" v-show="clickSearchBtn">
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
import { mapState,mapActions } from 'vuex';
import Player from 'base/player/Player.vue';
export default {
  data(){
    return {
      query:'',
      clickSearchBtn:false
    }
  },
  methods:{
    playMusic(songId){
      this.$store.dispatch("playMusic",songId)
      this.$store.dispatch("getPicUrl",songId)
    },
    searchMusic(){
      this.$store.dispatch('clearPlayList')
      this.clickSearchBtn=true
      if(this.query){
      this.$store.dispatch('searchMusic',this.query)
      }else{
        this.clickSearchBtn=false
      }
    },
     collect({id,name,artistName,picUrl},event){
      // console.log(event)
      var item=event.currentTarget
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
  },
  created(){
    this.$store.dispatch('clearPlayList')
  },
  components: {
    Player
  },
  computed:{
  ...mapState(['playList','isPlay'])
  },
}
</script>

<style>
  .search_bar {
  height: 4rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.search_bar input {
  margin:0 auto;
  width: 80%;
  height: 2rem;
  border-radius: 1rem;
  border: 0;
  /*background: url("../assets/zoom.png") 95% 50% no-repeat*/
  background:rgba(255, 255, 255, 0.45);
  text-indent: 1rem;
  outline: none;
}
</style>