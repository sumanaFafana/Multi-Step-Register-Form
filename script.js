// Add JS here
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const buttons = document.querySelectorAll(".btn");
const buttonback = document.querySelectorAll(".btn-back");
const forms = document.querySelectorAll(".form");
const stepBalls = document.querySelectorAll(".step-ball");
const topics = document.querySelectorAll(".topic");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const containerCount = document.querySelector(".container-count");

let currentForm = 0;
let stepCount = 1;

// User Details
const user = {
  name: "",
  email: "",
};

nameInput.addEventListener("input", (e) => {
  user.name = e.target.value;
  setValue(name, user.name);
});

emailInput.addEventListener("input", (e) => {
  user.email = e.target.value;
  setValue(email, user.email);
});

function setValue(element, value) {
  element.innerText = value;
}

const topicsSelected = [];

topics.forEach((topic) => {
  topic.addEventListener("click", (event) => {
    if (!topic.classList.contains("chosen")) {
      topic.classList.add("chosen");
      const addTopic = event.target.innerText;
      topicsSelected.push(addTopic);
    } else {
      topic.classList.remove("chosen");
      const removeTopic = event.target.innerText;
      topicsSelected.splice(topicsSelected.indexOf(removeTopic), 1);
    }
    callTopics(topicsSelected);
  });
});

const topicsList = document.querySelector(".topics-list");

function callTopics(topics) {
  topicsList.innerHTML = "";

  topics.forEach((topic) => {
    const li = document.createElement("li");
    li.textContent = topic;
    topicsList.appendChild(li);
  });
}

function showForm() {
  forms.forEach((form, index) => {
    if (index !== currentForm) {
      form.classList.add("hidden");
    }
    if (index === currentForm) {
      form.classList.remove("hidden");
    }
  });

  stepBalls.forEach((ball, index) => {
    if (index === currentForm) {
      ball.classList.add("active");
      containerCount.innerText = stepCount;
    } else {
      ball.classList.remove("active");
      containerCount.innerText = stepCount;
    }
  });
}

forms.forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (nameInput.value === "" || emailInput.value === "") {
      return;
    }

    if (currentForm < stepBalls.length - 1) {
      currentForm++;
      stepCount++;
      showForm();
    }
  });
});

buttonback.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentForm > 0) {
      currentForm--;
      stepCount--;
      showForm();
    }
  });
});

//On load
showForm();
