const questions = [
  {
    id: 1,
    text: "Explain the difference between let, var, and const in JavaScript.",
    idealAnswer:
      "var is function scoped and can be redeclared. let and const are block scoped. const cannot be reassigned. let allows reassignment.",
    keywords: ["block scoped", "function scoped", "redeclared", "reassigned"],
  },
  {
    id: 2,
    text: "What is React and why is it used?",
    idealAnswer:
      "React is a JavaScript library for building user interfaces using reusable components and a virtual DOM for performance.",
    keywords: ["components", "virtual DOM", "UI", "performance"],
  },
  {
    id: 3,
    text: "What is the difference between state and props?",
    idealAnswer:
      "Props are read-only data passed from parent to child. State is managed inside a component and can change over time.",
    keywords: ["props", "state", "parent", "child", "read-only"],
  },
  {
    id: 4,
    text: "Explain useEffect in React.",
    idealAnswer:
      "useEffect is a hook that lets you perform side effects like fetching data, timers, or subscriptions in functional components.",
    keywords: ["side effects", "hook", "lifecycle", "fetching"],
  },
  {
    id: 5,
    text: "What are closures in JavaScript?",
    idealAnswer:
      "A closure is a function that retains access to its lexical scope even when executed outside that scope.",
    keywords: ["lexical scope", "function", "access", "executed"],
  },  
];

export default questions;
