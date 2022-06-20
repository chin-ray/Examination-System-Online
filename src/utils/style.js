// 右侧属性编辑器
export const styleData = [
    { key: 'left', label: 'x 坐标' },
    { key: 'top', label: 'y 坐标' },
    { key: 'width', label: '宽' },
    { key: 'height', label: '高' },
    { key: 'color', label: '颜色' },
    { key: 'backgroundColor', label: '背景色' },
    { key: 'borderWidth', label: '边框宽度' },
    { key: 'borderStyle', label: '边框风格' },
    { key: 'borderColor', label: '边框颜色' },
    { key: 'borderRadius', label: '边框半径' },
    { key: 'fontSize', label: '字体大小' },
    { key: 'fontWeight', label: '字体粗细' },
    { key: 'lineHeight', label: '行高' },
    { key: 'letterSpacing', label: '字间距' },
    { key: 'textAlign', label: '左右对齐' },
    { key: 'verticalAlign', label: '上下对齐' },
    { key: 'opacity', label: '透明度' },
]

export function getStyle(style, filter = []) {
    // 必须遍历的样式属性
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'borderWidth',
        'letterSpacing',
        'borderRadius',
    ]

    const result = {}

    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            result[key] = style[key]
            if (needUnit.includes(key)) {
                result[key] += 'px'
            }
        }
    })

    return result
}