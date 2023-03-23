import FullList from "../model/FullList";

interface DOMList{
    ul:HTMLUListElement,
    clear() : void,
    render(fullList:FullList) : void
}

export default class ListTemplate implements DOMList{
    ul: HTMLUListElement;
    static instance : ListTemplate = new ListTemplate()
    private constructor(){
        this.ul = document.getElementById('myUL') as HTMLUListElement
    }
    clear(): void {
        this.ul.innerHTML = ''
    }
    render(fullList: FullList): void {
        this.clear()
        fullList.list.forEach(ele=>{
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const check = document.createElement('input') as HTMLInputElement
            check.type = 'checkbox'
            check.id = ele.id
            check.tabIndex = 0
            check.checked = ele.checked
            if(ele.checked)
            {
                li.classList.add('checked')
            }
            li.append(check)
            check.addEventListener('change',()=>{
                ele.checked = !ele.checked
                this.render(fullList)
                fullList.save()
            })

            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = ele.id
            label.textContent = ele.item
            li.append(label)

            const btn = document.createElement('button') as HTMLButtonElement
            btn.className = 'btn'
            btn.textContent = 'X'
            li.append(btn)

            btn.addEventListener('click',()=>{
                fullList.removeItem(ele.id)
                fullList.save()
                this.render(fullList)
            })
            this.ul.append(li)
        })
    }

}