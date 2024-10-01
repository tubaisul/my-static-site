function renderLayout3(data) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<h1>${data.title}</h1>`;
    data.interactiveElements.forEach((element) => {
      if (element.type === "quiz") {
        const quizDiv = document.createElement("div");
        quizDiv.className = "quiz";
        quizDiv.innerHTML = `
          <p>${element.question}</p>
          ${element.options.map((option, index) => `
            <button class="option" data-correct="${option === element.correctOption}">${option}</button>
          `).join('')}
        `;
        quizDiv.addEventListener("click", (e) => {
          if (e.target.classList.contains("option")) {
            const isCorrect = e.target.getAttribute("data-correct") === "true";
            alert(isCorrect ? "正确！" : "错误！");
          }
        });
        contentDiv.appendChild(quizDiv);
      }
    });
  }
  