import {createStore} from "vuex";
// vuex持久化插件
import createPersistedState from "vuex-persistedstate"

export const store = createStore({
    plugins: [createPersistedState()],

    state: {
        theme: 'DayTheme',
        finish: 0,
        lists: [{
            name: '点击待办事件即可修改，回车或更改框失去焦点后即可修改成功。',
            checked: false,
            isEdit: false
        }, {
            name: '点击待办事件,即可修改待办',
            checked: false,
            isEdit: false
        }, {
            name: '点击小太阳切换主题颜色',
            checked: false,
            isEdit: false
        }],
    },
    getters: {},
    mutations: {
        // 增加待办
        add(state, val) {
            //unshift方法为向数组第一位添加数据
            //push方法为向数组最后一位添加数据
            state.lists.push({
                name: val,
                checked: false,
                isEdit: false
            })
        },
        // 待办状态修改
        isChecked(state, index) {
            state.lists[index].checked = !state.lists[index].checked
            state.finish = state.lists.filter((item) => item.checked === true).length
        },
        // 删除待办
        Close(state, index) {
            // splice，要开始的元素，删除的个数，添加的元素，
            state.lists.splice(index, 1)
            state.finish = state.lists.filter((item) => item.checked === true).length
        },
        // 每删除和修改待办状态就要重新计算finish的值


        ThemeSwitch(state, theme) {
            state.theme = theme
        },
        
        // 修改待办
        editInput(state, val) {
            state.lists[val[0]] = {
                name: val[1],
                checked: false,
                isEdit: false
            }
        }
        
    },

    actions: {},
    modules: {}

});
