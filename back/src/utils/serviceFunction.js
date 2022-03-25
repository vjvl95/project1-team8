const searchFunc = (searchType, searchWord) => {
    let searchKey = []
    if (searchType === "education") {
        searchKey = ['school', 'major', 'position']
    } else {
        searchKey = ['title', 'description']
    }
    const searchOpt = searchKey.map(v => {
        const arr = {}
        arr[v] = {$regex: searchWord, '$options': "i"}
        return arr
    })
    return searchOpt
}

export { searchFunc }