<template>
   <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 过度动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div 
                            class="item" 
                            v-for="(c1,index) in categoryList" 
                            :key="c1.categoryId"
                        :class="{cur:currentIndex==index}" >
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                        
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>        
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
//引入方式“将全部的lodash全部引入
//最好的引入方式是按需引入
import throttle from 'lodash/throttle';
    export default {
        name:'TypeNav',
        //组件加载完毕可以向服务器发请求
        mounted(){
            //通知Vuex发请求，提供数据，存储与仓库中
            // this.$store.dispatch('categoryList')
            //当挂载完毕后让show属性变为false
            if(this.$route.path != '/home'){
                 this.show = false 
            } 
        },
        data(){
            return {       
              //存储用户鼠标移上哪一个一级分类
              currentIndex:-1,
              show:true
            }
        },
        computed:{
            ...mapState({
                //右侧需要一个函数当使用计算属性的时候右侧函数会执行一次
                categoryList:state=>state.home.categoryList
                
            })
        },
        methods:{
          //鼠标进入
        
          changeIndex:throttle(function(index){
               this.currentIndex = index
          },50),
          goSearch(event){
               //编程式导航+事件委派
               //点击的一定是a标签传递参数
                //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？怎么知道点击的一定是a
                //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
               let element = event.target;
               let {categoryname,category1Id,category2Id,category3Id} = element.dataset;
                //点击只要是a,就是往search模块跳转
               if(categoryname){
                        let location = {name:'search'}
                        let query = {categoryName:categoryname}
                   //一级分类的a
                   if(category1Id){
                       query.category1Id = category1Id
         
                        //二级分类的a
                   }else if(category2Id){
                       query.category2Id = category2Id

                   }else{
                       query.category3Id = category3Id
                   }
                   //判断如果路由跳转的时候带有params参数也要传递过去
                   if(this.$route.params){
                        location.params = this.$route.params
                        location.query = query
                        this.$router.push(location)

                   }
                  
               }
          },
          //鼠标移入的时候让商品进行展示
          enterShow(){
            this.show=true
          },
            //当商品离开时候让商品分类列表进行隐藏
            leaveShow() {
                this.currentIndex = -1
                if(this.$route.path != '/home'){
                    this.currentIndex = -1
                    this.show = false
                }    
            }
      
        } 
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                       
                    }
                .cur{
                        background-color: skyblue;
                    }
                }
            }
            .sort-enter{
                height: 0;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                  transition: all .5s linear;
            }
        }
    }

</style>