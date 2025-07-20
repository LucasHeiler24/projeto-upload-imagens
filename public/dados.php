<?php

header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Origin: *');

$extensoes = ['png', 'jpg', 'jpeg', 'gif'];
$file = $_FILES['imagem_user']['name'];
$extensao = strtolower(pathinfo($file, PATHINFO_EXTENSION));

if (!in_array($extensao, $extensoes)) {
    echo json_encode(['status' => '401']);
}

$nomeTemporario = $_FILES['imagem_user']['tmp_name'];
$novoNomeImg = uniqid() . ".$extensao";

if (move_uploaded_file($nomeTemporario, 'img/' . $novoNomeImg)) {
    $conteudoJson = file_get_contents('json/imagens.json');
    $dados = json_decode($conteudoJson, true);

    if ($dados == null) {
        $inicioDados = [];
        $novoArray = ['imagem' => $novoNomeImg];
        $inicioDados[] = $novoArray;
        file_put_contents('json/imagens.json', json_encode($inicioDados));
    } else {
        $addImg = ['imagem' => $novoNomeImg];
        $dados[] = $addImg;
        file_put_contents('json/imagens.json', json_encode($dados));
    }
    echo json_encode(['status' => '200']);

} else {
    echo json_encode(['status' => '401']);
}
