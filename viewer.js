fetch('path.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('読み込み失敗: ' + response.statusText);
    }
    return response.json(); // JSONとしてパース
  })
  .then(data_gained => {
    console.log('読み込んだデータ:', data_gained);
    data = data_gained;
    document.getElementById("Page_Title").textContent = data["name"];
    var query = new URL(decodeURIComponent(document.location.href)).searchParams.get("article");
    fetch(`src/${query}.html`)
      .then(res => res.text())
      .then(html => {

        document.getElementById("content").innerHTML = html;


        let headers = {};
        rawheaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        rawheaders.forEach(el => {
        console.log(el.textContent);
        el.id = `${el.localName}_${el.textContent}`;
        headers[el.id] = el.localName;
        

        const row = document.createElement("div");
        row.className = "row-py1";

        const Button = document.createElement("div");
        Button.className = "btn btn-link";
        Button.id = `${el.id}_button`;
        Button.textContent = el.textContent;
        Button.onclick = () => Jump_to_header(el.id);
        row.appendChild(Button);
        document.getElementById("BoxShortcut").appendChild(row);
        });
        console.log(headers);


        })
        .catch(() => {
          document.getElementById("content").innerHTML = "<p>ページが見つかりません。</p>";
        });

        let titles = Object.keys(data["articles"]);
        let self_index = titles.findIndex(item => item === query);
        let previous_article = titles[self_index-1];
        let next_article = titles[self_index+1];
        console.log(previous_article,next_article);

        document.getElementById("Button_home").href = `menu.html`;
        if (previous_article != undefined){
          document.getElementById("Button_previous").textContent = `前の記事：${previous_article}`;
          document.getElementById("Button_previous").href = `/viewer.html?article=${previous_article}`;
        }
        if (next_article != undefined){
          document.getElementById("Button_next").textContent = `次の記事：${next_article}`;
          document.getElementById("Button_next").href = `/viewer.html?article=${next_article}`;
        }


  })
  

function Jump_to_header(id){
  const target = document.getElementById(id);
  if (!target) {
    console.error("IDの要素が存在しません:", id);
    return;
  }
  target.scrollIntoView({  
  behavior: 'smooth'  
});
}
