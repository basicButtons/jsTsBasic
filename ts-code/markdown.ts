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

enum TagType{
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule
}

class TagTypeToHtml{
    private readonly tagType : Map<TagType,string> = new Map<TagType,string>();

    constructor(){
        this.tagType.set(TagType.Header1,"h1")
        this.tagType.set(TagType.Header2,"h2")
        this.tagType.set(TagType.Header3,"h3")
        this.tagType.set(TagType.Paragraph,"p")
        this.tagType.set(TagType.HorizontalRule,"hr")
    }

    public OpeningTag(tagType:TagType){
        return this.GetTag(tagType,"<")
    }

    public CloseingTag(tagType:TagType){
        return this.GetTag(tagType,"</")
    }

    private GetTag(tagType : TagType,openingTagPattern:string){
        let tag = this.tagType.get(tagType)
        if(tag !== null){
            return `${openingTagPattern}${tag}>`
        }
        return  `${openingTagPattern}p>`
    }
}

interface IMarkdownDocument{
    Add(...content:string[]):void;
    Get():string;
}

class MarkdownDocument implements IMarkdownDocument{
    private content:string = ""
    public Add(...contents:string[]):void{
        contents.forEach(item=>{
            this.content += item
        })
    }
    public Get(){
        return this.content
    }
}

class ParseElement{
    CurrentLine:string = ""
}

interface Ivisitor{
    Visit(token:ParseElement,MarkdownDocument:IMarkdownDocument):void;
}
interface IVisiable{
    Accept(visitor:Ivisitor,token:ParseElement,markdownDocument:IMarkdownDocument):void;
}
class Visitable implements IVisiable{
    Accept(visitor:Ivisitor,token:ParseElement,markdownDocument:MarkdownDocument){
        visitor.Visit(token,markdownDocument)
    }
}

class visitorBase implements Ivisitor{
    constructor(private readonly tagType:TagType,private readonly tagTypeTtml:TagTypeToHtml){

    }
    Visit(token:ParseElement,markdownDocument:IMarkdownDocument){
        markdownDocument.Add(this.tagTypeTtml.OpeningTag(this.tagType),token.CurrentLine,this.tagTypeTtml.CloseingTag(this.tagType))
    }
}
class Header1Visitor extends visitorBase{
    constructor(){
        super(TagType.Header1,new TagTypeToHtml())
    }
}

class Header2Visitor extends visitorBase{
    constructor(){
        super(TagType.Header2,new TagTypeToHtml())
    }
}

class Header3Visitor extends visitorBase{
    constructor(){
        super(TagType.Header3,new TagTypeToHtml())
    }
}

class ParagraphVisitor extends visitorBase{
    constructor(){
        super(TagType.Paragraph,new TagTypeToHtml())
    }
}

class HorizontalRuleVisitor extends visitorBase{
    constructor(){
        super(TagType.HorizontalRule,new TagTypeToHtml())
    }
}

abstract class Handler<T>{
    protected next:Handler<T>|null = null;
    public SetNext(next:Handler<T>) : void{
        this.next = next
    }
    public HandleRequest(request : T):void{
        if(!this.CanHandle(request)){
            if(this.next !== null){
                this.next.HandleRequest(request)
            }
            return;
        }
    }
    protected abstract CanHandle(request:T):boolean;
}

class ParseChainHandle extends Handler<ParseElement>{
    private readonly visitable : IVisiable = new Visitable()
    constructor(
        private readonly document :IMarkdownDocument,
        private readonly tagType : string,
        private readonly visitor : Ivisitor
    ){
        super()
    }
}