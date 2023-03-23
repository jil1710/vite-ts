import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = ():void =>{
    const fullList = FullList.instance
    const listTemplate = ListTemplate.instance

    const submit = document.getElementById('form') as HTMLFormElement
    submit.addEventListener('submit',(e : SubmitEvent)=>{
        e.preventDefault()
        const inputEle = document.getElementById('myInput') as HTMLInputElement
        const item : string = inputEle.value.trim()
        if(!item) return
        const newItem = new ListItem(Date.now().toString(),item)
        fullList.addItem(newItem)
        listTemplate.render(fullList)
    })
    fullList.load()
    listTemplate.render(fullList)
}

document.addEventListener('DOMContentLoaded',initApp)