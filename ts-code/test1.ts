class Grid{
    Width:number = 0
    Height:number = 0
    Weight:number = 0
}
class Margin{
    Left : number = 0
    Top : number = 0
    Weight:string = ""
}
function ConsolidatedGrid(grid:Grid,margin :Margin):Grid&Margin{
    let solidatedGrid = <Grid & Margin>{}
    solidatedGrid.Width = grid.Width
    solidatedGrid.Height = grid.Height
    solidatedGrid.Left = margin.Left
    solidatedGrid.Top = margin.Top
    // solidatedGrid.Weight = 0
    // Type "number" is not assignable to type "never"
    return solidatedGrid
}
let currentUser = {
    user:"peter",
    roles:[{
        role:"users"
    }]
}
function isInRole(role:string):boolean{
    if(currentUser.roles.find(item => item.role === role)){
        return true
    }
    return false
}
function Admin(target:any,propertyKey:string|symbol,descriptor:PropertyDescriptor){
    let orighinalMethod = descriptor.value
    descriptor.value = function(){
        if(isInRole(`admin`)){
            orighinalMethod.apply(this,arguments)
            return
        }
        console.log(`${currentUser.user} is not in the admin role`)
    }
    return descriptor
}
interface IDecoratorExample{
    AnyoneCanRun(args:string):void;
    AdminOnly(arg:string):void;
}
class DecoratedExampleMethodDecoration implements IDecoratorExample{
    AnyoneCanRun(args:string){
        console.log(args)
    }
    @Admin
    AdminOnly(arg:string){
        console.log(arg)
    }
}
let some = new DecoratedExampleMethodDecoration()
some.AdminOnly("!@3")


// 对于方法的装饰通过修改 descriptor 来实现，修改 descriptor 中的 value 属性。


// Mixin
// class ActiveRecode{
//     Deleted = false
// }
class Person{
    FirstName:string;
    SecondName:string
    constructor(firstname:string,secondname:string){
        this.FirstName = firstname
        this.SecondName = secondname
    }
}
type Constructor<T={}> = new(...args:any[]) => T

function RecodeStatus<T extends Constructor>(base : T){
    return class extends base{
        private deleted : boolean = false
        get Deleted():boolean{
            return this.deleted
        }
        Delete():void{
            this.deleted = true
            console.log("The recode has been marked as deleted!")
        }
    }
}

let ActivedPerson = RecodeStatus(Person)
let somePeople = new ActivedPerson("Ma","xuan")
console.log(somePeople.Deleted)
somePeople.Delete()
class Queue<T>{
    private queue:T[] = []
    public Push(value :T):void{
        this.queue.push(value)
    }
    public Pop():T|undefined{
        return this.queue.pop()
    }
}
let queue : Queue<number> = new Queue<number>()
let stringQueue :  Queue<string> = new Queue<string>()
queue.Push(10)
console.log(queue.Pop())
console.log(queue.Pop())
stringQueue.Push("123")
console.log(stringQueue.Pop())


enum Genre {
    Rock,
    CountryAndWestern,
    Classical,
    Pop,
    HeavyMetal
}

class MusicCollection{

    private readonly collection : Map<Genre,string[]>;

    constructor(){
        this.collection =  new Map<Genre,string[]>()
    }

    public Add(genre:Genre,artist:string){
        if(this.collection.has(genre)){
            let artists = this.collection.get(genre)
            artists?.push(artist)
        }
        else{
            let artists = [artist]
            this.collection.set(genre,artists)
        }
    }

    public Get(genre:Genre):string[]|undefined{
        return this.collection.get(genre)
    }
}