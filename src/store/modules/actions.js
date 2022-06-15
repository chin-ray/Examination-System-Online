import { generateID, deepCopy } from '@/utils/utils'

export default {
    state: {
        copyData: null, // 复制粘贴剪切
        isCut: false,
    },
    actions: {
        copy() {
            // 如果有剪切的数据，需要先还原
            restorePreCutData()
            toCopyData()

            this.isCut = false
            hideContextMenu()
        },

        paste(isMouse) {
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

            addComponent({ component: deepCopy(data) })
            if (this.isCut) {
                this.copyData = null
            }
        },

        cut() {
            // 如果重复剪切，需要恢复上一次剪切的数据
            restorePreCutData()
            toCopyData()

            deleteComponent()
            this.isCut = true
        },
    },
}

// 恢复上一次剪切的数据
function restorePreCutData() {
    if (this.isCut && this.copyData) {
        const data = deepCopy(this.copyData.data)
        const index = this.copyData.index
        data.id = generateID()
        addComponent({ component: data, index })
        if (this.curComponentIndex >= index) {
            // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
            this.curComponentIndex++
        }
    }
}

function toCopyData() {
    this.copyData = {
        data: deepCopy(this.curComponent),
        index: this.curComponentIndex,
    }
}