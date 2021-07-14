<template>
  <div>
  <div class="songListWrap" style="margin-top:1rem;height:90vh">
    <table class="songList" v-if="list.length">
      <thead>
        <tr>
          <th>序号</th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>取消</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song,index) in list" :key="song.id" @click="playMusic(song.id)">
          <td>{{index+1}}.</td>
          <td>{{song.name}}</td>
          <td>{{song.artistName}}</td>
          <td class="collectFontSize" @click.stop="cancel(index)">♡</td>
        </tr>
      </tbody>
    </table>
    <div v-else>当前没有收藏任何歌曲</div>
  </div>
    <Player v-show="isPlay"></Player>
  </div>
</template>

<script>
import Player from 'base/player/Player.vue';
import {mapState} from 'vuex'
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.list=JSON.parse(localStorage.getItem('songList')||'[]')
    console.log(this.list)
    this.$store.dispatch('collect',this.list)
  },
  methods:{
    playMusic(songId){
      this.$store.dispatch("playMusic",songId)
      this.$store.dispatch("getPicUrl",songId)
    },
    cancel(index){
      this.list.splice(index,1)
      localStorage.setItem('songList',JSON.stringify(this.list))
    }
  },
  components:{
    Player
  },
  computed:{
    ...mapState(['isPlay'])
  }
}
</script>

<style>

</style>