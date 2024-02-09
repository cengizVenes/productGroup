$(document).ready(function () {
  // Sunucudan verileri alma işlemi
  $.ajax({
    url: "data.json", // Verilerin bulunduğu dosyanın yolu
    dataType: "json", // Veri tipi JSON
    success: function (data) {
      dataArray = data; // Verileri dataArray değişkenine ata
      populateButtons(); // Butonları oluştur
    },
    error: function (xhr, status, error) {
      console.error(status, error); // Hata durumunda konsola hata yazdır
    },
  });

  // Ana listedeki butonlara tıklama olayı ekle
  $("#result").on("click", "button", function () {
    // Butonun mevcut durumunu kontrol etmek için "clicked" class'ının varlığını kontrol ediyoruz
    var isClicked = $(this).hasClass("clicked");

    // Tüm butonlardan önce "clicked" class'ını kaldırıyoruz
    $("#result>button").removeClass("clicked");

    // Eğer tıklanan buton zaten "clicked" class'ına sahip değilse, sadece bu butona ekliyoruz
    // Aksi halde, hiçbir class eklemiyoruz (tam tersi işlem)
    if (!isClicked) {
      $("#result>button").removeClass("clicked").addClass("other");
      $(this).removeClass("other").addClass("clicked");
    } else {
      $("#result>button").removeClass("clicked").removeClass("other");
    }

    var selectedItem = dataArray.find(
      (item) => item.id === parseInt($(this).attr("class"))
    );
    if (selectedItem && selectedItem.parent_id === null) {
      var underResult = "";
      for (var k = 0; k < dataArray.length; k++) {
        if (dataArray[k].parent_id === selectedItem.id) {
          underResult +=
            "<button class='" +
            dataArray[k].id +
            "'>" +
            "<span> </span>" +
            dataArray[k].name +
            "</button>";
        }
      }
      $("#underResult").html(underResult);
      $("#moreUnderResult").html(""); // moreUnderResult içeriğini sıfırla
    }
  });

  // Alt listedeki butonlara tıklama olayı ekle
  $("#underResult").on("click", "button", function () {
    // Butonun mevcut durumunu kontrol etmek için "clicked" class'ının varlığını kontrol ediyoruz
    var isClicked = $(this).hasClass("clicked");

    // Tüm butonlardan önce "clicked" class'ını kaldırıyoruz
    $("#underResult>button").removeClass("clicked");

    // Eğer tıklanan buton zaten "clicked" class'ına sahip değilse, sadece bu butona ekliyoruz
    // Aksi halde, hiçbir class eklemiyoruz (tam tersi işlem)
    if (!isClicked) {
      $("#underResult>button").removeClass("clicked").addClass("other");
      $(this).removeClass("other").addClass("clicked");
    } else {
      $("#underResult>button").removeClass("clicked").removeClass("other");
    }

    var selectedItem = dataArray.find(
      (item) => item.id === parseInt($(this).attr("class"))
    );
    console.log(selectedItem.parent_id);

    if (selectedItem && selectedItem.parent_id === 1) {
      var moreUnderResult = "";
      for (var k = 0; k < dataArray.length; k++) {
        if (dataArray[k].parent_id === selectedItem.id) {
          moreUnderResult +=
            "<button class='" +
            dataArray[k].id +
            "'>" +
            dataArray[k].name +
            "</button>";
        }
      }
      $("#moreUnderResult").html(moreUnderResult);
    }
  });

  $("#moreUnderResult").on("click", "button", function () {
    // Butonun mevcut durumunu kontrol etmek için "clicked" class'ının varlığını kontrol ediyoruz
    var isClicked = $(this).hasClass("clicked");

    // Tüm butonlardan önce "clicked" class'ını kaldırıyoruz
    $("#moreUnderResult>button").removeClass("clicked");

    // Eğer tıklanan buton zaten "clicked" class'ına sahip değilse, sadece bu butona ekliyoruz
    // Aksi halde, hiçbir class eklemiyoruz (tam tersi işlem)
    if (!isClicked) {
      $("#moreUnderResult>button").removeClass("clicked").addClass("other");
      $(this).removeClass("other").addClass("clicked");
    } else {
      $("#moreUnderResult>button").removeClass("clicked").removeClass("other");
    }
  });
  // Ana listedeki id'leri homeDirectory dizisine aktar ve butonları oluştur
  function populateButtons() {
    var homeDirectory = [];
    var resultHtml = "";
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].parent_id === null) {
        homeDirectory.push(dataArray[i].id);
        resultHtml +=
          "<button class='" +
          dataArray[i].id +
          "'>" +
          dataArray[i].name +
          "</button>";
      }
    }
    $("#result").html(resultHtml);
  }
});
