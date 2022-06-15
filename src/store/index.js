import { defineStore } from "pinia";
import getters from './getters'
import animation from './modules/animation'
import compose from './modules/compose'
import snapshot from './modules/snapshot'
import contextmenu from './modules/contextmenu'
import actions from './modules/actions'

// 1.定义容器
// 参数1： 容器的ID，必须唯一，将来pinia会把所有容器挂载到根容器
// 参数2： 选项对象
export const mainStore = defineStore("main", {
  /**
   * 类似于组件的data， 用来存储全局状态
   * 1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
   * @returns  一个函数，调用得到容器实例
   */
  state: () => {
    return {
      ...compose.state,
      ...snapshot.state,
      ...contextmenu.state,
      ...actions.state,

      editMode: 'edit', // 编辑器模式 edit preview
      canvasStyleData: { // 页面全局数据
        width: 700,
        height: 600,
        scale: 100,
      },
      isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
      componentData: [], // 画布组件数据
      curComponent: null,
      curComponentIndex: null,
      // 点击画布时是否点中组件，主要用于取消选中组件用。
      // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
      isClickComponent: false,
    };
  },
  /**
   * 类似于组件的computed，用来封装计算属性，有缓存的功能
   */
  getters,
  /**
   * 类似于组件的methods，封装业务逻辑（同步，异步都可以），修改state
   */
  actions: {
    ...animation.actions,
    ...compose.actions,
    ...snapshot.actions,
    ...contextmenu.actions,
    ...actions.actions,

    setClickComponentStatus(status) {
      this.isClickComponent = status
    },

    setEditMode(mode) {
      this.editMode = mode
    },

    setInEditorStatus(status) {
      this.isInEdiotr = status
    },

    setCanvasStyle(style) {
      this.canvasStyleData = style
    },

    setCurComponent({ component, index }) {
      this.curComponent = component
      this.curComponentIndex = index
    },

    setShapeStyle({ top, left, width, height, rotate }) {
      const absorbSize = 2 // 吸附大小
      // 限制组件可移动边界
      const clientRectInfo = this.editor.getBoundingClientRect() // 画布信息

      const editorWidth = clientRectInfo.width
      const componentWidth = this.curComponent.style.width
      if (editorWidth <= componentWidth + left + absorbSize) {
        left = editorWidth - componentWidth
      }
      const editorHeight = clientRectInfo.height
      const componentHeight = this.curComponent.style.height
      if (editorHeight <= componentHeight + top + absorbSize) {
        top = editorHeight - componentHeight
      }

      if (top) this.curComponent.style.top = top
      if (left) this.curComponent.style.left = left
      if (top <= absorbSize) this.curComponent.style.top = 0
      if (left <= absorbSize) this.curComponent.style.left = 0
      if (width) this.curComponent.style.width = width
      if (height) this.curComponent.style.height = height
      if (rotate) this.curComponent.style.rotate = rotate
    },

    setShapeSingleStyle({ curComponent }, { key, value }) {
      curComponent.style[key] = value
    },

    setComponentData(componentData = []) {
      // Vue.set( 'componentData', componentData)
    },

    addComponent({ component, index }) {
      if (index !== undefined) {
        this.componentData.splice(index, 0, component)
      } else {
        this.componentData.push(component)
      }
    },

    deleteComponent(index) {
      if (index === undefined) {
        index = this.curComponentIndex
      }

      if (index == this.curComponentIndex) {
        this.curComponentIndex = null
        this.curComponent = null
      }

      if (/\d/.test(index)) {
        this.componentData.splice(index, 1)
      }
    },
  },
});