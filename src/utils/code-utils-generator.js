import { isNotNull } from "@/utils/utils";

export function buildDefaultValueListFn(formConfig, widgetList, resultList) {
    return function (fieldWidget) {
        const fop = fieldWidget.options
        const fd = fop.defaultValue
        if (isNotNull(fd)) {
            resultList.push(`${fop.name}: ${JSON.stringify(fd)},`)
        } else {
            resultList.push(`${fop.name}: null,`)
        }
    }
}

export function buildRulesListFn(formConfig, widgetList, resultList) {
    return function (fieldWidget) {
        const fop = fieldWidget.options
        let fieldRules = []
        if (!!fop.required) {
            fieldRules.push(`{
        required: true,
        message: '字段不能为空',
      }`)
        }

        //TODO: 自定义校验函数

        fieldRules.length > 0 && resultList.push(`${fop.name}: [${fieldRules.join(',')}],`)
    }
}

export function buildFieldOptionsFn(formConfig, widgetList, resultList) {
    return function (fieldWidget) {
        const fop = fieldWidget.options
        const ft = fieldWidget.type
        if ((ft === 'radio') || (ft === 'checkbox') || (ft === 'select') || (ft === 'cascader')) {
            resultList.push(`${fop.name}Options: ${JSON.stringify(fop.optionItems)},`)
        }
    }
}

export function buildUploadDataFn(formConfig, widgetList, resultList) {
    return function (fieldWidget) {
        const fop = fieldWidget.options
        const ft = fieldWidget.type
        if ((ft === 'picture-upload') || (ft === 'file-upload')) {
            resultList.push(`${fop.name}FileList: [],`)
            resultList.push(`${fop.name}UploadHeaders: {},`)
            resultList.push(`${fop.name}UploadData: {},`)
        }
    }
}

export function buildActiveTabs(formConfig, widgetList) {
    let resultList = []
    const handlerFn = function (cw) {
        const cop = cw.options
        const ct = cw.type
        if (ct === 'tab') {
            cw.tabs.length > 0 && resultList.push(`'${cop.name}ActiveTab': '${cw.tabs[0].options.name}',`)
        }
    }

    return resultList
}