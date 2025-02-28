import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";


export default function App(props) {
//const taskList = props.tasks?.map((task) => task.name);
//上面一行的解读：相当与以下的函数的功能
//   function mapTaskToName(task){
//   return task.name;  }
// let array=[];
// for (let i=0;i<props.tasks.lengh;i++) {
//   array.add(mapTaskToName(props.tasks[i]));
// }
const [tasks, setTasks] = useState(props.tasks);
//注意：useState左边数组的两个元素的名字是自定义的，但是无论元素名字怎样，功能是不变的
function addTask(name) {
  const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  setTasks([...tasks, newTask]);//省略号代表的是复制现有的任务列表，确保不修改原数组
}

function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  setTasks(updatedTasks);
}

function deleteTask(id) {
  const remainingTasks = tasks.filter((task) => id !== task.id);
  setTasks(remainingTasks);
}

const taskList = tasks.map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}//规定无序列表要有key
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
  />
));

const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
const headingText = `${taskList.length} ${tasksNoun} remaining`;
//上一行也可以将字符串片段放入数组，然后用join()方法拼接
//如：const headingText=[taskList.length,tasksNoun,"remaining"].join(" ");

//有几个就映射几个Todo，要加Todo只用在index.js的DATA里面添加数据即可；Todo.js向App.js里面传组件，index.js向App.js里面传数组数据
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
      <FilterButton filterName="All"/>
      <FilterButton filterName="Active"/>
      <FilterButton filterName="Completed"/>
      </div>
      <h2 id="list-heading"> {headingText} </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
