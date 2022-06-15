import { $ } from '@/utils/utils'

export default {
    state: {
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
        editor: null, // 编辑器元素
        isDragInEdiotr: false // 是否在编辑器中拖动，用于显示提示边框
    },
    actions: {
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
            const editorHeight = clientRectInfo.height
            const componentWidth = this.curComponent.style.width
            const componentHeight = this.curComponent.style.height

            if (editorWidth <= componentWidth + left + absorbSize) {
                left = editorWidth - componentWidth
            }
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
            let { left, top } = component.style
            if (left < 0) left = 0
            if (top < 0) top = 0
            const clientRectInfo = this.editor.getBoundingClientRect() // 画布信息
            const editorWidth = clientRectInfo.width
            const editorHeight = clientRectInfo.height
            const componentWidth = component.style.width
            const componentHeight = component.style.height
            if (editorWidth <= componentWidth + left) {
                left = editorWidth - componentWidth
            }
            if (editorHeight <= componentHeight + top) {
                top = editorHeight - componentHeight
            }
            component.style.left = left
            component.style.top = top

            if (index !== undefined) {
                this.componentData.splice(index, 0, component)
            } else {
                this.componentData.push(component)
            }
        },

        deleteComponent(index) {
            this.hideContextMenu()
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

        getEditor() {
            this.editor = $('#editor')
        },

        setIsDragInEdiotr(status) {
            this.isDragInEdiotr = status
        }
    },
}