const trunc = function(string) {
    let size = 100;
    if(string.length <= size) {
        return string;
    }
    return `${string.substr(0, size)}...`;
}
module.exports = trunc;