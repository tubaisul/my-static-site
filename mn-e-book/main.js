document.addEventListener("DOMContentLoaded", () => {
  // 为目录导航栏绑定点击事件
  document.querySelectorAll("#sidebar a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认的链接跳转行为
      const chapterFile = this.getAttribute("data-chapter"); // 获取章节文件路径
      loadChapter(chapterFile); // 加载指定章节内容
    });
  });
});

// 加载指定章节内容
function loadChapter(chapterFile) {
  fetch(`./content/book1/${chapterFile}`)
    .then((response) => {
      if (!response.ok) throw new Error("Chapter not found");
      return response.json();
    })
    .then((data) => {
      renderChapter(data); // 渲染章节内容
    })
    .catch((error) => {
      document.getElementById("content").innerHTML = `<p>加载失败：${error.message}</p>`;
    });
}

// 渲染章节内容
function renderChapter(data) {
  const contentDiv = document.getElementById("content");
  const jupyterLiteDiv = document.getElementById("jupyter-lite");
  contentDiv.innerHTML = `<h1>${data.title}</h1>`;
  jupyterLiteDiv.style.display = "none"; // 隐藏 JupyterLite 容器

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
      renderJupyterLite(section.notebook, jupyterLiteDiv);
    }
  });
}

// 渲染 JupyterLite 内容
function renderJupyterLite(notebookData, jupyterLiteDiv) {
  jupyterLiteDiv.style.display = "block"; // 显示 JupyterLite 容器
  const liteApp = JupyterLite.start({
    files: [
      {
        name: "notebook.ipynb",
        content: generateNotebookContent(notebookData.code) // 根据传入代码生成笔记本内容
      }
    ]
  });

  // 将生成的笔记本内容渲染到 JupyterLite 容器中
  liteApp.then((app) => {
    const retroLab = app.retroLab;
    retroLab.commands.execute("docmanager:open", {
      path: "notebook.ipynb",
      factory: "Notebook"
    });
  });
}

// 生成 Notebook 文件的内容
function generateNotebookContent(codeArray) {
  return JSON.stringify({
    cells: codeArray.map((code) => ({
      cell_type: "code",
      execution_count: null,
      metadata: {},
      outputs: [],
      source: code
    })),
    metadata: {},
    nbformat: 4,
    nbformat_minor: 5
  });
}
