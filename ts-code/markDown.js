var HtmlHandler = /** @class */ (function () {
    function HtmlHandler() {
    }
    HtmlHandler.prototype.TextChangeHandler = function (id, output) {
        var markdown = document.getElementById(id);
        
        var markdownOutput = document.getElementById(output);
        console.log(markdownOutput)
        if (markdown !== null) {
            markdown.onkeyup = function (e) {
                if (markdown.value) {
                    console.log(markdown.value)
                    markdownOutput.innerHTML = markdown.value;
                    console.log(markdownOutput)
                }
                else {
                    markdownOutput.innerHTML = "<p></p>";
                }
            };
        }
    };
    return HtmlHandler;
}());
