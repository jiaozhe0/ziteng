<template>
<div class='chat-list'>
    <div v-for="item in chatList">
    <!-- other -->
    <div class="chat-item clearfix" v-if="item.to === user.userId">
        <div class="time text-center center-block" v-if="item.time">{{_setTime(item.time)}}</div>
        <!-- 头像 -->
        <div class="info">
            <div class="avatar-img" @click="_goHomePage(item.ext.userId)">
                <img :src="item.ext.userPic" alt="" class="img-responsive">
            </div>
            <!-- // 文本和表情消息 -->
            <div class="text other" v-if="item.data">
                <!-- 标签和文本消息 -->
                <span v-if="item.data instanceof Array">
                    <span v-for="items in item.data">
                        <span class='info-text' v-if="items.type=='txt'">{{items.data}}
                        </span>
                        <img :src="items.data" class='emoji' alt=""  v-else >
                    </span>
                </span>
                <!-- 纯文本 -->
                <span v-else>{{item.data}}</span>
            </div>
            <!-- 图片消息 -->
            <div class="text other" v-else>
                <img :src="item.url" alt="" class="img-responsive" @click="_toView([...item.url], 0)">
            </div>
        </div>
    </div>

    <!-- me -->
    <div class="chat-item clearfix" v-else>
        <div class="time text-center center-block">{{_setTime(item.time)}}</div>
        <div class="info me-info">
            <!-- <div class="text me"> -->
                <!-- // 文本和表情消息 -->
                <div class="text me" v-if="item.data">
                    <!-- 标签和文本消息 -->
                    <span v-if="item.data instanceof Array">
                        <span v-for="items in item.data">
                            <span class='info-text' v-if="items.type=='txt'">{{items.data}}
                            </span>
                            <img :src="items.data" class='emoji' alt=""  v-else >
                        </span>
                    </span>
                    <!-- 纯文本 -->
                    <span v-else>{{item.data}}</span>
                </div>
                <!-- 图片消息 -->
                <div class="text me" v-else>
                    <img v-if="item.body.url" :src="item.body.url" alt="" class="img-responsive" @click="_toView([...item.body.url], 0)">
                    
                </div>
            <!-- </div> -->
            <div class="avatar-img me" @click="_goHomePage(item.ext.userId)">
             <img :src="item.ext.userPic" alt="" class="img-responsive" v-if="item.ext.userPic">
             <img src="./n_meiyou.png" alt="" v-else class="img-responsive">
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
// import WebIM from '../../im/webIM'
export default {
	props: {
        chatList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
	components: {
		MtCell: Cell
	},
    methods: {
        ...mapMutations({
            setPictures: 'PICTURES'
        }),
        _setTime(time) {
            return time
        },
        _goHomePage(userId) {
            this.$router.push({path: '/homepage', query: {userId: userId, share: this.$route.query.share && this.$route.query.share}})
        },
        _toView(pictures, i) {
            let picList = pictures.map(item => {
                return {picName: item}
            })
             let picture = {
              index: i,
              list: picList
             }
             console.log(picture)
             this.setPictures(picture)
             this.$router.push('/view')
            }
    }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .income-list{
 	min-height: 101%;
    padding: 0 10px;
 }
 .emoji{
     vertical-align: middle;
     display:inline-block;
     .square(20px)
  }
 .chat-list{
     padding: 10px;
    .chat-item{
        margin-bottom: 8px;
        text-align: center;
        .time{
            display: inline-block;
            width:auto;
            padding:4px;
            border-radius: 4px;
            background-color: #dedbdb;;
            /*line-height: 20px;*/
            font-size: 0.5rem;
            margin-bottom: 4px;
        }
        .avatar-img{
            .square(38px);
            .img-responsive{
                height: 100%;
            }
            .avatar{
                background: blue
            }
        }
    }
    .info{
        .flexbox();
        .align-items(center);
         vertical-align: middle;
        &.me-info{
            .justify-content(flex-end); 
            .avatar-img{
                margin-right: 0
            }
        }
        .text{
            position: relative;
            max-width: 70%;
            font-size: 0.6rem;
            &:before{
              position:absolute;
              content: '';
              width: 0;
              height: 0;
              top:50%;
              margin-top: -5px;
            }
            &.other,&.me {
                padding:8px 10px;
                border-radius: 3px;
            }
            &.other{
                margin-left: 8px;
                background-color: #fff;
             &:before{
                border-top: 6px solid transparent;
                border-right: 10px solid #fff;
                border-bottom: 6px solid transparent;
                left:-8px;
             }
            }
            &.me{
                margin-right: 18px;
                background-color: #B4E4FC;
                &:before{
                   border-top: 6px solid transparent;
                   border-left: 10px solid #B4E4FC;
                   border-bottom: 6px solid transparent;
                   right:-8px;
                }
             }
        }
    }
 }
.img-responsive{
    width: 80px;
    height: auto;
}

</style>