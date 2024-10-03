document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#sidebar a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const chapterFile = this.getAttribute("data-chapter");
      loadChapter(chapterFile);
    });
  });
});

// 加载指定章节内容
function loadChapter(chapterFile) {
  fetch(`./content/${chapterFile}`)
    .then((response) => {
      if (!response.ok) throw new Error("Chapter not found");
      return response.json();
    })
    .then((data) => {
      // 根据 layout 字段选择合适的模板渲染
      switch (data.layout) {
        case "layout1":
          renderLayout1(data);
          break;
        case "layout2":
          renderLayout2(data);
          break;
        case "layout3":
          renderLayout3(data);
          break;
        default:
          console.error("Unknown layout type:", data.layout);
          break;
      }
    })
    .catch((error) => {
      document.getElementById("content").innerHTML = `<p>加载失败：${error.message}</p>`;
    });
}
