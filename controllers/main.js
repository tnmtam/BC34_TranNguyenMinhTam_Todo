import { Work } from "../models/work.js";
import { WorkList } from "../models/work-list.js";

var today = new Date().toString().split(" ").splice(1, 3).join(" ");
document.querySelector(".card__title p").innerHTML = today;

const getElement = (id) => document.getElementById(id);

const input = document.querySelector("#newTask");

const workServices = new WorkList();

const renderWorkList = () => {
  const content = workServices.filterWork(0).reduce((value, work) => {
    return (value += `
        <li class="row">
            <div class="col work-title">${work.workName}</div>
            <div class="buttons">
                <button class="remove" onclick="removeWork('${work.workId}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="complete" onclick="setStatus('${work.workId}')">
                    <i class="far fa-solid fa-circle-check status"></i>
                </button>                
            </div>
        </li>
          `);
  }, "");

  getElement("todo").innerHTML = content;

  const content1 = workServices.filterWork(1).reduce((value, work) => {
    return (value += `
        <li class="row">
            <div class="col work-title">${work.workName}</div>
            <div class="buttons">
                <button class="remove" onclick="removeWork('${work.workId}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="complete" onclick="setStatus('${work.workId}')">
                    <i class="fas fa-solid fa-circle-check status"></i>
                </button>                
            </div>
        </li>
          `);
  }, "");

  getElement("completed").innerHTML = content1;
};

const setLocalStore = () => {
  localStorage.setItem("workList", JSON.stringify(workServices.workList));
};

const getLocalStore = () => {
  const data = localStorage.getItem("workList");
  const dataParse = JSON.parse(data) || [];

  workServices.workList = dataParse.map((value) => {
    const work = new Work();
    for (let key in value) {
      work[key] = value[key];
    }
    return work;
  });
  renderWorkList();
};
getLocalStore();

getElement("addItem").onclick = () => {
  const work = new Work();
  const { name, value } = input;
  work[name] = value;
  workServices.addWork(work);
  
  renderWorkList();
  setLocalStore();
  input.value = "";
};

window.removeWork = (workId) => {
  console.log(workId);
  workServices.removeWork(workId);
  renderWorkList();
  setLocalStore();
};

window.setStatus = (workId) => {
  const work = workServices.findWork(workId);
  work.status = work.status === 0 ? 1 : 0;
  console.log("work: ", work);
  renderWorkList();
  setLocalStore();
};

getElement("two").onclick = () => {
  workServices.workList = workServices.sortWork("up");
  renderWorkList();
};
getElement("three").onclick = () => {
  workServices.workList = workServices.sortWork("down");
  renderWorkList();
};

