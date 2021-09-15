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
class ActiveRecode{
    Deleted = false
}
class Person extends ActiveRecode{
    FirstName:string;
    SecondName:string
    constructor(firstname:string,secondname:string){
        super()
        this.FirstName = firstname
        this.SecondName = secondname
    }
}
type Constructor<T={}> = new(...args:any[]) => T

function RecodeStatus<T extends Constructor>(base : T){
    return class extends base{
        Deleted : boolean = false
    }
}

let ActivedPerson = RecodeStatus(Person)
let somePeople = new ActiveRecode()
console.log(somePeople.Deleted)