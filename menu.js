fetch('./path.json')
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
    for(const key in data["articles"]){
      AddArticleCard(data["articles"],key);
    }
    
  })
  .catch(error => {
    console.error('エラー:', error);
  });


function AddArticleCard(data,ArticleName){
  const Col = document.createElement("div");
  Col.className = "col-4";

  const Card = document.createElement("div");
  Card.style = "width: 18rem;";
  Card.id = `${ArticleName}_Card`;
  Card.className = "card mb-3";

  const Card_Body = document.createElement("div");
  Card_Body.id = `${ArticleName}_Card_body`;
  Card_Body.className = "card_body";
  Card.appendChild(Card_Body);

  const Card_Title = document.createElement("h5");
  Card_Title.id = `${ArticleName}_Card_Title"`;
  Card_Title.className = "card-title";
  Card_Title.textContent = data[ArticleName]["name"];
  Card_Body.appendChild(Card_Title);

  const Card_Text = document.createElement("p");
  Card_Text.id = `${ArticleName}_Card_Text`;
  Card_Text.textContent = data[ArticleName]["description"];
  Card_Text.className = "card-text";
  Card_Body.appendChild(Card_Text);

  const Card_Button = document.createElement("a");
  Card_Button.id = `${ArticleName}_Card_Button`;
  Card_Button.className = "btn btn-primary";
  Card_Button.textContent = "ページへ移動";
  Card_Button.href = `${window.location.pathname.replace(/[^\/]*$/, '')}viewer.html?article=${ArticleName}`;
  Card_Body.appendChild(Card_Button);

  Col.appendChild(Card);
  document.getElementById('CardBox').appendChild(Col);
}