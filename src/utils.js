// TODO: implement suport for empty curly brackets (?)
export function format(string, ...args) {
    return string.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}
