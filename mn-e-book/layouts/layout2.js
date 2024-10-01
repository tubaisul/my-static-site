function renderLayout2(data) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<h1>${data.title}</h1>`;
    data.sections.forEach((section) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "section";
      sectionDiv.innerHTML = `
        <h2 class="section-title">${section.title}</h2>
        <div class="content">${section.content}</div>
        <img src="${section.image}" alt="${section.title}" style="width:100%; margin-top:10px;">
      `;
      contentDiv.appendChild(sectionDiv);
    });
  }
  