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

    // 检查当前小节是否需要展示 Jupyter Notebook
    if (section.include_notebook) {
      const jupyterLiteDiv = document.createElement("div");
      jupyterLiteDiv.style = "height: 600px; width: 100%; margin-top: 20px;";
      sectionDiv.appendChild(jupyterLiteDiv);
      renderJupyterLite(section.notebook, jupyterLiteDiv);
    }
  });
}
