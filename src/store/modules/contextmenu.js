import { generateID, deepCopy } from '@/utils/utils'

export default {
    state: {
        // 鼠标右键菜单数据
        menuShow: false,
        menuTop: 0,
        menuLeft: 0,

        copyData: null, // 复制剪切粘贴数据
        isCut: false,
    },
    actions: {
        showContextMenu({ top, left }) {
            this.menuShow = true
            this.menuTop = top
            this.menuLeft = left
        },

        hideContextMenu() {
            this.menuShow = false
        },

        // 复制
        copy() {
            this.hideContextMenu()
            if (!this.curComponent) return
            // 如果有剪切的数据，需要先还原
            restorePreCutData(this)
            doCopy(this)

            this.isCut = false
        },

        cut() {
            this.hideContextMenu()
            if (!this.curComponent) return

            // 如果重复剪切，需要恢复上一次剪切的数据
            restorePreCutData(this)
            doCopy(this)

            this.deleteComponent()
            this.isCut = true
        },

        paste(isMouse) {
            this.hideContextMenu()
            if (!this.copyData) return

            const data = this.copyData.data

            if (isMouse) {
                data.style.top = this.menuTop
                data.style.left = this.menuLeft
            } else {
                data.style.top += 10
                data.style.left += 10
            }

            data.id = generateID()
            // Group 的子组件根节点的 id 是通过组件的 id 生成的，必须重新生成 id，否则拆分 Group 的时候获取根节点不正确
            if (data.component === 'Group') {
                data.propValue.forEach(component => {
                    component.id = generateID()
                })
            }

            this.addComponent({ component: deepCopy(data) })
            if (this.isCut) {
                this.copyData = null
            }
        },
    },
}

// 恢复上一次剪切的数据
const restorePreCutData = (store) => {
    if (store.isCut && store.copyData) {
        const data = deepCopy(store.copyData.data)
        const index = store.copyData.index
        data.id = generateID()
        store.addComponent({ component: data, index })
        if (store.curComponentIndex >= index) {
            // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
            store.curComponentIndex++
        }
    }
}

const doCopy = (store) => {
    store.copyData = {
        data: deepCopy(store.curComponent),
        index: store.curComponentIndex,
    }
}