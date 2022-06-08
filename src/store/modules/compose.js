import { $ } from '@/utils/utils'

export default {
    state: {
        areaData: { // 选中区域包含的组件以及区域位移信息
            style: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            },
            components: [],
        },
        editor: null,
    },
    actions: {
        getEditor(state) {
            state.editor = $('#editor')
        },

        setAreaData(state, data) {
            state.areaData = data
        },

        compose({ componentData, areaData, editor }) {
            const components = []
            areaData.components.forEach(component => {
                components.push(component)
            })

            batchDeleteComponent(areaData.components)
            setCurComponent({
                component: componentData[componentData.length - 1],
                index: componentData.length - 1,
            })

            areaData.components = []
        },

        // 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经从 componentData 挪到 Group 组件中了
        batchDeleteComponent({ componentData }, deleteData) {
            deleteData.forEach(component => {
                for (let i = 0, len = componentData.length; i < len; i++) {
                    if (component.id == componentData[i].id) {
                        componentData.splice(i, 1)
                        break
                    }
                }
            })
        },

        decompose({ curComponent, editor }) {
            const components = curComponent.propValue

            deleteComponent()
            components.forEach(component => {
                addComponent({ component })
            })
        },
    },
}
