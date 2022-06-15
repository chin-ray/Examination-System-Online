import { deepCopy } from '@/utils/utils'

export default {
    state: {
        snapshotData: [], // 编辑器快照数据
        snapshotIndex: -1, // 快照索引
    },
    actions: {
        undo() {
            if (this.snapshotIndex >= 0) {
                this.snapshotIndex--
                const componentData = deepCopy(this.snapshotData[this.snapshotIndex]) || []
                if (this.curComponent) {
                    // 如果当前组件不在 componentData 中，则置空
                    const needClean = !componentData.find(component => this.curComponent.id === component.id)

                    if (needClean) {
                        this.setCurComponent({
                            component: null,
                            index: null,
                        })
                    }
                }
                this.setComponentData(componentData)
            }
        },

        redo() {
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotIndex++
                this.setComponentData(deepCopy(this.snapshotData[this.snapshotIndex]))
            }
        },

        recordSnapshot() {
            // 添加新的快照
            this.snapshotData[++this.snapshotIndex] = deepCopy(this.componentData)
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
            }
        },
    },
}
