

export function descripStr(name, value) {
    const test = name.split('\n').map(item =>  item.trim()).filter(element => element !== '')
    const test2 = value.split('\n').map(item =>  item.trim()).filter(element => element !== '')
    const resValues = test.map((item, index) => {
        return  item + ':' + test2[index]
    })
    return{descrip: resValues.join(', ')}
}

