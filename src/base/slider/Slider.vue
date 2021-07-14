<template>
 <div class="jd_layout">
      <div class="jd_banner">
        <ul class="jd_bannerimg clearfix">
          <li v-for="(item,index) in list" :key="index">
            <a href="javascript:;">
              <img :src="item.pic" alt="" />
            </a>
          </li>
        </ul>
        <!-- 点标记 -->
        <ul class="jd_bannerIndicator clearfix">
          <li></li>
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
</template>

<script>
import './slider.css';
import {banner} from './slider.js';
// import api from 'api/api'
import {getSliderPics} from 'api/api'

export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
     getSliderPics(data=>{
        this.list=data
        // console.log(this.list)
        setTimeout(()=>banner(),100)
      })
  }
};
</script>

