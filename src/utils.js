const encodeUsername = username => {
    let encoded = ''
    const chars = [...username]
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        if (/[A-Za-z0-9_@.-]/.test(char)) {
            encoded += char
        } else if (char === '+') {
            encoded += '++'
        } else if (char === ' ') {
            if (i === chars.length - 1 || /[A-Za-z0-6@]/.test(chars[i + 1])) {
                encoded += '+'
            } else {
                encoded += '+_'
            }
        } else {
            const BASE64MAP = '.-7890123456ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            let encodedChar = ''
            let codepoint = char.codePointAt(0)
            for (let j = 0; j < 4; j++) {
                encodedChar = BASE64MAP[codepoint & 63] + encodedChar
                codepoint >>= 6
            }
            encodedChar = '+' + encodedChar
            encoded += encodedChar
        }
    }
    return encoded
}

const decodeUsername = username => {
    let decoded = ''
    const chars = [...username]
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        if (char !== '+') {
            decoded += char
        } else if (i === chars.length - 1 || /[A-Za-z0-6@]/.test(chars[i + 1])) {
            decoded += ' '
        } else if (chars[i + 1] === '_') {
            decoded += ' '
            i++
        } else if (chars[i + 1] === '+') {
            decoded += '+'
            i++
        } else {
            if (i > chars.length - 4) {
                decoded += '\uFFFD'
                break
            }
            const BASE64MAP = '.-7890123456ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            let shift = 18
            let codepoint = 0
            for (let j = 0; j < 4; j++) {
                let index = BASE64MAP.indexOf(chars[++i])
                if (index === -1) {
                    codepoint = 1114112
                    index = 0
                }
                codepoint += index << shift
                shift -= 6
            }
            if (codepoint > 1114111) {
                decoded += '\uFFFD'
            } else {
                decoded += String.fromCodePoint(codepoint)
            }
        }
    }
    return decoded
}

const handleUpdate = setter => event => setter(event.target.value)
const nothing = () => {}

export {
    decodeUsername,
    encodeUsername,
    handleUpdate,
    nothing,
}
