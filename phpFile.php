<?php
// Gelen Ajax isteğini kontrol et
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["data"])) {
    // Gelen veriyi al
    $data = $_POST["data"];
    
    // Veriyi işleme
    $result = "Sunucu tarafında işlenen veri: " . $data;

    // İşlenmiş veriyi gönder
    echo $result;
} else {
    // Geçersiz istek durumunda hata mesajı gönder
    header("HTTP/1.1 400 Bad Request");
    echo "Geçersiz istek.";
}
?>
