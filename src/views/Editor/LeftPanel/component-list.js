import { mainStore } from '@/store'
const store = mainStore()

// 公共样式
export const commonStyle = {
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
}

// 编辑器左侧组件列表
const list = [
    {
        component: 'u-button',
        label: '按钮',
        propValue: '按钮',
        icon: 'button',
        style: {
            width: 100,
            height: 40,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'u-grid',
        label: '栅格',
        propValue: '栅格',
        icon: 'button',
        style: {},
    },
    {
        component: 'u-grid',
        label: '栅格',
        propValue: '栅格',
        icon: 'button',
        cols: [
            {
                "id": "grid-col-46174",
                "type": "grid-col",
                "widgetList": [],
                "options": {
                    "name": "gridCol46174",
                    "hidden": false,
                    "span": 12,
                    "md": 12,
                    "sm": 12,
                    "xs": 12,
                    "customClass": ""
                },
            },
            {
                "id": "grid-col-15323",
                "type": "grid-col",
                "widgetList": [],
                "options": {
                    "name": "gridCol15323",
                    "hidden": false,
                    "span": 12,
                    "md": 12,
                    "sm": 12,
                    "xs": 12,
                    "customClass": ""
                },
            }
        ],
        options: {
            "name": "grid120515",
            "hidden": false,
            "gutter": 12,
            "colHeight": null,
            "customClass": []
        },
    }
]

const formConfig = {
    modelName: "formData", // 数据绑定字段
    refName: "vForm", // ref名称
    rulesName: "rules", // 规则名称
    size: "", // 组件大小
    labelWidth: 80,
    labelPosition: "left", // 表单label方向
    labelAlign: "label-left-align", // 表单项label方向
    cssCode: "",
    customClass: "",
    functions: "",
    layoutType: "PC", // 布局类型 PC/Pad/H5
    jsonVersion: 3,
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: ""
}

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list
