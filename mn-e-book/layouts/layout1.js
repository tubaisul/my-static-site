function renderLayout1(data) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `<h1>${data.title}</h1>`;
  data.sections.forEach((section) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";
    sectionDiv.innerHTML = `
      <h2 class="section-title">${section.title}</h2>
      <div class="content">${section.content}</div>
    `;
    contentDiv.appendChild(sectionDiv);
  });
}
