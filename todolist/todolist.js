/**
 * Created by Andrey on 13.03.2016.
 */

function TodoList(){
    this.messages = [];
};

TodoList.prototype = {
    add(...items) {
        for (let item of items){
            let obj = { text: item, date: new Date().getTime() };
            this.messages.push(obj);
        }
        return this;
    },
    remove(index = 0, ...indexes) {
        let deleted = [];

        indexes.push(index);
        for (let i of indexes){
            deleted.push(this.messages.splice(i,1));
        }

        return deleted;
    },
    find(text){
        let result = [];

        for (let item of this.messages){
            if(item.indexOf(text) > -1){
                result.push(item);
            }
        }

        return result;
    },
    display() {
        let result = '',
            count = 1;
        for (let {text, date} of this.messages){
            result += `${count}. ${text} - date: ${date}\n`;
            count++;
        }
        console.log(result);
    }
};

let todo = new TodoList();

todo.add("asd1sd", "asdaswdad", "wqewefwfw", "qwewefdw1d").display();
todo.remove();
todo.display();