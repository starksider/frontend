/**
 * Created by Andrey on 13.03.2016.
 */

function consoleView(desc = '', renderItems = []){
    if (Array.isArray(desc)){
        renderItems = desc;
        desc = '';
    }
    let result = '',
        count = 1;
    for (let {text, date} of renderItems){
        result += `${count}. ${text} - date: ${date}\n`;
        count++;
    }
    console.log(desc + result);
}

function TodoList(viewMode = consoleView){
    this.view = viewMode;
    this.messages = [];
};

TodoList.prototype = {
    add(...items) {
        for (let item of items){
            let obj = { text: item, date: new Date().getMilliseconds() };
            this.messages.push(obj);
        }
        return this;
    },
    remove(index = 0, ...indexes) {
        let deleted = [];

        indexes.push(index);
        for (let i of indexes){
            deleted.push(this.messages.splice(i,1)[0]);
        }
        this.view(`Removed item${deleted.length > 1 ? 's' : ''}: `, deleted);

        return deleted;
    },
    find(match){
        let result = [];

        for (let item of this.messages){
            if(item.text.indexOf(match) > -1){
                result.push(item);
            }
        }
        this.view(`Matched item${result.length > 1 ? 's' : ''}: `, result);

        return result;
    },
    display() {
       this.view(this.messages);
    }
};

let todo = new TodoList();

todo.add("asd1sd", "asdaswdad", "wqewefwfw", "qwewefdw1d").display();
todo.find("asd");
todo.remove();