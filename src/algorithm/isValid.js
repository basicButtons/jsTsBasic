var isValid = function(s) {
    const vMap = new Map([
        ["}","{"],
        ["]","["],
        [")","("]
    ]) 
    const stack = []
    for(let i = 0;i<s.length;i++){
        const chari = s[i] 
        if(/[([{]/.test(chari)){
            stack.push(chari)
        }else{
            console.log(chari)
            if(vMap.has(chari) && stack[stack.length - 1] === vMap.get(chari)){
                stack.pop()
            }else{
                console.log(chari)
                return false
            }
        }
    }
    return true
};
s = "()"
console.log(isValid(s))