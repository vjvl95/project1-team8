const existError = (value) => {
    return `이 ${value}은 현재 사용중입니다. 다른 ${value}을 입력해 주세요.`
}

const matchError = (value) => {
    return `${value}가 일치하지 않습니다. 다시 한 번 확인해 주세요.`
}

const findError = (value) => {
    return `해당하는 ${value} 내역이 없습니다. 다시 한 번 확인해 주세요.`
}

const headerError = "headers의 Content-Type을 application/json으로 설정해주세요"

export { existError, matchError, findError, headerError }