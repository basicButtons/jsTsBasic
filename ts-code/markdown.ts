class HtmlHandler{
    public TextChangeHandler(id:string,output:string):void{
        const markdown = <HTMLTextAreaElement>document.getElementById(id)
        const markdownOutput = <HTMLLabelElement>document.getElementById(output)
        if(markdown !== null){
            markdown.onkeyup = (e)=>{
                if(markdown.value){
                    markdownOutput.innerHTML = markdown.value
                }else{
                    markdownOutput.innerHTML = "<p></p>"
                }
            }
        }
    }
}

