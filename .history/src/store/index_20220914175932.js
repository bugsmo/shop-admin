import { createStore } from 'vuex'
import { getinfo,login } from '~/api/manager.js'
import { setToken,removeToken } from '~/composables/auth.js'

// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        //用户信息
        user: {},

        //侧边宽度
        asideWidth: "250px",

        //菜单
        menus:[],

        //角色
        ruleNames:[]
      }
    },
    mutations: {
        // 记录用户信息
      SET_USERINFO(state,user){
        state.user = user
      },

      //展开或收起侧边栏
      HandleAsideWidth(state){
        state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
      },

      // 记录菜单信息
      SET_MENUS(state,menus){
        state.menus = menus
      },

      //记录角色信息
      SET_RULENAMES(state,ruleNames){
        state.ruleNames = ruleNames
      }
    },
    actions:{
      // 登录
      login({ commit }, {username,password}){
        return new Promise((resolve,reject)=>{
          login(username,password).then(res=>{
            setToken(res.token)
            resolve(res)
          }).catch(err=>reject(err))
        })
      },

      // 获取当前登录用户信息
      getinfo({ commit}){
        return new Promise((resolve,reject)=>{
          getinfo().then(res=>{
            commit("SET_USERINFO",res)
            resolve(res)
          }).catch(err=>reject(err))
        })
      },

      // 退出登录
      logout({commit}){
        // 移除cookie的token
        removeToken()
        // 清除当前用户的状态 vuex
        commit("SET_USERINFO",{})
      }

    }
  })

  export default store