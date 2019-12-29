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
}

TodoList.prototype = {
    add(...items) {
        for (let item of items){
            this.messages.push({ text: item, date: new Date().getMilliseconds()});
        }
        return this;
    },
    remove(index = 0, ...indexes) {
        let prevIndex,
            deleted = [],
            messages = this.messages;

        indexes.push(index);
        for (let i of indexes){
            if (prevIndex === i) continue;
            deleted.push(messages[i]);
            delete messages[i];
            prevIndex = i;
        }
        this.messages = messages.filter(() => true);
        this.view(`Removed ${deleted.length} item${deleted.length > 1 ? 's' : ''}: `, deleted);

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

todo.add("1asd1sd", "2asdaswdsad", "3wqswswesdw", "4qwewefdw1d").display();
todo.find("asd");
todo.remove(1,1,1);
todo.display();