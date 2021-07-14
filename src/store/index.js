import Vue from 'vue'
import Vuex from 'vuex'
import {
  getRecommendList,
  getSong,
  searchMusic,
  getPicUrl,
  gethotsongs
} from 'api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // recommendList: [],
    isPlay: false,
    songUrl: '',
    songPic: '',
    songPic2:'',
    songName: '',
    artistName: '',
    playList: [],
    songId: ''
  },
  mutations: {
    setRecommendList(state, data) {
      // state.recommendList = data
      let list = JSON.parse(localStorage.getItem('songList') || '[]')
      state.playList=[]
      for (let i = 0; i < data.length; i++) {
        var collect = false
        var v = list.find(v => v.id == data[i].id)
        if (v) {
          collect = true
        } else {
          collect = false
        }
        state.playList.push({
          id: data[i].id,
          name: data[i].name,
          artistName: data[i].song.artists[0].name,
          picUrl: data[i].picUrl,
          collect
        })
      }
      console.log(state.playList)
    },
    playMusic(state, {
      songId,
      songUrl
    }) {
      state.isPlay = true
      state.songUrl = songUrl
      var v = state.playList.find(v => v.id == songId)
      state.songPic = v.picUrl
      state.songId = songId
      state.songName = v.name
      state.artistName = v.artistName
      // console.log(state.songUrl,state.songPic)
    },
    close(state) {
      state.isPlay = false
      state.songUrl = ''
    },
    collect(state, list) {
      state.playList = list
    },
    clearPlayList(state){
      state.playList =[]
    },
    searchMusic(state,data){
      console.log(data)
      let list = JSON.parse(localStorage.getItem('songList') || '[]')
      for (let i = 0; i < data.length; i++) {
        var collect = false
        var v = list.find(v => v.id == data[i].id)
        if (v) {
          collect = true
        } else {
          collect = false
        }
        state.playList.push({
          id: data[i].id,
          name: data[i].name,
          artistName: data[i].artists[0].name,
          picUrl: '',
          collect
        })
      }
    },
    getPicUrl(state,picUrl){
      state.songPic2=picUrl
    }
  },
  actions: {
    getRecommendList(context) {
      // 从端口获得推荐的歌手
      getRecommendList(data => {
        context.commit('setRecommendList', data)
        // console.log(data)
      })
    },
    gethotsongs(context){
      //从端口获得热门歌单
      gethotsongs(data =>{
        context.commit("gethotsongs",data)
        console.log(data)
      })
    },
    playMusic(context, songId) {
      getSong(songId, songUrl => {
        context.commit('playMusic', {
          songId,
          songUrl
        })
      })
    },
    close(context) {
      context.commit('close')
    },
    collect(context, list) {
      context.commit('collect', list)
    },
    clearPlayList(context){
      context.commit('clearPlayList')
    },
    searchMusic(context,query){
      searchMusic(query,songs=>{
        context.commit('searchMusic',songs)
      })
    },
    getPicUrl(context,songId){
      getPicUrl(songId,picUrl=>{
        context.commit('getPicUrl',picUrl)
      })
    }
  },
  modules: {}
})