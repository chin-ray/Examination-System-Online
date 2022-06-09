export default {
    state: {
        // 鼠标右键菜单数据
        menuTop: 0,
        menuLeft: 0,
        menuShow: false,
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
    },
}