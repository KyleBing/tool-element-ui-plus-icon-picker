const AUTHORIZATION_NAME = 'YunAuthorization' // 存储用户信息的 localStorage name，跟 Diary 通用

function downloadFile(fileName: string, data: string) { // 下载 base64 图片
    let aLink = document.createElement('a')
    let blob = new Blob([data]); //new Blob([content])
    let evt = document.createEvent("HTMLEvents")
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.click()
}

// 设置 authorization
function setAuthorization(userInfo: any) {
    sessionStorage.setItem(AUTHORIZATION_NAME, JSON.stringify(userInfo))
}

// 获取 authorization
function getAuthorization(): AvatarInfo {
    const authorizationString = sessionStorage.getItem(AUTHORIZATION_NAME)
    if (authorizationString){
        return JSON.parse(authorizationString)
    } else {
        return {id: "", name: "", organizeId: "", roleId: "", token: ""}
    }
}

/**
 * 登录返回的数据结构
 */
interface AvatarInfo {
    id: string,
    name: string,
    organizeId: string,
    roleId: string,
    token: string
    //     "id": "656696fccb40d077ee6a5ed0",
    //     "name": "管理员",
    //     "organizeId": "000000000000000000000001",
    //     "roleId": "000000000000000000000001",
    //     "token": ""
}

// 删除 authorization
function deleteAuthorization() {
    localStorage.removeItem(AUTHORIZATION_NAME)
}


// 格式化时间，输出字符串
function dateFormatter(date: Date, formatString?: string) {
    formatString = formatString || 'yyyy-MM-dd hh:mm:ss'
    let dateRegArray = {
        "M+": date.getMonth() + 1,                      // 月份
        "d+": date.getDate(),                           // 日
        "h+": date.getHours(),                          // 小时
        "m+": date.getMinutes(),                        // 分
        "s+": date.getSeconds(),                        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds()                     // 毫秒
    }
    if (/(y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substring(4 - RegExp.$1.length))
    }
    for (let section in dateRegArray) {
        if (new RegExp("(" + section + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateRegArray[section]) : (("00" + dateRegArray[section]).substring(("" + dateRegArray[section]).length)))
        }
    }
    return formatString
}

function dateProcess(dateString: string) {
    let date = new Date(dateString)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let week = date.getDay()
    let timeLabel = ''
    if (hour >= 23 && hour < 24 || hour <= 3 && hour >= 0) {
        timeLabel = '深夜'
    } else if (hour >= 19 && hour < 23) {
        timeLabel = '晚上'
    } else if (hour >= 14 && hour < 19) {
        timeLabel = '傍晚'
    } else if (hour >= 11 && hour < 14) {
        timeLabel = '中午'
    } else if (hour >= 6 && hour < 11) {
        timeLabel = '早上'
    } else if (hour >= 3 && hour < 6) {
        timeLabel = '凌晨'
    }

    return {
        year: year,
        weekday: WEEKDAY[week],
        date:`${padNumberWith0(month)}月${padNumberWith0(day)}日`,
        dateFull: `${year}年${month}月${day}日`,
        dateFullSlash: `${year}/${month}/${day}`,
        timeLabel: timeLabel,
        time: `${padNumberWith0(hour)}:${padNumberWith0(minutes)}`
    }
}
function padNumberWith0(num: number){
    return String(num).padStart(2, '0')
}

// CONST
const WEEKDAY = {0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六',}
const WEEKDAY_SHORT = {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',}
const WEATHER = [
    {title : 'sunny' ,        name : '晴'} ,
    {title : 'cloudy' ,       name : '多云'} ,
    {title : 'overcast' ,     name : '阴'} ,
    {title : 'sprinkle' ,     name : '小雨'} ,
    {title : 'rain' ,         name : '雨'} ,
    {title : 'thunderstorm' , name : '暴雨'} ,
    {title : 'snow' ,         name : '雪'} ,
    {title : 'fog' ,          name : '雾'} ,
    {title : 'tornado' ,      name : '龙卷风'} ,
    {title : 'smog' ,         name : '雾霾'} ,
    {title : 'sandstorm' ,    name : '沙尘暴'} ,
]



export default {
    getAuthorization,
    setAuthorization,
    dateProcess,
    dateFormatter,
    deleteAuthorization,
    downloadFile,
    WEEKDAY_SHORT,
    WEATHER,
    WEEKDAY
}
