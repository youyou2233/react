import React from "react";
import { useState } from "react";

function Form(props) {

    const [name, setName] = useState(" ");

    function handleSubmit(event){
        event.preventDefault();// 阻止表单的默认提交行为
        props.onSubmit(name);  // 调用父组件传递的函数（如 App.js 中的 addTask
        //这个props.onSubmit函数的值是App.js里面的addTask函数
        setName(""); // 清空输入框
    }
    function handleChange(event) {
        setName(event.target.value);
    }
    //注意：handleChange 和 handleSubmit 不会同时触发原因：
    //handleChange 是由输入框的 onChange 事件触发的，每次用户输入时都会调用。作用是将输入框的值实时同步到 React 状态中。
    //handleSubmit 是由表单的 onSubmit 事件触发的，只有当用户点击提交按钮时才会调用，作用是处理表单提交的逻辑。
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
export default Form;

//写一下思路流程：1、用户在输入框form中输入内容，该event触发onChange事件，并将事件对象传递给handleChange函数
//2、获取event事件中的值（是event.target.value）传给setName，setName将name的值实时更新到输入框中显示
//3、之后用户点击add按钮，触发onSubmit，调用handleSubmit函数，从而将name传给addTask函数，同时清空输入框
//4、在App.js中，index.js传入了tasks作为useState的初始值，后根据Form.js传入的name设立了对象类型的变量newTask
//5、setTasks将原任务列表复制，将newTask加到任务列表后面，形成新的任务列表，更新tasks的值
//6、