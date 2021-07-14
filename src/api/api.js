import axios from 'axios'

axios.defaults.baseURL = 'https://autumnfish.cn'

// 获取轮播图片
export function getSliderPics(callback){
  axios.get('/banner?type=2').then(res => {
    callback(res.data.banners)
    // console.log(res.data.banners)
  })
  .catch(err => console.log(err))
}

// 获取推荐列表
export function getRecommendList(callback){
  axios.get('/personalized/newsong?limit=20').then(res=>{
    callback(res.data.result)
  })
  .catch(err => console.log(err))
}

// 得到歌曲的url
export function getSong(songId,callback){
  axios.get('/song/url?id='+songId).then(res=>{
    // console.log(res)
    callback(res.data.data[0].url)
  })
  .catch(err => console.log(err))
}

// 搜索歌曲
export function searchMusic(query,callback){
  axios.get('/search?keywords='+query).then(res=>{
    callback(res.data.result.songs)
  })
  .catch(err => console.log(err))
} 

// 搜索歌曲封面
export function getPicUrl(songId,callback){
  axios.get('/song/detail?ids=' + songId).then(res => {
    callback(res.data.songs[0].al.picUrl)
  })
  .catch(err => console.log(err))
}

//获取热门歌单
export function gethotsongs(callback){
  axios.get('/top/playlist/highquality?limit=20').then(res=>{
    console.log(res)
    // callback(res.data.result)
  })
  .catch(err => console.log(err))

}