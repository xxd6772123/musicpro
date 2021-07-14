<template>
  <div id="player">
    <div class="playerPic rotate" ref="cover">
      <img :src="songPic||songPic2" alt="" />
    </div>
  <div class="songInfo" >
    <div>{{songName}}</div>
    <div >【{{artistName}}】</div>
    </div>
    <div class="progress-bar-group">
      <div class="progress-bar">
        <!-- 进度条及红色刻度 -->
        <div class="progress" :style="{width:indicatorPosition + '%'}"></div>
        <!-- 已播放部分进度条颜色加深 -->
        <div class="indicater" :style="{left:indicatorPosition + '%'}"></div>
        --> -->
        <!-- 红色刻度移动代码 -->
      </div>
      <div class="time-indicater">
        <!-- 当前时间 秒-->
        <span>{{ currentTime | timeFormat }}</span>
        <!-- 歌曲时长 -->
        <span>{{ duration | timeFormat }}</span>
      </div>
    </div>
    
   <div class="icon-group">
   <div><img src="./icon/prev.png" alt="" @click="prevAudio"></div>
   <div><img src="./icon/pause.png" alt="" v-if="isPlaying" @click="playAudio">
   <img src="./icon/play.png" alt="" v-else @click="playAudio">
   </div>
   <div><img src="./icon/next.png" alt="" @click="nextAudio"></div>
   </div>

    <audio autoplay :src="songUrl" style="margin-top: 5rem" ref="audio"></audio>
    <div class="mask" @click="close"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      currentTime: "",
      duration: "",
      // indicatorPosition:0,
      isPlaying:true
    };
  },
  methods: {
    ...mapActions(["close"]),
    // close(){
    //     this.$store.dispatch('close')
    // }
    playAudio(){
      if(this.isPlaying){
        this.$refs.audio.pause()
        this.$refs.cover.classList.remove('rotate')
        this.isPlaying=false
      }else{
        this.$refs.audio.play()
        this.$refs.cover.classList.add('rotate')
        this.isPlaying=true
      }
    },
    nextAudio(){
      var playList=this.$store.state.playList
      var songId=this.$store.state.songId
      var index=playList.findIndex(v=>v.id==songId)
      if(index<playList.length-1){
        songId=playList[index+1].id
      }else{
        songId=playList[0].id
      }
      this.$store.dispatch("playMusic",songId)
      this.$store.dispatch("getPicUrl",songId)
    },
    prevAudio(){
      var playList=this.$store.state.playList
      var songId=this.$store.state.songId
      var index=playList.findIndex(v=>v.id==songId)
      if(index>0){
        songId=playList[index-1].id
      }else{
        songId=playList[playList.length-1].id
        this.songPic
      }
      this.$store.dispatch("playMusic",songId)
      this.$store.dispatch("getPicUrl",songId)
    }
  },
  computed: {
    ...mapState(['songUrl','songPic','songPic2','songName','artistName']),
    indicatorPosition (){
      return this.currentTime*100/this.duration
    }
  },
  mounted() {
    var audio = this.$refs.audio;
    // console.log(audio)
    setInterval(() => {
      if (this.duration != audio.duration) {
        // 总时长
        this.duration = audio.duration;
      }
      // 当前已播放时长
      this.currentTime = audio.currentTime;
    }, 100);
  },
  filters: {
    timeFormat(time) {
      if (time) {
        var m = Math.floor(time / 60);
        var s = Math.round(time % 60);
        return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
      }
    },
  },
  watch:{
    currentTime(){
      if(this.currentTime>=this.duration){
        this.nextAudio()
      }
    }
  }
};
</script>

<style>
#player {
  background-color: rgb(48, 58, 52);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow:hidden;
}
.playerPic {
  margin-top: 10vh;
  text-align: center;
}

.rotate{
animation: turn 10s linear infinite;
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.playerPic > img {
  border-radius: 50%;
  width: 15rem;
  height: 15rem;
  box-shadow: 0 0 50px rgb(131, 158, 145);
}
.mask {
  height: 100vh;
}

.progress-bar-group {
  height: 30px;
  width: 60%;
  margin: 2.5rem auto 0 auto;
}

.progress-bar-group .progress-bar {
  height: 4px;
  background: #cccccc;
  position: relative;
}

.progress-bar-group .progress-bar .progress {
  height: 100%;
  background: #7f7f7f;
  /*width: 20%;*/
}

.progress-bar-group .progress-bar .indicater {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background: #42b983;
  top: -0.1rem;
  border-radius: 50%;
  /*left: 20%;*/
}

.time-indicater {
  font-size: 0.3rem;
  color: rgb(201, 201, 201);
  display: flex;
  justify-content: space-between;
}

.icon-group{
  display:flex;
  width:60%;
  justify-content:space-between;
  margin:0 auto;
}

.icon-group > div{
  text-align: center;
}

.icon-group img{
  width:3rem;
  height:3rem;
}

.songInfo{
  text-align: center;
  color: rgb(153, 182, 164);
  margin-top:2.5rem
}

.songInfo>div:first-child{
  font-size:1rem;
}

.songInfo>div:last-child{
  font-size:0.8rem;
  margin-top:0.5rem ;
  font-weight: bold;
}
</style>