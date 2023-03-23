import ListItem from "./ListItem";

interface List{
    list : ListItem[], // [{id,item,checked}]
    load() : void,
    save() : void,
    clearList() : void,
    addItem(item:ListItem) : void,
    removeItem(id: string) : void
}

export default class FullList implements List{

    static instance : FullList = new FullList()
    constructor( private _list : ListItem[] = [] ){}

    get list() : ListItem[]{
        return this._list
    }
    
    save() : void {
        localStorage.setItem('myList',JSON.stringify(this._list))
    }
    clearList(): void {
        this._list = []
        this.save()
    }
    addItem(item: ListItem): void {
        this._list.push(item)
        this.save()
    }
    removeItem(id: string): void {
        this._list.filter(item => item.id!==id)
        this.save()
    }
    load(): void {
        const items : string | null = localStorage.getItem('myList')
        if(typeof items !== 'string') return

        const parseItem : { _id:string,_item:string,_checked:boolean }[]  = JSON.parse(items)
        
        parseItem.forEach(element => {
            FullList.instance.addItem(new ListItem(element._id,element._item,element._checked))
        });
    }
}